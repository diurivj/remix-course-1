import { redirect, type DataFunctionArgs, json } from '@remix-run/node';
import { Link, useLoaderData, useRouteError } from '@remix-run/react';
import { getNoteById } from '~/models/note.server';

export async function loader({ params }: DataFunctionArgs) {
  const { id } = params;

  if (!id) {
    throw new Response('Missing note id', { status: 400 });
  }

  const note = await getNoteById(Number(id));

  if (!note) {
    // 404, mostrar mensaje de que no existe!
    throw new Response('Missing note', { status: 404 });
  }

  return json({ note });
}

export default function NoteDetail() {
  const { note } = useLoaderData<typeof loader>();

  return (
    <main className='mx-auto py-10 max-w-7xl sm:px-6 lg:px-8'>
      <section className='space-y-2'>
        <h1 className='text-xl font-medium'>{note.name}</h1>
        <p>{note.content}</p>
      </section>

      <Link className='mt-4 underline' to='/'>
        Go back!
      </Link>
    </main>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  return <h1>oh no!</h1>;
}
