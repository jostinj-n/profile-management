import { NewProfileState } from "@/app/redux/features/newProfileSlice";
import { mapStateToBackendSchema } from "@/app/util/createNewProfile/mapStateToBack";
import { NextRequest } from "next/server";

async function streamToJson<T>(
  stream: ReadableStream<Uint8Array> | null,
): Promise<T | null> {
  if (!stream) {
    return null;
  }
  const response = new Response(stream);
  return (await response.json()) as T;
}

export async function POST(Request: NextRequest) {
  // Convert the stream to JSON and wait for the operation to complete
  const data = await streamToJson<NewProfileState>(Request.body);

  // Check if data is not null before proceeding
  if (!data) {
    // Handle the case where data is null
    console.error("No data received from the stream");
    return new Response("Error processing request", { status: 400 });
  }
  // Now that we have the data, map it to the backend schema
  const mappedState = mapStateToBackendSchema(data);

  console.log('newProfile.mappedState', mappedState)

  // Specify the URL where you want to send the data
  const url = `${process.env.API_BASE_URL}/api/v1/create_person_profile`;
  try {
    const response = await fetch(url, {
      method: "POST", // Request method
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
      },
      body: JSON.stringify(mappedState), // Convert the mapped state to JSON string
    });

    console.log('newProfile.POST.response.ok?', response.ok)
    if (!response.ok) {
      console.log('newProfile.POST.failed', response.status, response.statusText)

      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log("Success:", result);
    console.log("Mapped State Success:", JSON.stringify(mappedState));

    // return new Response("Operation successful", { status: 200 });
    return new Response(JSON.stringify({"success": true, result}), {status: 200})
  } catch (error) {
    // Handle errors
    console.error("Error during fetch operation:", error);
    return new Response(JSON.stringify({message: "Error processing request"}),{ status: 500 });
  }
}
