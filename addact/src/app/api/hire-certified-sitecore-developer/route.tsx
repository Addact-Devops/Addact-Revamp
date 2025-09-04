import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import nodemailer from "nodemailer";
import { formatDateTime } from "@/utils/dateFormatter";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Required fields
        const name = body.name || "N/A";
        const email = body.email || "N/A";
        const companyName = body.companyName || "";
        const description = body.description || "";
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

        const now = new Date();
        const rowValues = [name, email, companyName, description, , pageTitle, formatDateTime(now), ip];

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

        // Build recipient list (dynamic + static Ravi & Gunjan)

        const finalRecipients = ["maulik@addact.net", "pauras@addact.net", "gunjan@addact.net", "jayesh@addact.net"];

        // Send confirmation email to Addact team
        await transporter.sendMail({
            from: `"Addact Technologies" <marketing@addact.net>`,
            to: finalRecipients,
            subject: "Addact - Hire Certified Sitecore Developer",
            html: `
                <html>
                    <head>
                        <title>Addact - Hire Certified Sitecore Developer</title>
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
                                    <th align="left">Company Name</th>
                                    <td>${companyName}</td>
                                </tr>
                                <tr>
                                    <th align="left">Requirements</th>
                                    <td>${description}</td>
                                </tr>
                            </table>
                        </div>
                    </body>
                </html>
            `,
        });

        // Send thank-you email to user
        await transporter.sendMail({
            from: `"Addact Technologies" <marketing@addact.net>`,
            to: email,
            subject: "Addact - Thank You for Your Inquiry",
            html: `
                <html>
                    <head>
                        <title>Addact - Thank You for Your Inquiry</title>
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
                            <img src="https://d3l7d9gtq0bnch.cloudfront.net/Thank_You_Addact_6f33411529.jpg" alt="email-banner"/>                
                            <h2 style="color: #1470af;">Dear ${name}!</h2>
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
                                    <th align="left">Company Name</th>
                                    <td>${companyName}</td>
                                </tr>
                                ${
                                    description
                                        ? `<tr>
                                        <th align="left">Description</th>
                                        <td>${description}</td>
                                    </tr>`
                                        : ""
                                }
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
