import type { BlogCommentRepository } from "../repositories/BlogCommentRepository";

export class HandleLikeUseCase {
  constructor(private blogCommentRepo: BlogCommentRepository) {
  }

  async execute(commentId: string, user: string): Promise<number | null> {
    const comment = await this.blogCommentRepo.getCommentById(commentId)

    if(!comment) {
      return null
    }

    const isAuthorComment = comment.authorName == user

    if(isAuthorComment) {
      return null
    }

    const userHasLiked = await this.blogCommentRepo.userHasLiked(commentId, user)

    if(userHasLiked) {
      return this.blogCommentRepo.removeLike(commentId, user)
    }

    return this.blogCommentRepo.addLike(commentId, user)
  }
}