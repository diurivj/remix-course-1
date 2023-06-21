import { Form, useActionData } from '@remix-run/react';
import { useProfileContext } from '../_layout';
import { json, type ActionArgs } from '@remix-run/node';

export function loader() {
  console.log('loader');
  return null;
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const name = formData.get('profile-name');
  const id = formData.get('user-id');

  // Update the user's profile in the database...
  const result = 'Profile updated!';

  return json({ result });
}

export default function ProfileEdit() {
  const user = useProfileContext();

  const actionData = useActionData<typeof action>();

  return (
    <div>
      <h1 className='text-xl'>Editar el perfil de {user.name}</h1>
      <Form method='post' action='.'>
        <input
          type='text'
          className='border'
          name='profile-name'
          placeholder='John'
          defaultValue={user.name}
        />

        <input
          readOnly
          type='hidden'
          name='user-id'
          value={123123}
          className='sr-only hidden'
        />

        <button type='submit'>Submit</button>
      </Form>
      {actionData && <p>{actionData.result}</p>}
    </div>
  );
}
