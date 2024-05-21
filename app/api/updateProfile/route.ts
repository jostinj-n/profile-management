import { NextRequest, NextResponse } from "next/server";
import { BanksPayload } from "@/app/redux/features/updateProfile/bankingInformationSlice";
import { mappedBank } from "@/app/api/updateProfile/mappedBank";

function mapStateToBackendSchema(payload: BanksPayload) {
  const { banks } = payload;

  const mappedBanks = banks.map(mappedBank);

  return {
    mappedBanks,
  };
}

export async function PUT(Request: NextRequest) {
  // Convert the stream to JSON and wait for the operation to complete
  const data = (await Request.json()) as BanksPayload;
  // Check if data is not null before proceeding
  if (!data) {
    console.error("No data received from the stream");
    return NextResponse.error();
  }

  const mappedState = mapStateToBackendSchema(data);
  const url = `${process.env.API_BASE_URL}/api/v1/update_bank_details`;
  console.log(JSON.stringify(mappedState.mappedBanks[0]));

  try {
    const response = await fetch(url, {
      method: "PUT", // Request method
      body: JSON.stringify(mappedState.mappedBanks[0]), // Convert the mapped state to JSON string
    });
    if (!response.ok) {
      console.error(
        "banksUpdate.PUT.failed",
        response.status,
        response.statusText,
      );
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error during fetch operation:", error);
    console.log(JSON.stringify(mappedState.mappedBanks[0]));

    return NextResponse.error();
  }
}
