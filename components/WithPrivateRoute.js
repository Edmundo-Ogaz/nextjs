import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function WithPrivateRoute({ children }) {
  const router = useRouter();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const cookies = document.cookie;
    const aCookies = cookies.split(';')
    if(aCookies.indexOf('user=true') == 0) {
      setAuth(true)
    } else {
      router.push('/login');
    }
  }, []);

  return !auth ? <></>:<>{children}</>;
};