import { Hono } from 'hono'
import { handle } from 'hono/aws-lambda'

const app = new Hono()

import { posts as postsTable } from "@my-sst-app/core/db/schema/post";
import { likes as likesTable} from '@my-sst-app/core/db/schema/likes';
import { db } from "@my-sst-app/core/db";
import { eq, desc, count } from "drizzle-orm";

// import { authMiddleware } from "@my-sst-app/core/auth";

app.get('/posts', async (c) => {
  const result = await db
    .select({
      id:postsTable.id,
      userId: postsTable.userId,
      title: postsTable.title,
      description: postsTable.description,
      url: postsTable.url,
      createdAt: postsTable.createdAt,
      numLikes: count(likesTable.id),
      postId: likesTable.postId
    })
    .from(postsTable)
    .leftJoin(likesTable, eq(postsTable.id, likesTable.postId))
    .groupBy(likesTable.postId, postsTable.id)
    .orderBy(desc(postsTable.createdAt))

  return c.json(result)
})

app.post('/posts', async (c) => {
  const body = await c.req.json();
  const title = body.title
  const description = body.description
  const userId = body.userId
  const url = body.url

  const post = await db.insert(postsTable).values({title:title, description:description, userId:userId, url:url}).returning();
  return c.json({post: post})

})

app.delete('/posts', async (c) => {
  const body = await c.req.json()
  const id = body.postId
  await db.delete(likesTable).where(eq(likesTable.postId, id)).returning();
  const deletedPost = await db.delete(postsTable).where(eq(postsTable.id, id)).returning();

  return c.json(deletedPost)
})


export const handler = handle(app)
