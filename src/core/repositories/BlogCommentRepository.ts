import type { BlogComment } from "../entities/BlogComment";

export interface BlogCommentRepository {
  getCommentById: (id: string) => 
    Promise<BlogComment | null>

  addLike: (commentId: string, user: string)
    => Promise<number>

  removeLike: (commentId: string, user: string) 
    => Promise<number>

  userHasLiked: (commentId: string, user: string) 
    => Promise<boolean>
}