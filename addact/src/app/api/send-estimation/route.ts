import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, answers } = body;

        // 🔹 Get IP from request headers
        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "Unknown";

        // 🔹 Default values
        let country = "Unknown";
        let countryCode = "Unknown";

        // 🔹 Fetch geo info using ipapi
        try {
            if (ip && ip !== "Unknown" && !ip.startsWith("127.") && ip !== "::1") {
                const res = await fetch(`https://ipapi.co/${ip}/json/`);
                if (res.ok) {
                    const data = await res.json();
                    country = data.country_name || "Unknown";
                    countryCode = data.country_code || "Unknown";
                }
            }
        } catch (err) {
            console.error("Geo lookup failed", err);
        }

        // 📌 Google Sheets Setup
        const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
        const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
        const spreadsheetId = process.env.GOOGLE_SHEET_ID;

        if (!clientEmail || !privateKey || !spreadsheetId) {
            return NextResponse.json({ success: false, error: "Missing Google Sheets credentials" }, { status: 500 });
        }

        const auth = new google.auth.JWT({
            email: clientEmail,
            key: privateKey,
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
        const summary = answers.map((a: { label: string; value: string }) => `${a.label}: ${a.value}`).join(" | ");

        // Row values must match: Email, Date, Summary, Country, Country Code, IP Address
        const rowValues = [email, now, summary, country, countryCode, ip];

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: "Project Cost Estimator",
            valueInputOption: "RAW",
            insertDataOption: "INSERT_ROWS",
            requestBody: {
                values: [rowValues],
            },
        });

        // 📌 Email Transport Setup
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // 📩 Admin Email (with new UI)
        const adminHtml = `
  <div style="font-family:Arial, sans-serif; color:#23272a; margin:0; padding:0;">
    <!-- Banner -->
    <div style="text-align:center;">
      <img src="https://d3l7d9gtq0bnch.cloudfront.net/Thank_You_Addact_6f33411529.jpg"
           alt="Addact Banner"
           style="width:100%; max-width:100%; display:block;" />
    </div>
    <!-- Content -->
    <div style="padding:30px;">
      <h2 style="color:#3C4CFF; font-size:22px; margin-top:0; margin-bottom:16px; text-align:center;">
        📩 New Cost Estimator Submission
      </h2>
      <!-- User Details -->
      <h3 style="color:#23272a; font-size:18px; margin-bottom:10px;">User Details</h3>
      <table width="100%" cellspacing="0" cellpadding="10" style="border-collapse:collapse; border:2px solid #23272a;">
        <tr><td style="border:1px solid #23272a; font-weight:bold; width:30%; color:#3C4CFF;">Email</td><td style="border:1px solid #23272a;">${email}</td></tr>
        <tr><td style="border:1px solid #23272a; font-weight:bold; color:#3C4CFF;">IP Address</td><td style="border:1px solid #23272a;">${ip}</td></tr>
        <tr><td style="border:1px solid #23272a; font-weight:bold; color:#3C4CFF;">Country</td><td style="border:1px solid #23272a;">${country}</td></tr>
        <tr><td style="border:1px solid #23272a; font-weight:bold; color:#3C4CFF;">Country Code</td><td style="border:1px solid #23272a;">${countryCode}</td></tr>
        <tr><td style="border:1px solid #23272a; font-weight:bold; color:#3C4CFF;">Date</td><td style="border:1px solid #23272a;">${now}</td></tr>
      </table>
      <!-- Sitecore Details -->
      <h3 style="color:#23272a; font-size:18px; margin:20px 0 10px;">Sitecore Details</h3>
      <table width="100%" cellspacing="0" cellpadding="10" style="border-collapse:collapse; border:2px solid #23272a;">
        ${answers
            .map(
                (a: { label: string; value: string }) => `
            <tr>
              <td style="border:1px solid #23272a; font-weight:bold; color:#3C4CFF;">${a.label}</td>
              <td style="border:1px solid #23272a;">${a.value}</td>
            </tr>
          `
            )
            .join("")}
      </table>
      <!-- Footer -->
      <p style="margin-top:25px; font-size:14px; text-align:center; color:#555;">
        🔔 This is an automated notification from <b style="color:#3C4CFF;">Addact Technologies</b>.
      </p>
    </div>
  </div>
`;

        await transporter.sendMail({
            from: `"Addact Technologies" <info@addact.net>`,
            to: ["jayesh@addact.net", "nimesh@addact.net", "mitesh@addact.net"],
            subject: "New Cost Estimator Submission",
            html: adminHtml,
        });

        // 📩 User Email (with new UI)
        const userHtml = `
  <div style="font-family:Arial, sans-serif; color:#23272a; margin:0; padding:0;">
    <!-- Banner -->
    <div style="text-align:center;">
      <img src="https://d3l7d9gtq0bnch.cloudfront.net/Thank_You_Addact_6f33411529.jpg"
           alt="Thank You Banner"
           style="width:100%; max-width:100%; display:block;" />
    </div>
    <!-- Content -->
    <div style="padding:30px;">
      <h2 style="color:#3C4CFF; font-size:22px; margin-top:0; margin-bottom:16px; text-align:center;">
        Thank You for Your Inquiry 😊
      </h2>
      <p style="font-size:15px; line-height:1.6; margin-bottom:20px; text-align:center;">
        We appreciate your interest in our <b>Cost Estimator</b>.  
        Our team will review your request and connect with you shortly.
      </p>
      <!-- User Info Table -->
      <h3 style="color:#23272a; font-size:18px; margin-bottom:10px;">Your Submitted Information:</h3>
      <table width="100%" cellspacing="0" cellpadding="10" style="border-collapse:collapse; border:2px solid #23272a;">
        <tr><td style="border:1px solid #23272a; font-weight:bold; width:30%; color:#3C4CFF;">Email</td><td style="border:1px solid #23272a;">${email}</td></tr>
        ${answers
            .map(
                (a: { label: string; value: string }) => `
            <tr>
              <td style="border:1px solid #23272a; font-weight:bold; color:#3C4CFF;">${a.label}</td>
              <td style="border:1px solid #23272a;">${a.value}</td>
            </tr>
          `
            )
            .join("")}
      </table>
      <!-- Footer -->
      <p style="margin-top:25px; font-size:16px; text-align:center; color:#555;">
        Regards, <br />
        <b style="color:#3C4CFF; margin-top: 10px; display: block;">Team Addact Technologies</b>
      </p>
    </div>
  </div>
`;

        await transporter.sendMail({
            from: `"Addact Technologies" <info@addact.net>`,
            to: email,
            subject: "Thank you for your inquiry - Addact Technologies",
            html: userHtml,
        });

        return NextResponse.json({ success: true });
    } catch (err: unknown) {
        console.error("Email/Sheet error", err);

        if (err instanceof Error) {
            return NextResponse.json({ success: false, error: err.message }, { status: 500 });
        }

        return NextResponse.json({ success: false, error: "Unknown error occurred" }, { status: 500 });
    }
}
