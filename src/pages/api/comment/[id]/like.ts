import { type APIRoute } from 'astro'
import { HandleLikeUseCase } from '../../../../core/use-cases/HandleLikeUseCase'
import { AstroDbBlogCommentRepository } from '../../../../infra/db/astro-db/AstroDbBlogCommentRepository'

export const POST: APIRoute = async({request, params}) => {
  const body = await request.json()
  
  if(!body?.user || !params.id) {
    return new Response('Lack of params', {
      status: 400
    })
  }

  const handleLikeUseCase = new HandleLikeUseCase(
    new AstroDbBlogCommentRepository()
  )

  const totalLikes = await handleLikeUseCase.execute(
    params.id,
    body.user,
  )

  if(totalLikes === null) {
    return new Response('something wrong', {
      status: 500
    })
  }

  return new Response(JSON.stringify({likes: totalLikes}), {
    status: 200
  })
}