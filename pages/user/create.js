import { useState } from 'react';
import WithPrivateRoute from '../../components/WithPrivateRoute.js'
import styles from './user.module.css';
import Layout from '../../components/layout';

export default function CreateUser({companies, profiles}) {
	console.log('CreateUser')

  const [ saving, setSaving ] = useState();
  
  const [ rut, setRut ] = useState();
  const [ firstName, setFirstName ] = useState();
  const [ lastName, setLastName ] = useState();
  const [ email, setEmail ] = useState();
  const [ company, setCompany ] = useState();
  const [ profile, setProfile ] = useState();

  const handleSave = async () => {
    console.log('handleSave')
    try {
      setSaving(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/users`,
        {
          method: 'POST',
          body: JSON.stringify({rut, firstName, lastName, email, companyId: company, profileId: profile}),
          headers: {
            'Content-Type': 'application/json'
          },
        })
        .then(user => user.json())
        console.log('Saved', response)
        toast.success('Saved');
    } catch(e) {
      toast.error(e.message);
    } finally {
      setSaving(false)
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

  function handleCompany(event) {
		setCompany(event.target.value)
	}

  function handleProfile(event) {
		setProfile(event.target.value)
	}
     
  return (
    <>
      <Layout>
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
            <div className={styles['user__button']} onClick={ handleSave } disabled={ saving }>
              {saving ? 'Saving...' : 'Save'}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

CreateUser.Auth = WithPrivateRoute

export async function getServerSideProps() {
  try {
    console.log('getServerSideProps')
    
    const companies = await fetch(`${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/companies`).then(companies => companies.json())
    const profiles = await fetch(`${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/profiles`).then(profiles => profiles.json())
    let data = await Promise.all([companies, profiles]);
    return {
      props: {
        companies: data[0],
        profiles: data[1],
      },
    }
  } catch(e) {
    console.log(e.message)
    return {
      redirect: {
        permanent: false,
        destination: "/error",
      },
      props:{},
    };
  }
}
