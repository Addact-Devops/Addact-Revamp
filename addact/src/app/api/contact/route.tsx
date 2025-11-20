import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import nodemailer from "nodemailer";
import { formatDateTime } from "@/utils/dateFormatter";

function escapeHtml(unsafe: string) {
    return unsafe
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Required fields
        const name = body.name || "N/A";
        const email = body.email || "N/A";
        const companyName = body.companyName || "";
        const descriptionRaw = body.description || "";
        const pageTitle = body.pageTitle || "";
        const recipientEmails = body.recipientEmails || "";

        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "Unknown";

        const plainTextForSheets = descriptionRaw
            .replace(/\{TAB\}/g, "\t")
            .replace(/\{ENTER\}/g, "\n")
            .replace(/\{EOL\}/g, "\n");

        const escaped = escapeHtml(plainTextForSheets);
        const htmlForEmail = escaped
            .replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;") // 4 spaces per tab
            .replace(/\n/g, "<br/>");

        const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
        const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
        const spreadsheetId = process.env.GOOGLE_SHEET_ID;

        if (!clientEmail || !privateKey || !spreadsheetId) {
            return NextResponse.json({ message: "Missing Google Sheets credentials" }, { status: 500 });
        }

        const auth = new google.auth.JWT({
            email: clientEmail,
            key: privateKey,
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        const now = new Date();

        const rowValues = [name, email, companyName, plainTextForSheets, pageTitle, formatDateTime(now), ip];

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: "Sheet1",
            valueInputOption: "RAW",
            insertDataOption: "INSERT_ROWS",
            requestBody: {
                values: [rowValues],
            },
        });

        const smtpHost = process.env.SMTP_HOST;
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASS;

        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: 587,
            secure: false,
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
        });

        const recipientList = recipientEmails
            ? recipientEmails
                  .split(",")
                  .map((mail: string) => mail.trim())
                  .filter(Boolean)
            : [];

        // Send confirmation email
        await transporter.sendMail({
            from: `"Addact Technologies" <info@addact.net>`,
            to: recipientList,
            subject: "Addact - Business Inquiry",
            html: `
        <html>
          <body>
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
              <table border="1" cellspacing="0" cellpadding="8" style="border-collapse: collapse; width: 100%;">
                <tr><th>Name</th><td>${escapeHtml(name)}</td></tr>
                <tr><th>Email</th><td>${escapeHtml(email)}</td></tr>
                <tr><th>Company Name</th><td>${escapeHtml(companyName)}</td></tr>
                <tr><th>Requirements</th><td>${htmlForEmail}</td></tr>
              </table>
            </div>
          </body>
        </html>
      `,
        });
        await transporter.sendMail({
            from: `"Addact Technologies" <info@addact.net>`,
            to: email,
            subject: "Addact - Thank You for Your Inquiry",
            html: `
        <html>
          <body>
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
              <img src="https://d3l7d9gtq0bnch.cloudfront.net/Thank_You_Addact_6f33411529.jpg" alt="email-banner"/>

              <h2 style="color: #1470af;">Dear ${escapeHtml(name)}!</h2>
              <p>We have received your message and will get back to you shortly.</p>

              <table border="1" cellspacing="0" cellpadding="8" style="border-collapse: collapse; width: 100%;">
                <tr><th>Name</th><td>${escapeHtml(name)}</td></tr>
                <tr><th>Email</th><td>${escapeHtml(email)}</td></tr>
                <tr><th>Company Name</th><td>${escapeHtml(companyName)}</td></tr>

                ${plainTextForSheets ? `<tr><th>Description</th><td>${htmlForEmail}</td></tr>` : ""}
              </table>

              <br/>
              <span>Regards,</span><br/>
              <span>Team Addact Technologies</span>
            </div>
          </body>
        </html>
      `,
        });

        return NextResponse.json({ message: "Success" });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Google Sheets API error:", error.message);
            return NextResponse.json({ message: "Error", error: error.message }, { status: 500 });
        } else {
            console.error("Unknown error:", error);
            return NextResponse.json({ message: "Unknown error" }, { status: 500 });
        }
    }
}
