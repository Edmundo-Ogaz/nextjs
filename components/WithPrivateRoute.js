import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function WithPrivateRoute({ children }) {
  const router = useRouter();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user')
    if(user) {
      setAuth(true)
    } else {
      router.push('/login');
    }
  }, []);

  return !auth ? <></>:<>{children}</>;
};