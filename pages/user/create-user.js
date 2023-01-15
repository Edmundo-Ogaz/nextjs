import { useState } from 'react';
import WithPrivateRoute from '../../components/WithPrivateRoute.js'
import styles from './user.module.css';
import Menu from '../../components/menu/menu';

export default function CreateUser({companies, profiles}) {
	console.log('CreateUser')

  const [ saving, setSaving ] = useState();
  const [ rut, setRut ] = useState();
  const [ firtName, setFirtName ] = useState();
  const [ lastName, setLastName ] = useState();
  const [ email, setEmail ] = useState();
  const [ company, setCompany ] = useState();
  const [ profile, setProfile ] = useState();
  const [ error, setError ] = useState();

  const handleSave = async () => {
    console.log('handleSave')
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/user`,
        {
          method: 'POST',
          body: JSON.stringify({rut, firtName, lastName, email, companyId: company, permissionId: profile}),
          headers: {
            'Content-Type': 'application/json'
          },
        })
        .then(user => user.json())
        console.log('Saved', response)
      return
    } catch(e) {
      console.error(e.message)
      setError(e.message)
    }
  }

  function handleRut(event) {
		setRut(event.target.value)
	}

  function handleFirtName(event) {
		setFirtName(event.target.value)
	}

  function handleLastName(event) {
		setLastName(event.target.value)
	}

  function handleEmail(event) {
		setEmail(event.target.value)
	}

  function handleCompany(event) {
		setCompany(event.target.value)
	}

  function handleProfile(event) {
		setProfile(event.target.value)
	}
     
  return (
    <>
      <Menu
        mode="horizontal"
        openAnimation="slide-up"
      />
      <div className={styles.user}>
        <h2>
        Crear Usuario
        </h2>
        <div className={styles.user__form}>
          <label forhtml="rut" className={styles.user__label}>
            <span className={styles['user__label-text']}>Rut</span>
            <input type="text" id="rut" className={styles.user__input} onChange={ handleRut } />
          </label>
          <label forhtml="firt_name" className={styles.user__label}>
            <span className={styles['user__label-text']}>Nombres</span>
            <input type="test" id="firt_name" size="50" className={styles.user__input} onChange={ handleFirtName } />
          </label>
          <label forhtml="last_name" className={styles.user__label}>
            <span className={styles['user__label-text']}>Apellidos</span>
            <input type="text" id="last_name" size="50" className={styles.user__input} onChange={ handleLastName } />
          </label>
          <label forhtml="email" className={styles.user__label}>
            <span className={styles['user__label-text']}>Email</span>
            <input type="text" id="email" size="30"className={styles.user__input} onChange={ handleEmail } />
          </label>
          <label forhtml="company" className={styles.user__label}>
            <span className={styles['user__label-text']}>Empresa</span>
            <select name="company" id="company" className={styles.user__input} onChange={ handleCompany}>
              <option value="">Selecionar...</option>
              {companies.map((company) => <option key={company.id} value={company.id}>{company.name}</option>)}
            </select>
          </label>
          <label forhtml="profile" className={styles.user__label}>
            <span className={styles['user__label-text']}>Perfil</span>
            <select name="profile" id="profile" className={styles.user__input} onChange={ handleProfile}>
              <option value="">Selecionar...</option>
              {profiles.map((profile) => <option key={profile.id} value={profile.id}>{profile.name}</option>)}
            </select>
          </label>
          {error && <><small style={ { color: 'red' } }>{error}</small></>}
          <div className={styles['user__button']} onClick={ handleSave } disabled={ saving }>
            {saving ? 'Saving...' : 'Save'}
          </div>
        </div>
      </div>
    </>
  );
}

CreateUser.Auth = WithPrivateRoute

export async function getStaticProps() {
  try {
    const companies = await fetch(`${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/company`).then(companies => companies.json())
    const permissions = await fetch(`${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/permission`).then(permissions => permissions.json())
    let data = await Promise.all([companies, permissions]);
    return {
      props: {
        companies: data[0],
        profiles: data[1],
      },
    }
  } catch(e) {
    console.log(e.message)
    return {
      props: {},
    }
  }
}
