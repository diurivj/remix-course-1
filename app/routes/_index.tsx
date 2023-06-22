import { json, type DataFunctionArgs } from '@remix-run/node';
import { Link, useFetcher, useLoaderData } from '@remix-run/react';
import { createNote, getAllNotes } from '~/models/note.server';

export async function action({ request }: DataFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get('note-name');
  const content = formData.get('note-content');

  if (typeof name !== 'string' || typeof content !== 'string') {
    throw new Error('Invalid form data');
  }

  await createNote({ name, content });
  return null;
}

export async function loader(_: DataFunctionArgs) {
  const notes = await getAllNotes();
  return json({ notes });
}

export default function Index() {
  const { notes } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  return (
    <main className='mx-auto py-10 max-w-7xl sm:px-6 lg:px-8'>
      <section className='mb-10'>
        <h1 className='text-xl font-medium'>Notes</h1>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <Link
                to={`/note/${note.id}`}
                prefetch='intent'
                className='underline underline-offset-2'
              >
                {note.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <h2 className='text-xl font-medium mb-4'>Create note</h2>
      <fetcher.Form method='post' action='/?index' className='space-y-4'>
        <div>
          <label
            htmlFor='note-name'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Name
          </label>
          <div className='mt-2'>
            <input
              type='text'
              name='note-name'
              id='note-name'
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>
        <div>
          <label
            htmlFor='note-content'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Content
          </label>
          <div className='mt-2'>
            <input
              type='text'
              name='note-content'
              id='note-content'
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>
        <button
          type='submit'
          className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          {fetcher.state === 'submitting' ? 'Creating note...' : 'Create note!'}
        </button>
      </fetcher.Form>
    </main>
  );
}

export function ErrorBoundary() {
  return <>Oh no!</>;
}
