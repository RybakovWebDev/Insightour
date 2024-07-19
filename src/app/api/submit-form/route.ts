import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

function formatDate(date: Date): string {
  const pad = (num: number): string => num.toString().padStart(2, "0");

  const year = date.getFullYear().toString().slice(-2);
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
}

interface FormData {
  name: string;
  phone: string;
  comment: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { name, phone, comment } = (await request.json()) as FormData;

    const credentials = {
      type: process.env.GOOGLE_CLOUD_KEY_TYPE,
      project_id: process.env.GOOGLE_CLOUD_KEY_PROJECT_ID,
      private_key_id: process.env.GOOGLE_CLOUD_KEY_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_CLOUD_KEY_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      client_email: process.env.GOOGLE_CLOUD_KEY_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLOUD_KEY_CLIENT_ID,
      auth_uri: process.env.GOOGLE_CLOUD_KEY_AUTH_URI,
      token_uri: process.env.GOOGLE_CLOUD_KEY_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.GOOGLE_CLOUD_KEY_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.GOOGLE_CLOUD_KEY_CLIENT_X509_CERT_URL,
    };

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    if (!spreadsheetId) {
      throw new Error("GOOGLE_SHEET_ID is not defined");
    }

    const range = "Sheet1!A2:E";

    const timestamp = formatDate(new Date());

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [[timestamp, name, phone, comment]],
      },
    });

    console.log("Sheets API Response:", JSON.stringify(response.data, null, 2));

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Full error:", JSON.stringify(error, null, 2));
    return NextResponse.json(
      { message: "Failed to append data to Google Sheet", error: (error as Error).message },
      { status: 500 }
    );
  }
}
