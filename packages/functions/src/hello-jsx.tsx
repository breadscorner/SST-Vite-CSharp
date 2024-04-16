import { Hono } from "hono";
import { handle } from "hono/aws-lambda";

import { authMiddleware } from "@my-sst-app/core/auth";

const app = new Hono();

app.get("/hello-jsx", authMiddleware, (c) => {
  return c.html("<h1>Hello Hono!</h1>");
});

export const handler = handle(app);
