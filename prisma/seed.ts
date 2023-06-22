import { type Note, PrismaClient } from '@prisma/client';

type NoteForSeed = Pick<Note, 'name' | 'content'>;

const notes: NoteForSeed[] = [
  {
    name: 'Note 1',
    content: 'This is the first note',
  },
  {
    name: 'Note 2',
    content: 'This is the second note',
  },
];

async function seed() {
  const db = new PrismaClient();
  Promise.all(notes.map(async (note) => await db.note.create({ data: note })));
}

seed();
