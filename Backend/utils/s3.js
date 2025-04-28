const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { fromIni } = require("@aws-sdk/credential-provider-ini");
require('dotenv').config();

const s3Client = new S3Client({
    region:process.env.AWS_REGION,
    credentials:{
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const putObject = async function (filename, ContentType)  {
    
    const command = new PutObjectCommand({
        Bucket: "computrack-product",
        Key: filename,
        ContentType: ContentType,
        
    });
    try {
        const url = await getSignedUrl(s3Client, command);
        return url;
    } catch (error) {
        console.error("Error generating signed URL:", error);
        throw new Error("Failed to generate signed URL");
    }
};

module.exports = { putObject };