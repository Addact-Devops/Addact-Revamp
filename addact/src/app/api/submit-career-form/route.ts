import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import nodemailer from "nodemailer";
import { formatDateTime } from "@/utils/dateFormatter";

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const hyperlink = formData.get("hyperlink") as string;
        const sheetName = formData.get("sheetName") as string;
        const RecipientEmails = formData.get("RecipientEmails") as string;
        const pageTitle = formData.get("pageTitle") as string;

        const file = formData.get("resume") as File | null;

        const arrayBuffer = file ? await file.arrayBuffer() : null;

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

        const now = new Date();
        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: sheetName,
            valueInputOption: "RAW",
            insertDataOption: "INSERT_ROWS",
            requestBody: {
                values: [[name, email, , hyperlink, phone, pageTitle, formatDateTime(now), ip]],
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
            to: recipientList,
            subject: `Addact - Business Inquiry ${name} `,
            html: `
           <html>
                <head>
                    <title>Addact - Thank You for Your Submission.</title>
                    <style>
                        table {
                        width: 100%;
                        border-collapse: collapse;
                        background-color: #F6F7FF;
                        }
                        th {
                        border-right: 1px solid #0000001a;
                        text-align: left;
                        }
                        th, td {
                        padding: 15px;
                        }
                        td {
                        text-align: left;
                        }
                        img{
                        width: 100%;
                        }
                    </style>
                </head>
                <body>
                    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
                        <h2 style="color: #1470af; margin-top: 0;">New Application Received for ${pageTitle}</h2>
                        <p style="font-size: 14px; margin-bottom: 10px;"><strong>Candidate Details:</strong></p>
                        <table border="1" cellspacing="0" cellpadding="8" style="border-collapse: collapse; width: 100%; font-size: 14px;">
                            <tr>
                                <th align="left" style="background: #f5f5f5; width: 30%;">Name</th>
                                <td>${name}</td>
                            </tr>
                            <tr>
                                <th align="left" style="background: #f5f5f5;">Email</th>
                                <td>${email}</td>
                            </tr>
                            <tr>
                                <th align="left" style="background: #f5f5f5;">Phone</th>
                                <td>${phone}</td>
                            </tr>
                            <tr>
                                <th align="left" style="background: #f5f5f5;">Portfolio / Hyperlink</th>
                                <td>${hyperlink || "N/A"}</td>
                            </tr>
                            <tr>
                                <th align="left" style="background: #f5f5f5;">Applied For</th>
                                <td>${pageTitle}</td>
                            </tr>
                            <tr>
                                <th align="left" style="background: #f5f5f5;">Submitted At</th>
                                <td>${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
                            </tr>
                        </table>
                    </div>
                </body>
            </html>`,
            attachments:
                file && arrayBuffer
                    ? [
                          {
                              filename: file.name,
                              content: Buffer.from(arrayBuffer),
                          },
                      ]
                    : [],
        });
        await transporter.sendMail({
            from: `"Addact Technologies" <info@addact.net>`,
            to: email,
            subject: "Thanks for Your Submission!",
            html: `
                <html>
                    <head>
                        <title>Addact - Thank You for Your Submission.</title>
                        <style>
                            table {
                            width: 100%;
                            border-collapse: collapse;
                            background-color: #F6F7FF;
                            }
                            th {
                            border-right: 1px solid #0000001a;
                            text-align: left;
                            }
                            th, td {
                            padding: 15px;
                            }
                            td {
                            text-align: left;
                            }
                            img{
                            width: 100%;
                            }
                        </style>
                    </head>
                    <body>
                        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
                            <img src="https://dfr7gdtg8j0s1.cloudfront.net/src/images/email-banner.png" alt="email-banner"/>                
                            <p style="margin-top: 40px;">Dear ${name},</p>
                            <p>We have received your message and will get back to you shortly.</p>
                            <p>Here is the information you submitted:</p>
                            <table border="1" cellspacing="0" cellpadding="8" style="border-collapse: collapse; width: 100%;">
                                <tr>
                                    <th align="left">Name</th>
                                    <td>${name}</td>
                                </tr>
                                <tr>
                                    <th align="left">Email</th>
                                    <td>${email}</td>
                                </tr>
                                <tr>
                                    <th align="left">Phone</th>
                                    <td>${phone}</td>
                                </tr>
                                <tr>
                                    <th align="left">Portfolio / Hyperlink</th>
                                    <td>${hyperlink || "N/A"}</td>
                                </tr>
                                <tr>
                                    <th align="left">Applied for</th>
                                    <td>${pageTitle}</td>
                                </tr>
                                <tr>
                                    <th align="left">Submitted At</th>
                                    <td>${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
                                </tr>
                            </table>
                            <br/>
                            <span>Regards,</span>
                            <br/>
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
