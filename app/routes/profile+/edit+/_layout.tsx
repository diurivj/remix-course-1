import { Outlet } from '@remix-run/react';
import { ProfileEditHeader } from './ProfileEditHeader';

export default function EditProfileLayout() {
  return (
    <>
      <ProfileEditHeader />
      <Outlet />
    </>
  );
}
