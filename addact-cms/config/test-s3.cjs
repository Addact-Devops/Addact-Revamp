const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
 
const region = process.env.AWS_REGION || "ap-south-1";
const bucket = process.env.AWS_BUCKET || "addact-website";
 
const client = new S3Client({
  region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
 
(async () => {
  try {
    const filePath = "/etc/hosts"; // small test file
    const data = fs.readFileSync(filePath);
 
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: "test-upload.txt",
      Body: data,
    });
 
    const res = await client.send(command);
    console.log("✅ Upload success:", res);
  } catch (err) {
    console.error("❌ ERROR from SDK:", err.name, err.message);
    if (err.$metadata) console.error("Metadata:", err.$metadata);
  }
})();
