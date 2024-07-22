import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { formatDate, sanitizeInput, validateFormData } from "@/lib/serverHelpers";

interface FormData {
  name: string;
  phone: string;
  comment: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const rawData = await request.json();
    console.log("Raw data received: ", rawData);

    const validationResult = validateFormData(rawData);
    if (!validationResult.success) {
      console.error("Validation failed: ", validationResult.errors);
      return NextResponse.json({ message: "Invalid input", errors: validationResult.errors }, { status: 400 });
    }

    const { name, phone, comment } = validationResult.data as FormData;
    const sanitizedData = {
      name: sanitizeInput(name),
      phone: sanitizeInput(phone),
      comment: sanitizeInput(comment),
    };
    console.log("Sanitized data: ", sanitizedData);

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

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [[timestamp, sanitizedData.name, sanitizedData.phone, sanitizedData.comment]],
      },
    });

    console.log("Form submission successful");

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Form submission error:", error);

    return NextResponse.json({ message: "An error occurred while processing your request" }, { status: 500 });
  }
}
