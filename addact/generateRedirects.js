const xlsx = require("xlsx");
const fs = require("fs");

const workbook = xlsx.readFile("./public/redirects.xlsx");
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

const data = xlsx.utils.sheet_to_json(sheet);

const redirects = data.map((row) => ({
    source: row.source,
    destination: row.destination,
    permanent: row.permanent === "true" ? true : false,
}));

const output = `module.exports = ${JSON.stringify(redirects, null, 2)};\n`;

fs.writeFileSync("redirects.js", output);

console.log("Redirects written to redirects.js");
