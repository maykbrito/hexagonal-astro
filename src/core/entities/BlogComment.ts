export class BlogComment {
  id = null
  content = ""
  authorName = ""
  like = 0
  
  constructor(content: string, authorName: string) {
    this.content = content
    this.authorName = authorName
  }
}
