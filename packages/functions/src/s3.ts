import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

import { Hono } from "hono";
import { handle } from "hono/aws-lambda";

// import { authMiddleware } from "@my-sst-app/core/auth";

const app = new Hono();

const s3 = new S3Client({});

const randomString = (length: number) =>
  crypto.randomBytes(length).toString("hex");

app.post("/signed-url", async (c) => {
  const userId = c.var.userId;
  const { contentType } = await c.req.json();

  const imageName = randomString(16);
  const putCommand = new PutObjectCommand({
    ACL: "public-read",
    Bucket: process.env.ASSETS_BUCKET_NAME!,
    Key: imageName,
    ContentType: contentType,
  });

  const url = await getSignedUrl(s3, putCommand, { expiresIn: 60 * 5 });

  return c.json({ url });
});

export const handler = handle(app);