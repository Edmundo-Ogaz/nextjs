import Avatar from '../components/avatar';

import '../styles/global.css'
const Noop = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }) {
  const Auth = Component.Auth || Noop;

  return (
    <Auth>
      <header style={{display: 'flex', justifyContent: 'space-between'}}>
        <h1 id="logo">Applicant</h1>
        <Avatar/>
      </header>
      <Component {...pageProps} />
    </Auth>
  );
}

export default MyApp;