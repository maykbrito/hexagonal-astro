import { expect, describe, it } from 'vitest';

import { HandleLikeUseCase } from '../src/core/use-cases/HandleLikeUseCase'
import { type BlogCommentRepository } from '../src/core/repositories/BlogCommentRepository'

describe('Like a comment', () => {
  it('should return null if has no comment', 
  async () => {
    const blogCommentRepo:BlogCommentRepository = {
      addLike: () => Promise.resolve(1),
      removeLike: () => Promise.resolve(0),
      getCommentById: (id) => Promise.resolve(null),
      userHasLiked: () => Promise.resolve(false)
    }

    const handleLikeUseCase = new HandleLikeUseCase(blogCommentRepo)
    const result = await handleLikeUseCase.execute('a1a', 'namizo')

    expect(result).toBeNull()
  })
})