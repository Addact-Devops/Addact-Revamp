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
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "Unknown";

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
      return NextResponse.json(
        { message: "Missing Google Sheets credentials" },
        { status: 500 }
      );
    }

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const now = new Date();
    const currentYear = new Date().getFullYear();
    const rowValues = [
      name,
      email,
      companyName,
      ,
      plainTextForSheets,
      pageTitle,
      formatDateTime(now),
      ip,
    ];

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
        <head>
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
                    New Contact Form Submission Received by  ${escapeHtml(
                      name
                    )}!
                  </h3>
                  <p
                    style="
                      color: #555555;
                      font-size: 14px;
                      line-height: 26px;
                      margin: 0 0 25px 0;
                    "
                  >
                    A new inquiry has been received. Please review the details submitted by the user below.
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
                    Submission Details:
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
                        Name
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
                        ${escapeHtml(name)}
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
                        Email Address
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
                        ${escapeHtml(email)}
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
                        Company Name
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
                        ${escapeHtml(companyName)}
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
                        Requirements
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
                        ${htmlForEmail}
                      </td>
                    </tr>
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
      `,
    });
    await transporter.sendMail({
      from: `"Addact Technologies" <info@addact.net>`,
      to: email,
      subject: "Addact - Thank You for Your Inquiry",
      html: `
        <html>
         <head>
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
      style="table-layout: fixed; border: 1px solid #8e8b8b61; border-radius:8px"
    >
      <tr>
        <td align="center" >
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
                  Dear ${escapeHtml(name)}!
                </h3>
                <p
                  style="
                    color: #555555;
                    font-size: 14px;
                    line-height: 26px;
                    margin: 0 0 25px 0;
                  "
                >
                  We have received your message and will get back to you
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
                  Submission Details:
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
                      Name
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
                      ${escapeHtml(name)}
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
                      Email Address
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
                      ${escapeHtml(email)}
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
                      Company Name
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
                      ${escapeHtml(companyName)}
                    </td>
                  </tr>
                  ${
                    plainTextForSheets
                      ? `
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
                      Description
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
                      ${htmlForEmail}
                    </td>
                  </tr>
                  `
                      : ""
                  }
                </table>
              </td>
            </tr>
            <tr>
              <td
                align="center"
                style="padding: 30px 20px; background-color: #1a1a1a"
              >
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
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
      `,
    });

    return NextResponse.json({ message: "Success" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Google Sheets API error:", error.message);
      return NextResponse.json(
        { message: "Error", error: error.message },
        { status: 500 }
      );
    } else {
      console.error("Unknown error:", error);
      return NextResponse.json({ message: "Unknown error" }, { status: 500 });
    }
  }
}
