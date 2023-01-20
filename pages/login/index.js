import { useState } from 'react';
import styles from './login.module.css';

export default function Login() {
	console.log('Login')
  const [ loading, setLoading ] = useState();
	const [ username, setUsername ] = useState();
	const [ password, setPassword ] = useState();
	const [ error, setError ] = useState();

  const handleLogin = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/users/login`, 
      {
        method: 'POST',
        body: JSON.stringify({email: username, password}),
        headers: {
          'Content-Type': 'application/json'
        },
      }
    )
    .then(response => response.json())
    .then((data) => {
      console.log(data)
      localStorage.setItem('user', JSON.stringify(data))
      document.cookie = 'user=true;';
      window.location = '/';
    })
    .catch(e => {
      console.error(e)
      setError(e.message)
    }) 
	};

  function handleUsername(event) {
		setUsername(event.target.value)
	}

  function handlePassword(event) {
		setPassword(event.target.value)
	}

  return (
    <div className={styles.login}>
      <div className={styles.title}>
        Login
      </div>
      <input type="text" label="name" id="name" style={ {margin: '15px auto'} } onChange={ handleUsername } />
      <input type="password" label="password" id="password" style={ {margin: '15px auto'} } onChange={ handlePassword } />
      {error && <><small style={ { color: 'red' } }>{error}</small></>}
      <div className={styles['login-button']} onClick={ handleLogin } disabled={ loading }>
        {loading ? 'Loading...' : 'Log in'}
      </div>
    </div>
    );
}
