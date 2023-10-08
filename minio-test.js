"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AWS = require("aws-sdk");
var fs = require("fs");
// Ensure test.txt exists in the same directory as the script.
if (!fs.existsSync('test.txt')) {
    fs.writeFileSync('test.txt', 'Hello, world!');
}
// Environment variables
var MINIO_ENDPOINT = process.env.MINIO_ENDPOINT || 'http://localhost:9000';
var MINIO_ACCESS_KEY = process.env.MINIO_ACCESS_KEY || 'minio';
var MINIO_SECRET_KEY = process.env.MINIO_SECRET_KEY || 'minio123';
// Initialize the MinIO S3 client
var s3 = new AWS.S3({
    accessKeyId: MINIO_ACCESS_KEY,
    secretAccessKey: MINIO_SECRET_KEY,
    endpoint: MINIO_ENDPOINT,
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
});
// Upload parameters
var uploadParams = {
    Bucket: 'image-uploads',
    Key: 'test.txt',
    Body: fs.createReadStream('test.txt'),
};
// Upload the file to the MinIO bucket
s3.upload(uploadParams, function (err, data) {
    if (err) {
        console.log('Upload Error:', err);
    }
    if (data) {
        console.log('Upload Success:', data.Location);
    }
});
// List all objects in the MinIO bucket
var listParams = {
    Bucket: 'image-uploads', // Corrected bucket name to match uploadParams
};
s3.listObjects(listParams, function (err, data) {
    if (err) {
        console.log('List Error:', err);
    }
    if (data) {
        console.log('Bucket List:', data.Contents);
    }
});
