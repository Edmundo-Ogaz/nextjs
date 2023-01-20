import Avatar from '../components/avatar';
const Noop = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }) {
  const Auth = Component.Auth || Noop;

  return (
    <Auth>
      <h1>Applicant</h1>
      <Avatar/>
      <Component {...pageProps} />
    </Auth>
  );
}

export default MyApp;