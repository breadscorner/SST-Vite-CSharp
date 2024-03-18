import { Hono } from "hono";
import { handle } from "hono/aws-lambda";

const app = new Hono();

app.get("/", (c) => {
  return c.html("<h1>Hello Hono!</h1>");
});

export const handler = handle(app);
