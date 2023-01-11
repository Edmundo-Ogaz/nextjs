import { useState } from 'react';
import styles from './login.module.css';

export default function Login() {
	console.log('Login')
  const [ loading, setLoading ] = useState();
	const [ username, setUsername ] = useState();
	const [ password, setPassword ] = useState();
	const [ error, setError ] = useState();

  const handleLogin = () => {
    localStorage.setItem('user', true)
    window.location = '/';
	};

  return (
    <div className={styles.login}>
      <div className={styles.title}>
        Login
      </div>
      <input type="text" label="name" id="name" style={ {margin: '15px auto'} } onChange={ setUsername } />
      <input type="password" label="password" id="password" style={ {margin: '15px auto'} } onChange={ setPassword } />
      <div className={styles['login-button']} onClick={ handleLogin } disabled={ loading }>
        {loading ? 'Loading...' : 'Log in'}
      </div>
    </div>
    );
}
