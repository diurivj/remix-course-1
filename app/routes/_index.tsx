import { json, type LoaderArgs } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';

// Loader -> Se ejecuta en el server.
// Loader -> Lo primero que pasa antes de mostrar el UI.
export function loader(_: LoaderArgs) {
  const fakeData = {
    msg: 'Holaaaaaaaa!',
    date: new Date(),
  };

  return json(fakeData);
}

export function action() {
  console.log('action');
  return null;
}

export default function Index() {
  const { msg } = useLoaderData<typeof loader>();

  return (
    <>
      <h1 className='underline'>{msg}</h1>
      <Form method='post'>
        <button type='submit'>Request!</button>
      </Form>
    </>
  );
}
