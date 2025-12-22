import {
  S3Client,
  DeleteObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";
import path from "path";

const {
  SPACES_ACCESS_KEY,
  SPACES_SECRET_KEY,
  SPACES_REGION,
  SPACES_ENDPOINT,
  SPACES_BUCKET,
  SPACES_CDN_URL,
  UPLOAD_FOLDER = "KN Medicolegal Support",
} = process.env;

let s3Client;

function getClient() {
  if (
    !SPACES_ACCESS_KEY ||
    !SPACES_SECRET_KEY ||
    !SPACES_BUCKET ||
    !SPACES_REGION
  ) {
    throw new Error("DigitalOcean Spaces credentials are not configured");
  }

  if (!s3Client) {
    s3Client = new S3Client({
      region: SPACES_REGION,
      endpoint: SPACES_ENDPOINT,
      forcePathStyle: false,
      credentials: {
        accessKeyId: SPACES_ACCESS_KEY,
        secretAccessKey: SPACES_SECRET_KEY,
      },
    });
  }

  return s3Client;
}

function buildPublicUrl(key) {
  if (!key) return null;
  if (SPACES_CDN_URL) {
    return `${SPACES_CDN_URL.replace(/\/$/, "")}/${key}`;
  }
  const endpoint = SPACES_ENDPOINT?.replace(/\/$/, "");
  if (endpoint) {
    return `${endpoint}/${SPACES_BUCKET}/${key}`;
  }
  return `https://${SPACES_BUCKET}.${SPACES_REGION}.digitaloceanspaces.com/${key}`;
}

function normaliseKey(input) {
  if (!input) return null;
  if (input.startsWith("http")) {
    try {
      const parsed = new URL(input);
      return parsed.pathname.replace(/^\//, "");
    } catch (error) {
      return null;
    }
  }
  return input.replace(/^\//, "");
}

export async function createUploadUrl({ fileName, fileType }) {
  const client = getClient();
  const ext = path.extname(fileName);
  const key = `${UPLOAD_FOLDER}/${randomUUID()}${ext}`;

  const command = new PutObjectCommand({
    Bucket: SPACES_BUCKET,
    Key: key,
    ContentType: fileType,
    ACL: "public-read",
  });

  const url = await getSignedUrl(client, command, { expiresIn: 60 * 5 });

  const publicUrl = buildPublicUrl(key);

  return { url, key, publicUrl };
}

export async function uploadBuffer({ fileName, fileType, buffer }) {
  if (!buffer) {
    throw new Error("Missing file buffer");
  }

  const client = getClient();
  const ext = path.extname(fileName || "");
  const key = `${UPLOAD_FOLDER}/${randomUUID()}${ext}`;

  await client.send(
    new PutObjectCommand({
      Bucket: SPACES_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: fileType,
      ACL: "public-read",
    })
  );

  const publicUrl = buildPublicUrl(key);

  return { key, publicUrl };
}

export async function deleteObject(inputKey) {
  const key = normaliseKey(inputKey);
  if (!key) return;
  const client = getClient();
  await client.send(
    new DeleteObjectCommand({
      Bucket: SPACES_BUCKET,
      Key: key,
    })
  );
}

export function getPublicUrl(key) {
  return buildPublicUrl(normaliseKey(key));
}
