import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Common fields
        const name = body.name || body.fullName || "N/A";
        const email = body.email || "N/A";
        const phone = body.phone || "";
        const companyName = body.companyName || "";
        const requirements = body.requirements || "";

        // Optional fields (career form specific)
        const sheetName = body.sheetName || "Sheet1";
        const recipientEmails = body.RecipientEmails || "";
        const pageTitle = body.pageTitle || "";

        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "Unknown";

        // Google Sheets setup
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

        const rowValues = [
            name,
            email,
            companyName || "",
            requirements || "",
            phone || "",
            pageTitle || "",
            new Date().toISOString(),
            ip,
        ];

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: sheetName,
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

        const sendTo = [email, ...recipientList].filter(Boolean);

        await transporter.sendMail({
            from: `"Addact Technologies" <info@addact.net>`,
            to: sendTo,
            subject: "Thanks for Your Submission!",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
                    <h2 style="color: #1470af;">Thank you, ${name}!</h2>
                    <p>We’ve received your submission with the following details:</p>
                    <ul>
                        <li><strong>Name:</strong> ${name}</li>
                        <li><strong>Email:</strong> ${email}</li>
                        ${phone ? `<li><strong>Phone:</strong> ${phone}</li>` : ""}
                        ${companyName ? `<li><strong>Company:</strong> ${companyName}</li>` : ""}
                        ${requirements ? `<li><strong>Requirements:</strong> ${requirements}</li>` : ""}
                        ${pageTitle ? `<li><strong>Page Title:</strong> ${pageTitle}</li>` : ""}
                    </ul>
                    <p>We'll get back to you shortly.</p>
                    <p style="margin-top: 30px; font-size: 12px; color: #888;">
                        © ${new Date().getFullYear()} Addact Technologies. All rights reserved.
                    </p>
                </div>
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
