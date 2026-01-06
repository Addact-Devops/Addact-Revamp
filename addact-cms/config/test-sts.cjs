const { STSClient, GetCallerIdentityCommand } = require("@aws-sdk/client-sts");
 
(async () => {
  const client = new STSClient({
    region: process.env.AWS_REGION || "ap-south-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
 
  try {
    const res = await client.send(new GetCallerIdentityCommand({}));
    console.log("✅ Caller identity:", res);
  } catch (err) {
    console.error("❌ STS error:", err.name, err.message);
    if (err.$metadata) console.error("Metadata:", err.$metadata);
  }
})();
