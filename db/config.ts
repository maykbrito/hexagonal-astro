import { defineDb, defineTable, column } from 'astro:db';

const Comment = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    author: column.text(),
    body: column.text(),
    likes: column.number(),
  }
})


const Likes = defineTable({
  columns: {
    id: column.text({ primaryKey: true }), 
    user: column.text(),
    commentId: column.text({ 
      references: () => Comment.columns.id 
    }),
  }
})

export default defineDb({
  tables: { Comment, Likes },
})