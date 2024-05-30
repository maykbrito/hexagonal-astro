import { db, Comment } from 'astro:db';
import { randomUUID } from 'node:crypto'

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(Comment).values({
		id: randomUUID(),
		author: 'namizo',
		body: 'Olha, quero dizer que sou MUITO FA do React! MUITO AMOR! PRA SEMPRE!',
		likes: 0
	})
}
