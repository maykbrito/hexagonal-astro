import { BlogComment } from "../../../core/entities/BlogComment";
import type { BlogCommentRepository } from "../../../core/repositories/BlogCommentRepository";

import { db, Comment, Likes, eq, and, sql } from "astro:db";
import { randomUUID } from "node:crypto";

export class AstroDbBlogCommentRepository implements BlogCommentRepository {
  constructor() {}

  async addLike(commentId: string, user: string): Promise<number> {
    await db.insert(Likes).values({
      id: randomUUID(),
      commentId,
      user,
    });

    const updatedComment = await db
      .update(Comment)
      .set({
        likes: sql`${Comment.likes} + 1`,
      })
      .where(eq(Comment.id, commentId))
      .returning({
        likes: Comment.likes,
      })

    return updatedComment[0].likes;
  }

  async getCommentById(id: string): Promise<BlogComment | null> {
    const comments = await db.select().from(Comment).where(eq(Comment.id, id));

    if (!comments[0]) return null;

    return new BlogComment(comments[0].body, comments[0].author);
  }

  async removeLike(commentId: string, user: string): Promise<number> {
    await db
      .delete(Likes)
      .where(and(eq(Likes.commentId, commentId), eq(Likes.user, user)));

    return (
      await db
        .update(Comment)
        .set({
          likes: sql`${Comment.likes} - 1`,
        })
        .where(eq(Comment.id, commentId))
        .returning({
          like: Comment.likes,
        })
    )[0].like;
  }

  async userHasLiked(commentId: string, user: string): Promise<boolean> {
    return Boolean(
      (
        await db
          .select()
          .from(Likes)
          .where(and(eq(Likes.commentId, commentId), eq(Likes.user, user)))
          .limit(1)
      )[0]
    );
  }
}
