import { useState } from 'react';
import { useRouter } from 'next/router';

import Menu from './menu';
import LoadingSpinner from './LoadingSpinner';

export default function Layout({ children }) {

  const router = useRouter();

  const [ isLoading, setIsLoading ] = useState()

  function handleMenu(info) {
    console.log('handleMenu')
    switch (info.key) {
      case '1':
        router.push('/');
        setIsLoading(true)
        break;
      case '2-2':
        router.push('/test/ic/list');
        setIsLoading(true)
        break;
      case '3-3':
        router.push('/test/assign');
        setIsLoading(true)
        break;
      case '4-1':
        router.push('/user/create');
        setIsLoading(true)
        break;
      case '4-2':
        router.push('/postulant/create');
        setIsLoading(true)
        break;
      case '5-2':
        document.cookie = 'user' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        localStorage.clear('user')
        router.push('/login');
        setIsLoading(true)
        break;
      default:
        break;
    }
  }

  return (
      <>
       <Menu
          mode="horizontal"
          openAnimation="slide-up"
          handleMenu={handleMenu}
        />
        <main>{children}</main>
        {isLoading && <LoadingSpinner/>}
      </>
  )
}