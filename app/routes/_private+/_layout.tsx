import { getAuth } from '@clerk/remix/ssr.server';
import { redirect, type DataFunctionArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';

export async function loader(args: DataFunctionArgs) {
  const { sessionId } = await getAuth(args);
  if (!sessionId) return redirect('/login');
  return null;
}

export default function PrivateLayout() {
  return <Outlet />;
}
