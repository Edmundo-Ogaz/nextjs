import { useState } from 'react';
import WithPrivateRoute from '../../components/WithPrivateRoute.js'
import styles from './user.module.css';
import Menu from '../../components/menu/menu';

export default function CreatePostulant() {
	console.log('CreatePostulant')

  const [ saving, setSaving ] = useState();

  const [ rut, setRut ] = useState();
  const [ firstName, setFirstName ] = useState();
  const [ lastName, setLastName ] = useState();
  const [ email, setEmail ] = useState();

  const [ message, setMessage ] = useState();
  const [ error, setError ] = useState();

  const handleSave = async () => {
    console.log('handleSave')
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/postulants`,
        {
          method: 'POST',
          body: JSON.stringify({rut, firstName, lastName, email}),
          headers: {
            'Content-Type': 'application/json'
          },
        }
      )
      .then(postulant => postulant.json())
      console.log('Saved', response)
      setMessage('Saved')
    } catch(e) {
      console.error(e.message)
      setError(e.message)
    }
  }

  function handleRut(event) {
		setRut(event.target.value)
	}

  function handleFirstName(event) {
		setFirstName(event.target.value)
	}

  function handleLastName(event) {
		setLastName(event.target.value)
	}

  function handleEmail(event) {
		setEmail(event.target.value)
	}
     
  return (
    <>
      <Menu
        mode="horizontal"
        openAnimation="slide-up"
      />
      <div className={styles.user}>
        <h2>
        Crear Postulante
        </h2>
        <div className={styles.user__form}>
          <label forhtml="rut" className={styles.user__label}>
            <span className={styles['user__label-text']}>Rut</span>
            <input type="text" id="rut" className={styles.user__input} onChange={ handleRut } />
          </label>
          <label forhtml="firt_name" className={styles.user__label}>
            <span className={styles['user__label-text']}>Nombres</span>
            <input type="test" id="firt_name" size="50" className={styles.user__input} onChange={ handleFirstName } />
          </label>
          <label forhtml="last_name" className={styles.user__label}>
            <span className={styles['user__label-text']}>Apellidos</span>
            <input type="text" id="last_name" size="50" className={styles.user__input} onChange={ handleLastName } />
          </label>
          <label forhtml="email" className={styles.user__label}>
            <span className={styles['user__label-text']}>Email</span>
            <input type="text" id="email" size="30"className={styles.user__input} onChange={ handleEmail } />
          </label>
          {message && <><small style={ { color: 'gren' } }>{message}</small></>}
          {error && <><small style={ { color: 'red' } }>{error}</small></>}
          <div className={styles['user__button']} onClick={ handleSave } disabled={ saving }>
            {saving ? 'Saving...' : 'Save'}
          </div>
        </div>
      </div>
    </>
  );
}

CreatePostulant.Auth = WithPrivateRoute