
import { useState, useEffect } from "react";

export default function Avatar( props ) {
	console.log('Avatar')

  const [ username, setUsername ] = useState()

  useEffect(function onFirstMount() {
    const user = window.localStorage.getItem('user')
      if(user) {
        const oUser = JSON.parse(user)
        setUsername(oUser.email)
      }
  }, []);

  return (
    <span>{username}</span>
  );
}