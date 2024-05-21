import * as jose from "jose";

// decode and verify the JWT using jose
interface JsonWebKey {
  kid: string;
}
export type AzureGroup = {
  id: string;
  displayName: string;
}
interface GroupsApiResponse {
  '@odata.context': string;
  value: AzureGroup[];
}

export const getAzureADGroups = async (token: string) => {
  try {
    const getGroupsResponse = await fetch(`https://graph.microsoft.com/v1.0/me/transitiveMemberOf/microsoft.graph.group?$count=true`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!getGroupsResponse.ok) {
      console.error(`HTTP error! status from /api/getGroups: ${getGroupsResponse.status}`);
      return false;
    }

    const getGroupsData: GroupsApiResponse = await getGroupsResponse.json();
    const allowedGroups: string[] = process.env.ALLOWED_GROUPS?.split(',') || [];
    const userGroups: string[] = getGroupsData.value.map((group: AzureGroup) => group.id);
    const hasAccess: boolean = allowedGroups.some((allowedGroup: string) => userGroups.includes(allowedGroup));

    if (!hasAccess) {
      console.error(`User is not in the list of allowed groups`);
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error('Error fetching Azure AD Groups:', error);
    return false;
  }
};


export const decodeJWT = async (token: string | undefined) => {
  if (!token) {
    return false;
  }

  const decodedHeader = jose.decodeProtectedHeader(token);
  const jwksUri = process.env.MS_JWKS_URI || "https://login.microsoftonline.com/common/discovery/keys";

  try {
    const response = await fetch(jwksUri);
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
    }

    const {keys} = await response.json();
    const signingKey = keys.find((key: JsonWebKey) => key.kid === decodedHeader.kid);

    if (!signingKey) {
      console.error(`No signing key found for ${decodedHeader.kid}`);
      return false;
    }

    // TODO: Confirm with Infra team that this is the correct way to verify the token
    // const publicKey = await jose.importJWK(signingKey, decodedHeader.alg);
    // await jose.jwtVerify(token, publicKey);

    const decoded = jose.decodeJwt(token);

    // decoded.exp is unix epoch time in seconds, whereas Date.now() is in milliseconds
    // So we need to divide by 1000 to get the current time in seconds
    const currentTimeInSeconds = Date.now() / 1000;
    if (decoded.exp && decoded.exp < currentTimeInSeconds) {
      console.error(`Token expired ${Math.round((currentTimeInSeconds - decoded.exp) / 60)} minutes ago`);
      return false;
    }

    const hasAccess = await getAzureADGroups(token);

    if (!hasAccess) {
      return false;
    }

    return decoded;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return false;
  }
};
