import { useState } from 'react';

import WithPrivateRoute from '../../components/WithPrivateRoute.js'
import Layout from '../../components/layout2.js';

import styles from './postulant.module.css';

export default function CreatePostulant() {
	console.log('CreatePostulant')

  const [ saving, setSaving ] = useState();

  const [ rut, setRut ] = useState();
  const [ firstName, setFirstName ] = useState();
  const [ lastName, setLastName ] = useState();
  const [ age, setAge ] = useState();
  const [ sexo, setSexo ] = useState();
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
          body: JSON.stringify({rut, firstName, lastName, age, sexo, email}),
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
  
  function handleAge(event) {
		setAge(event.target.value)
	}
  
  function handleSexo(event) {
		setSexo(event.target.value)
	}

  function handleEmail(event) {
		setEmail(event.target.value)
	}
     
  return (
    <>
      <Layout>
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
            <label forhtml="age" className={styles.user__label}>
              <span className={styles['user__label-text']}>Edad</span>
              <input type="number" id="age" min="1" max="100" className={styles.user__input} onChange={ handleAge } />
            </label>
            <label forhtml="sexo" className={styles.user__label}>
              <span className={styles['user__label-text']}>Sexo</span>
              <select name="sexo" id="sexo" className={styles.user__input} onChange={ handleSexo}>
                <option value="">Selecionar...</option>
                <option value="femenino">Femenino</option>
                <option value="masculino">Masculino</option>
              </select>
              <input type="number" id="sexo" min="1" max="100" className={styles.user__input} onChange={ handleAge } />
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
      </Layout>
    </>
  );
}

CreatePostulant.Auth = WithPrivateRoute