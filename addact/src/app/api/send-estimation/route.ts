import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, answers, ip, country, countryCode } = body;

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

        // Row values must match the columns: Email, Date, Summary, Country, Country Code, IP Address
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

        // 📩 Admin Email
        const adminHtml = `
      <div style="font-family:Arial, sans-serif;">
        <h2>📩 New Cost Estimator Submission</h2>
        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;">
          <tr><td><b>Email</b></td><td>${email}</td></tr>
          <tr><td><b>IP Address</b></td><td>${ip}</td></tr>
          <tr><td><b>Country</b></td><td>${country}</td></tr>
          <tr><td><b>Country Code</b></td><td>${countryCode}</td></tr>
          <tr><td><b>Date</b></td><td>${now}</td></tr>
        </table>
        <h3>Details</h3>
        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;">
          ${answers
              .map((a: { label: string; value: string }) => `<tr><td><b>${a.label}</b></td><td>${a.value}</td></tr>`)
              .join("")}
        </table>
      </div>
    `;

        await transporter.sendMail({
            from: `"Addact Technologies" <info@addact.net>`,
            to: "jayesh@addact.net, nimesh@addact.net, mitesh@addact.net",
            subject: "New Cost Estimator Submission",
            html: adminHtml,
        });

        // 📩 User Email
        const userHtml = `
      <div style="font-family:Arial, sans-serif;">
        <h2 style="color:#3C4CFF;">Thank You for Your Inquiry 😊</h2>
        <p>We appreciate your interest in our <b>Cost Estimator</b>. Our team will connect with you shortly.</p>
        <h3>Your Submitted Info:</h3>
        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;">
          <tr><td><b>Email</b></td><td>${email}</td></tr>
          ${answers
              .map((a: { label: string; value: string }) => `<tr><td><b>${a.label}</b></td><td>${a.value}</td></tr>`)
              .join("")}
        </table>
      </div>
    `;

        await transporter.sendMail({
            from: `"Addact Technologies" <info@addact.net>`,
            to: email,
            subject: "Thank you for your inquiry - Addact Technologies",
            html: userHtml,
        });

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error("Email/Sheet error", err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
