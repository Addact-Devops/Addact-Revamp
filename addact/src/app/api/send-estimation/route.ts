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

        const currentYear = new Date().getFullYear();

        // 📩 Admin Email (with new UI)
        const adminHtml = `
  <html>
                    <head>
                        <title>Addact - Cost Estimation Submission</title>
                         <style>
                            body,
                            table,
                            td,
                            a {
                            -webkit-text-size-adjust: 100%;
                            -ms-text-size-adjust: 100%;
                            }
                            table,
                            td {
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            }
                            img {
                            -ms-interpolation-mode: bicubic;
                            border: 0;
                            height: auto;
                            line-height: 100%;
                            outline: none;
                            text-decoration: none;
                            }
                            body {
                            font-family: Arial, sans-serif;
                            }
                            h1,
                            h2,
                            h3 {
                            font-family: Arial, sans-serif;
                            }
                        </style>
                    </head>
                   <body style="margin: 0; padding: 0; background-color: #f8f8f8">
    <div style="max-width: 600px; margin: 20px auto">
      <table
        border="0"
        cellpadding="0"
        cellspacing="0"
        width="100%"
        style="table-layout: fixed;border: 1px solid #8e8b8b61; border-radius:8px"
      >
        <tr>
          <td align="center" style="padding: 30px 0">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="
                max-width: 600px;
                background-color: #ffffff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
              "
            >
              <tr>
                <td align="center" style="padding: 25px 10px 15px 10px">
                  <a href="https://addact.net/" target="_blank">
                    <img
                      src="https://d3l7d9gtq0bnch.cloudfront.net/Thank_You_Addact_6f33411529.jpg"
                      alt="Addact"
                      width="100%"
                      style="display: block"
                    />
                  </a>
                </td>
              </tr>
              <tr>
                <td height="2" style="background-color: #007bff"></td>
              </tr>

              <tr>
                <td class="mobile-padding" style="padding: 40px 40px 20px 40px">
                  <h3 style="color: #007bff; margin-top: 0">
                          📩 New Cost Estimator Submission
                  </h3>
                  
                </td>
              </tr>

              <tr>
                <td class="mobile-padding" style="padding: 0 40px 40px 40px">
                  <h3
                    style="
                      color: #1a1a1a;
                      font-size: 16px;
                      font-weight: 700;
                      margin: 0 0 15px 0;
                      border-left: 3px solid #007bff;
                      padding-left: 10px;
                    "
                  >
                    User Details:
                  </h3>

                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    style="
                      background-color: #f9fafc;
                      border-radius: 6px;
                      border: 1px solid #eeeeee;
                    "
                  >
                    <tr>
                      <td
                        valign="top"
                        width="35%"
                        style="
                          padding: 12px 15px;
                          border-bottom: 1px solid #e0e0e0;
                          color: #666666;
                          font-size: 14px;
                          font-weight: 700;
                          text-transform: uppercase;
                        "
                      >
                        Email
                      </td>
                      <td
                        valign="top"
                        style="
                          padding: 12px 15px;
                          border-bottom: 1px solid #e0e0e0;
                          color: #1a1a1a;
                          font-size: 14px;
                          font-weight: 400;
                        "
                      >
                        ${email}
                      </td>
                    </tr>
                    <tr>
                      <td
                        valign="top"
                        style="
                          padding: 12px 15px;
                          border-bottom: 1px solid #e0e0e0;
                          color: #666666;
                          font-size: 14px;
                          font-weight: 700;
                          text-transform: uppercase;
                        "
                      >
                        IP Address
                      </td>
                      <td
                        valign="top"
                        style="
                          padding: 12px 15px;
                          border-bottom: 1px solid #e0e0e0;
                          color: #1a1a1a;
                          font-size: 14px;
                          font-weight: 400;
                        "
                      >
                        ${ip}
                      </td>
                    </tr>
                    <tr>
                      <td
                        valign="top"
                        style="
                          padding: 12px 15px;
                          border-bottom: 1px solid #e0e0e0;
                          color: #666666;
                          font-size: 14px;
                          font-weight: 700;
                          text-transform: uppercase;
                        "
                      >
                        Country
                      </td>
                      <td
                        valign="top"
                        style="
                          padding: 12px 15px;
                          border-bottom: 1px solid #e0e0e0;
                          color: #1a1a1a;
                          font-size: 14px;
                          font-weight: 400;
                        "
                      >
                        ${country}
                      </td>
                    </tr>
                    <tr>
                      <td
                        valign="top"
                        style="
                          padding: 12px 15px;
                          color: #666666;
                          font-size: 14px;
                          font-weight: 700;
                          text-transform: uppercase;
                        "
                      >
                        Country Code
                      </td>
                      <td
                        valign="top"
                        style="
                          padding: 12px 15px;
                          color: #1a1a1a;
                          font-size: 14px;
                          line-height: 22px;
                          font-weight: 400;
                        "
                      >
                        ${countryCode}
                      </td>
                    </tr>
                     <tr>
                      <td
                        valign="top"
                        style="
                          padding: 12px 15px;
                          color: #666666;
                          font-size: 14px;
                          font-weight: 700;
                          text-transform: uppercase;
                        "
                      >
                        Date
                      </td>
                      <td
                        valign="top"
                        style="
                          padding: 12px 15px;
                          color: #1a1a1a;
                          font-size: 14px;
                          line-height: 22px;
                          font-weight: 400;
                        "
                      >
                        ${now}
                      </td>
                    </tr>
                  </table>

                   <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    style="
                      background-color: #f9fafc;
                      border-radius: 6px;
                      border: 1px solid #eeeeee;
                    "
                  >
                   ${answers
                       .map(
                           (a: { label: string; value: string }) => `
            <tr>
              <td  valign="top"
                        width="35%"
                        style="
                          padding: 12px 15px;
                          border-bottom: 1px solid #e0e0e0;
                          color: #666666;
                          font-size: 14px;
                          font-weight: 700;
                          text-transform: uppercase;
                        ">${a.label}</td>
              <td valign="top"
                        style="
                          padding: 12px 15px;
                          border-bottom: 1px solid #e0e0e0;
                          color: #1a1a1a;
                          font-size: 14px;
                          font-weight: 400;
                        ">${a.value}</td>
            </tr>
          `
                       )
                       .join("")}
                  </table>
                </td>
              </tr>
              <tr>
                <td
                  align="center"
                  style="padding: 30px 20px; background-color: #1a1a1a"
                >
                  <table
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                  >
                    <tr>
                      <td align="left" width="50%">
                        <a
                          href="https://www.addact.net/contact-us"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src="https://d3l7d9gtq0bnch.cloudfront.net/Logo_1_ffdf03e2d1.png"
                            alt="Addact Logo"
                            width="120"
                            style="display: block"
                          />
                        </a>
                      </td>

                      <td align="right" width="50%">
                        <a
                          href="https://www.facebook.com/addacttech/"
                          style="text-decoration: none; margin: 0 5px"
                        >
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/733/733547.png"
                            alt="Facebook"
                            width="22"
                          />
                        </a>
                        <a
                          href="https://www.instagram.com/addacttechnologies/"
                          style="text-decoration: none; margin: 0 5px"
                        >
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/2111/2111463.png"
                            alt="Instagram"
                            width="22"
                          />
                        </a>
                        <a
                          href="https://www.linkedin.com/company/addact-technologies/?viewAsMember=true"
                          style="text-decoration: none; margin: 0 5px"
                        >
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/3536/3536505.png"
                            alt="LinkedIn"
                            width="22"
                          />
                        </a>
                        <a
                          href="https://x.com/AddactTech"
                          style="text-decoration: none; margin: 0 5px"
                        >
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/5969/5969020.png"
                            alt="X"
                            width="22"
                          />
                        </a>
                        <p
                          style="
                            color: #999999;
                            font-size: 11px;
                            margin: 15px 0 0 0;
                          "
                        >
                          &copy; ${currentYear} Addact. All
                          Rights Reserved.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </body>
                </html>
`;

        await transporter.sendMail({
            from: `"Addact Technologies" <info@addact.net>`,
            to: ["jayesh@addact.net", "mitesh@addact.net"],
            subject: "New Cost Estimator Submission",
            html: adminHtml,
        });

        // 📩 User Email (with new UI)
        const userHtml = `
  <html>
  <head>
    <title>Addact - Cost Estimation Submission</title>
    <style>
      body,
      table,
      td,
      a {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      table,
      td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      img {
        -ms-interpolation-mode: bicubic;
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
      }
      body {
        font-family: Arial, sans-serif;
      }
      h1,
      h2,
      h3 {
        font-family: Arial, sans-serif;
      }
    </style>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f8f8f8">
    <div style="max-width: 600px; margin: 20px auto">
      <table
        border="0"
        cellpadding="0"
        cellspacing="0"
        width="100%"
        style="
          table-layout: fixed;
          border: 1px solid #8e8b8b61;
          border-radius: 8px;
        "
      >
        <tr>
          <td align="center" style="padding: 30px 0">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="
                max-width: 600px;
                background-color: #ffffff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
              "
            >
              <tr>
                <td align="center" style="padding: 25px 10px 15px 10px">
                  <a href="https://addact.net/" target="_blank">
                    <img
                      src="https://d3l7d9gtq0bnch.cloudfront.net/Thank_You_Addact_6f33411529.jpg"
                      alt="Addact"
                      width="100%"
                      style="display: block"
                    />
                  </a>
                </td>
              </tr>
              <tr>
                <td height="2" style="background-color: #007bff"></td>
              </tr>

              <tr>
                <td class="mobile-padding" style="padding: 40px 40px 20px 40px">
                  <h3 style="color: #007bff; margin-top: 0">
                    Thank You for Your Inquiry 😊
                  </h3>
                  <p
                    style="
                      color: #555555;
                      font-size: 14px;
                      line-height: 26px;
                      margin: 0 0 25px 0;
                    "
                  >
                    We appreciate your interest in our <b>Cost Estimator</b>.
                    Our team will review your request and connect with you
                    shortly.
                  </p>
                </td>
              </tr>

              <tr>
                <td class="mobile-padding" style="padding: 0 40px 40px 40px">
                  <h3
                    style="
                      color: #1a1a1a;
                      font-size: 16px;
                      font-weight: 700;
                      margin: 0 0 15px 0;
                      border-left: 3px solid #007bff;
                      padding-left: 10px;
                    "
                  >
                    Submission Details :
                  </h3>

                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    style="
                      background-color: #f9fafc;
                      border-radius: 6px;
                      border: 1px solid #eeeeee;
                    "
                  >
                    <tr>
                      <td
                        valign="top"
                        width="35%"
                        style="
                          padding: 12px 15px;
                          border-bottom: 1px solid #e0e0e0;
                          color: #666666;
                          font-size: 14px;
                          font-weight: 700;
                          text-transform: uppercase;
                        "
                      >
                        Email
                      </td>
                      <td
                        valign="top"
                        style="
                          padding: 12px 15px;
                          border-bottom: 1px solid #e0e0e0;
                          color: #1a1a1a;
                          font-size: 14px;
                          font-weight: 400;
                        "
                      >
                        ${email}
                      </td>
                    </tr>
                    ${answers
                        .map(
                            (a: { label: string; value: string }) => `
                    <tr>
                      <td
                        valign="top"
                        width="35%"
                        style="
                          padding: 12px 15px;
                          border-bottom: 1px solid #e0e0e0;
                          color: #666666;
                          font-size: 14px;
                          font-weight: 700;
                          text-transform: uppercase;
                        "
                      >
                        ${a.label}
                      </td>
                      <td
                        valign="top"
                        style="
                          padding: 12px 15px;
                          border-bottom: 1px solid #e0e0e0;
                          color: #1a1a1a;
                          font-size: 14px;
                          font-weight: 400;
                        "
                      >
                        ${a.value}
                      </td>
                    </tr>
                    `
                        )
                        .join("")}
                  </table>
                </td>
              </tr>
              <tr>
                <td
                  align="center"
                  style="padding: 30px 20px; background-color: #1a1a1a"
                >
                  <table
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                  >
                    <tr>
                      <td align="left" width="50%">
                        <a
                          href="https://www.addact.net/contact-us"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src="https://d3l7d9gtq0bnch.cloudfront.net/Logo_1_ffdf03e2d1.png"
                            alt="Addact Logo"
                            width="120"
                            style="display: block"
                          />
                        </a>
                      </td>

                      <td align="right" width="50%">
                        <a
                          href="https://www.facebook.com/addacttech/"
                          style="text-decoration: none; margin: 0 5px"
                        >
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/733/733547.png"
                            alt="Facebook"
                            width="22"
                          />
                        </a>
                        <a
                          href="https://www.instagram.com/addacttechnologies/"
                          style="text-decoration: none; margin: 0 5px"
                        >
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/2111/2111463.png"
                            alt="Instagram"
                            width="22"
                          />
                        </a>
                        <a
                          href="https://www.linkedin.com/company/addact-technologies/?viewAsMember=true"
                          style="text-decoration: none; margin: 0 5px"
                        >
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/3536/3536505.png"
                            alt="LinkedIn"
                            width="22"
                          />
                        </a>
                        <a
                          href="https://x.com/AddactTech"
                          style="text-decoration: none; margin: 0 5px"
                        >
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/5969/5969020.png"
                            alt="X"
                            width="22"
                          />
                        </a>
                        <p
                          style="
                            color: #999999;
                            font-size: 11px;
                            margin: 15px 0 0 0;
                          "
                        >
                          &copy; ${currentYear} Addact. All Rights Reserved.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>
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
