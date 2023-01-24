import { useState } from 'react';
import { useRouter } from 'next/router';

import Cookie from '../../utils/Cookie.js';
import WithPrivateRoute from '../../components/WithPrivateRoute.js'

import Layout from "../../components/layout";

import styles from './user.module.css';

export default function CreateTestUser({companies, tests}) {
	console.log('CreateTestUser')

  const router = useRouter();

  const [ saving, setSaving ] = useState();
  const [ searching, setSearching ] = useState();

  const [ rut, setRut ] = useState();
  const [ firstName, setFirstName ] = useState();
  const [ lastName, setLastName ] = useState();
  const [ email, setEmail ] = useState();

  const [ testId, setTestId ] = useState();
  const [ postulantId, setPostulantId ] = useState();
  const [ company, setCompany ] = useState();
  const [ analyst, setAnalyst ] = useState();

  const [ message, setMessage ] = useState();
  const [ error, setError ] = useState();

  const [ analysts, setAnalysts ] = useState([]);

  const handleSearch = async () => {
    console.log('handleSearch')
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/postulants?rut=${rut}`,
        )
        .then(postulant => postulant.json())
        console.log('Searched', response)
        setMessage('Searched')
        setPostulantId(response.id)
        setFirstName(response.firstName)
        setLastName(response.lastName)
        setEmail(response.email)
    } catch(e) {
      console.error(e.message)
      setError(e.message)
    }
  }

  const handleSave = async () => {
    console.log('handleSave')

    const assigner = {
      companyId: company, 
      analystId: analyst, 
      createdById: Cookie.getUser().id
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/tests/${testId}/postulants/${postulantId}`,
        {
          method: 'POST',
          body: JSON.stringify(assigner),
          headers: {
            'Content-Type': 'application/json'
          },
        })
        .then(testAssigned => testAssigned.json())
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
  
  function handleTest(event) {
		setTestId(event.target.value)
	}

  async function handleCompany(event) {
    const companyId = event.target.value
		setCompany(event.target.value)
    try {
      const URL_BASE = process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API
      const PROFILE_ANALYST_ID = process.env.NEXT_PUBLIC_PROFILE_ANALYST_ID
      const USER_ANALYST = await fetch(
        `${URL_BASE}/users?companyId=${companyId}&profileId=${PROFILE_ANALYST_ID}`,
      )
      .then(users => users.json())
      console.log('Saved', USER_ANALYST)
      setAnalysts(USER_ANALYST)
    } catch(e) {
      console.error(e.message)
      setError(e.message)
    }
	}

  function handleAnalyst(event) {
		setAnalyst(event.target.value)
	}

  function createPostulant(event) {
    router.push('/postulant/create')
  }
     
  return (
    <>
      <Layout>
        <div className={styles.user}>
          <h2>
          Asignar Test a Postulante
          </h2>
          <div className={styles.user__form}>
            <label forhtml="rut" className={styles.user__label}>
              <span className={styles['user__label-text']}>Rut</span>
              <input type="text" id="rut" className={styles.user__input} onChange={ handleRut } />
            </label>
            <div className={styles['user__button']} onClick={ handleSearch } disabled={ searching }>
              {searching ? 'Searching...' : 'Search'}
            </div>
            <p>Nombre: {firstName} {lastName}</p>
            <p>Email: {email}</p>
            <label forhtml="test" className={styles.user__label}>
              <span className={styles['user__label-text']}>Test</span>
              <select name="test" id="test" className={styles.user__input} onChange={ handleTest}>
                <option value="">Selecionar...</option>
                {tests.map((test) => <option key={test.id} value={test.id}>{test.name}</option>)}
              </select>
            </label>
            <label forhtml="company" className={styles.user__label}>
              <span className={styles['user__label-text']}>Empresa</span>
              <select name="company" id="company" className={styles.user__input} onChange={ handleCompany}>
                <option value="">Selecionar...</option>
                {companies.map((company) => <option key={company.id} value={company.id}>{company.name}</option>)}
              </select>
            </label>
            <label forhtml="analyst" className={styles.user__label}>
              <span className={styles['user__label-text']}>Analista</span>
              <select name="analyst" id="analyst" className={styles.user__input} onChange={ handleAnalyst}>
                <option value="">Selecionar...</option>
                {analysts.map((analyst) => <option key={analyst.id} value={analyst.id}>{analyst.firstName} {analyst.lastName}</option>)}
              </select>
            </label>
            {message && <><small style={ { color: 'green' } }>{message}</small></>}
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

CreateTestUser.Auth = WithPrivateRoute

export async function getServerSideProps() {
  try {
    console.log('getServerSideProps')
    const companies = await fetch(`${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/companies`).then(companies => companies.json())
    const tests = await fetch(`${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/tests`).then(tests => tests.json())
    let data = await Promise.all([companies, tests]);
    return {
      props: {
        companies: data[0],
        tests: data[1]
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
