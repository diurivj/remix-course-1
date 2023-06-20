import type { V2_MetaFunction } from '@remix-run/node';
import styles from '~/index.css';

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'Este es el titulo' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1>Hola a todos!</h1>
    </div>
  );
}
