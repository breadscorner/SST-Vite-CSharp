import { Hono } from 'hono'
import { handle } from 'hono/aws-lambda'

const app = new Hono()

import { likes as likesTable } from "@my-sst-app/core/db/schema/likes";
import { db } from "@my-sst-app/core/db";

app.post('/likes', async (c) => {
  const body = await c.req.json();
  const postId = body.postId
  const userId = body.userId

  const liked = await db.insert(likesTable).values({userId:userId, postId:postId}).returning();
  return c.json({liked: liked})
})


export const handler = handle(app)