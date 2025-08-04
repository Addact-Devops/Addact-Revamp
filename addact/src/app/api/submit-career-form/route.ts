import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, phone, sheetName, RecipientEmails, hyperlink, pageTitle } = body;

        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "Unknown";

        const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
        const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
        const spreadsheetId = process.env.GOOGLE_SHEET_ID;

        const smtpHost = process.env.SMTP_HOST;
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASS;

        if (!clientEmail || !privateKey || !spreadsheetId) {
            return NextResponse.json({ message: "Missing Google Sheets credentials" }, { status: 500 });
        }

        const auth = new google.auth.JWT({
            email: clientEmail,
            key: privateKey,
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: sheetName,
            valueInputOption: "RAW",
            insertDataOption: "INSERT_ROWS",
            requestBody: {
                values: [[name, email, phone, hyperlink, pageTitle, new Date().toISOString(), ip]],
            },
        });

        // Send Email
        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: 587,
            secure: false,
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
        });

        const recipientList = RecipientEmails
            ? RecipientEmails.split(",")
                  .map((email: string) => email.trim())
                  .filter(Boolean)
            : [];

        await transporter.sendMail({
            from: `"Addact Technologies" <info@addact.net>`,
            to: [email, ...recipientList],
            subject: "Thanks for Your Submission!",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
                    <h2 style="color: #1470af;">Thank you, ${name}!</h2>
                    <p>We’ve received your submission with the following details:</p>
                    <ul>
                        <li><strong>Name:</strong> ${name}</li>
                        <li><strong>Email:</strong> ${email}</li>
                        <li><strong>Phone:</strong> ${phone}</li>
                        <li><strong>Hyperlink:</strong> ${hyperlink}</li>
                    </ul>
                    <p>We'll get back to you shortly.</p>
                    <p style="margin-top: 30px; font-size: 12px; color: #888;">© ${new Date().getFullYear()} Addact Technologies. All rights reserved.</p>
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
