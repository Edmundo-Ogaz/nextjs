import { useState } from 'react';

import styles from './password.module.css';

export default function RegisterPassword({user}) {
	console.log('RegisterPassword')

  const [ isSaving, setIsSaving ] = useState(false);
  const [ password, setPassword ] = useState();
  const [ repeatPassword, setRepeatPassword ] = useState();
  const [ isPasswordCorrect, setIsPasswordCorrect ] = useState(false);
  const [ error, setError ] = useState();

  const cleanForm = () => {
    console.log('cleanForm')
    setPassword('');
    setRepeatPassword('')
  }

  const handleSave = async () => {
    console.log('handleSave')
    setIsSaving(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/users/${user.id}/password`,
        {
          method: 'PATCH',
          body: JSON.stringify({password}),
          headers: {
            'Content-Type': 'application/json'
          },
        })
        .then(user => user.json())
      console.log('Saved', response)
      alert('Saved')
      cleanForm()
      setIsSaving(false)
    } catch(e) {
      console.error(e.message)
      setError(e.message)
      setIsSaving(false)
    }
  }

  function handlePassword(event) {
    console.log('handlePassword',event.target.value)
		setPassword(event.target.value)
	}

  function handleRepeatPassword(event) {
    setRepeatPassword(event.target.value)
    setIsPasswordCorrect(password === event.target.value ? true : false)
	}

  function handleSubmit(event) {
    event.preventDefault();
  }
     
  return (
    <>
      <div className={styles.user}>
        <h2>
        Registrar Nuevo Password
        </h2>
        <p>Nombre: {user.firstName} {user.lastName}</p>
        <p>Email: {user.email}</p>
        <form className={styles.user__form} onSubmit={ handleSubmit }>
          <label forhtml="password" className={styles.user__label}>
            <span className={styles['user__label-text']}>Password</span>
            <input type="password" id="password" value={password} className={styles.user__input} onChange={ handlePassword } />
          </label>
          <label forhtml="repeatPassword" className={styles.user__label}>
            <span className={styles['user__label-text']}>Repetir Password</span>
            <input type="password" id="repeatPassword" value={repeatPassword} className={styles.user__input} onChange={ handleRepeatPassword } />
          </label>
          {error && <><small style={ { color: 'red' } }>{error}</small></>}
          <button className={`${styles["user__button"]} ${!isPasswordCorrect && styles["user__button--dissabled"]}` } onClick={ handleSave } disabled={ !isPasswordCorrect || isSaving }>
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>
    </>
  );
}

export async function getServerSideProps({params}) {
  try {
    console.log('getServerSideProps')
    const id = params.id
    if (isNaN(id)) {
      return {
        redirect: {
          permanent: false,
          destination: "/error",
        },
        props:{},
      };
    }
    const user = await fetch(`${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/users/${id}`).then(user => user.json())
    console.log(user)
    if (Object.keys(user).length === 0) {
      return {
        redirect: {
          permanent: false,
          destination: "/error",
        },
        props:{},
      };
    }
    return {
      props: {
        user
      },
    }
  } catch(e) {
    console.error(e.message)
    return {
      redirect: {
        permanent: false,
        destination: "/error",
      },
      props:{},
    };
  }
}
