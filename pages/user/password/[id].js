import { useState } from 'react';
import { useRouter } from 'next/router'

import styles from './user.module.css';

export default function RegisterPassword() {
	console.log('RegisterPassword')

  const router = useRouter()
  const { id } = router.query

  const [ isSaving, setIsSaving ] = useState(false);
  const [ password, setPassword ] = useState();
  const [ isPasswordCorrect, setIsPasswordCorrect ] = useState(false);
  const [ error, setError ] = useState();

  const handleSave = async () => {
    console.log('handleSave')
    setIsSaving(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/users/${id}/password`,
        {
          method: 'PATCH',
          body: JSON.stringify({password}),
          headers: {
            'Content-Type': 'application/json'
          },
        })
        .then(user => user.json())
      console.log('Saved', response)
      setIsSaving(false)
    } catch(e) {
      console.error(e.message)
      setError(e.message)
      setIsSaving(false)
    }
  }

  function handlePassword(event) {
		setPassword(event.target.value)
	}

  function handleRepeatPassword(event) {
    setIsPasswordCorrect(password === event.target.value ? true : false)
	}
     
  return (
    <>
      <div className={styles.user}>
        <h2>
        Registrar Password
        </h2>
        <div className={styles.user__form}>
          <label forhtml="password" className={styles.user__label}>
            <span className={styles['user__label-text']}>Password</span>
            <input type="text" id="password" className={styles.user__input} onChange={ handlePassword } />
          </label>
          <label forhtml="repeatPassword" className={styles.user__label}>
            <span className={styles['user__label-text']}>Repetir Password</span>
            <input type="text" id="repeatPassword" className={styles.user__input} onChange={ handleRepeatPassword } />
          </label>
          {error && <><small style={ { color: 'red' } }>{error}</small></>}
          <button className={styles['user__button']} onClick={ handleSave } disabled={ !isPasswordCorrect || isSaving }>
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </>
  );
}
