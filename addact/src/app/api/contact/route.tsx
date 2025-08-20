import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Required fields
        const name = body.name || "N/A";
        const email = body.email || "N/A";
        const companyName = body.companyName || "";
        const description = body.description || "";
        const pageTitle = body.pageTitle || "";
        const recipientEmails = body.recipientEmails || "";

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

        const rowValues = [name, email, companyName, description, , pageTitle, new Date().toISOString(), ip];

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: "Sheet1",
            valueInputOption: "RAW",
            insertDataOption: "INSERT_ROWS",
            requestBody: {
                values: [rowValues],
            },
        });

        // SMTP setup
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
            to: email,
            subject: "Thanks for Your Submission!",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
                    <h2 style="color: #1470af;">Thank you, ${name}!</h2>
                    <p>We’ve received your application. Our team will review it and get back to you soon.</p>
                    <p>Meanwhile, feel free to explore more about us at <a href="https://addact.net" target="_blank">Addact Technologies</a>.</p>
                    <p style="margin-top: 30px; font-size: 12px; color: #888;">© ${new Date().getFullYear()} Addact Technologies. All rights reserved.</p>
                </div>
            `,
        });
        await transporter.sendMail({
            from: `"Addact Technologies" <info@addact.net>`,
            to: recipientList,
            subject: "Thanks for Your Submission!",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
                    <h2 style="color: #1470af;">Thank you, ${name}!</h2>
                    <p>We’ve received your submission with the following details:</p>
                    <ul>
                        <li><strong>Name:</strong> ${name}</li>
                        <li><strong>Email:</strong> ${email}</li>
                        <li><strong>Company Name:</strong> ${companyName}</li>
                        ${description ? `<li><strong>Description:</strong> ${description}</li>` : ""}
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
