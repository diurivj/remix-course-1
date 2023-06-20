import type { V2_MetaFunction } from '@remix-run/node';
import styles from '~/about.css';

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

// named exports
export const meta: V2_MetaFunction = () => {
  return [
    {
      title: 'About',
    },
  ];
};

// default export
export default function About() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1>About</h1>
    </div>
  );
}
