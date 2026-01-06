// test-s3.js
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";

const region = process.env.AWS_REGION || "ap-south-1";
const bucket = process.env.AWS_BUCKET;
const key = "strapi-test-upload.txt";
const body = "hello from test " + new Date().toISOString();

async function run() {
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
        console.error("Missing AWS env vars in this process. Check exports.");
        process.exit(2);
    }
    console.log("Using region:", region, "bucket:", bucket);

    const client = new S3Client({
        region,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
        maxAttempts: 3,
    });

    try {
        const cmd = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: body,
        });
        const res = await client.send(cmd);
        console.log("Upload result:", res);
    } catch (err) {
        console.error("ERROR from SDK:", err);
        if (err.name) console.error("Error name:", err.name);
        if (err.$metadata) console.error("Metadata:", err.$metadata);
        process.exit(1);
    }
}

run();
