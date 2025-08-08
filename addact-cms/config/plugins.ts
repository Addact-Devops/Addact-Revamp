export default () => {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_ACCESS_SECRET;
  const region = process.env.AWS_REGION;
  const bucket = process.env.AWS_BUCKET;
  const cdnUrl = process.env.CDN_URL;

//   console.log('💡 AWS Credentials (sanitized):', {
//     accessKeyId: accessKeyId?.slice(0, 4) + '****',
//     secretAccessKey: secretAccessKey ? '****' : null,
//     region,
//     bucket,
//     cdnUrl,
//   });

  return {
    graphql: {
      // config: { ... }
    },

    upload: {
      config: {
        provider: "aws-s3", // ✅ Always use full package name in Strapi v5
        providerOptions: {
          s3Options: {
            region,
            credentials: {
              accessKeyId,
              secretAccessKey,
            },
            params: {
              Bucket: bucket,
            },
          },
          baseUrl: cdnUrl,
          cdn: {
            url: cdnUrl,
          },
        },

        actionOptions: {
          upload: {
            beforeUpload(file) {
              file.url = `${cdnUrl}/${file.hash}${file.ext}`;
              return file;
            },
          },
          uploadStream: {},
          delete: {},
        },
      },
    },
    // seo: {
    //   enabled: true,
    // },
  };
};
