/**
 * Thin wrapper around the S3Client from the AWS SDK.
 */
const {S3Client, PutObjectCommand, DeleteObjectCommand} = require("@aws-sdk/client-s3");
const REGION = process.env.REGION;

const s3 = new S3Client({region: REGION});

async function putObject(params) {
  return s3.send(new PutObjectCommand(params));
}

async function deleteObject(params) {
  return s3.send(new DeleteObjectCommand(params));
}

module.exports = {putObject, deleteObject};