const Noop = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }) {
  const Auth = Component.Auth || Noop;

  return (
    <Auth>
      <Component {...pageProps} />
    </Auth>
  );
}

export default MyApp;