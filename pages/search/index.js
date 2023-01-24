import { useState } from 'react';

import WithPrivateRoute from '../../components/WithPrivateRoute.js'

import Layout from "../../components/layout";
import LoadingSpinner from '../../components/LoadingSpinner/index.js';

import styles from './search.module.css';

export default function Search({companies, tests}) {
	console.log('Search')

  const [ isSearching, setIsSearching ] = useState(false);

  const [ rut, setRut ] = useState();
  const [ name, setName ] = useState();
  const [ email, setEmail ] = useState();

  const [ testId, setTestId ] = useState();
  const [ company, setCompany ] = useState();
  const [ analyst, setAnalyst ] = useState();

  const [ list, setList ] = useState([]);

  const [ message, setMessage ] = useState();
  const [ error, setError ] = useState();

  const [ analysts, setAnalysts ] = useState([]);

  const handleSearch = async () => {
    console.log('handleSearch')
    setIsSearching(true)
    try {
      let query = ''
      if (rut)
        query = `rut=${rut}`
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/tests/postulants/search?${query}`,
        )
        .then(postulant => postulant.json())
        console.log('Searched', response)
        setMessage('Searched')
        setList(response)
        setIsSearching(false)
    } catch(e) {
      console.error(e.message)
      setError(e.message)
      setIsSearching(false)
    }
  }

  function handleRut(event) {
		setRut(event.target.value)
	}

  function handleName(event) {
		setFirstName(event.target.value)
	}

  function handleEmail(event) {
		setEmail(event.target.value)
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
  
  function handleTest(event) {
		setTestId(event.target.value)
	}

  function handleAnalyst(event) {
		setAnalyst(event.target.value)
	}
     
  return (
    <>
      <Layout>
        <div className={styles.user}>
          <h2>
            Buscar Resultados
          </h2>
          <div className={styles.search__form}>
            <label forhtml="rut" className={styles.search__label}>
              <span className={styles['search__label-text']}>Rut </span>
              <input type="text" id="rut" className={styles.search__input} onChange={ handleRut } />
            </label>
            <label forhtml="name" className={styles.search__label}>
              <span className={styles['search__label-text']}>Nombre </span>
              <input type="text" id="name" size="50" className={styles.search__input} onChange={ handleName } />
            </label>
            <label forhtml="email" className={styles.search__label}>
              <span className={styles['search__label-text']}>Email </span>
              <input type="text" id="email" size="50" className={styles.search__input} onChange={ handleEmail } />
            </label>

            <label forhtml="company" className={styles.search__label}>
              <span className={styles['search__label-text']}>Empresa </span>
              <select name="company" id="company" className={styles.search__input} onChange={ handleCompany}>
                <option value="">Selecionar...</option>
                {companies.map((company) => <option key={company.id} value={company.id}>{company.name}</option>)}
              </select>
            </label>
            <label forhtml="analyst" className={styles.search__label}>
              <span className={styles['search__label-text']}>Analista </span>
              <select name="analyst" id="analyst" className={styles.search__input} onChange={ handleAnalyst}>
                <option value="">Selecionar...</option>
                {analysts.map((analyst) => <option key={analyst.id} value={analyst.id}>{analyst.firstName} {analyst.lastName}</option>)}
              </select>
            </label>
            <label forhtml="test" className={styles.search__label}>
              <span className={styles['search__label-text']}>Test </span>
              <select name="test" id="test" className={styles.search__input} onChange={ handleTest}>
                <option value="">Selecionar...</option>
                {tests.map((test) => <option key={test.id} value={test.id}>{test.name}</option>)}
              </select>
            </label>

            <button className={styles.search__button} onClick={ handleSearch } disabled={ isSearching }>
              {isSearching ? 'Searching...' : 'Search'}
            </button>
            
            {message && <><small style={ { color: 'green' } }>{message}</small></>}
            {error && <><small style={ { color: 'red' } }>{error}</small></>}
          </div>
          <div>
            <table className={styles.search__list}>
              <thead className={styles.search__list__header}>
                <tr>
                  <th>Candidato</th>
                  <th>Email</th>
                  <th>Empresa</th>
                  <th>Analista</th>
                  <th>Test</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {list.map(item => {
                return(
                  <tr key={item.id} className={styles['search__list__body-row']}>
                    <td>{item.postulant.firstName} {item.postulant.lastName}</td>
                    <td>{item.postulant.email}</td>
                    <td>{item.company.name}</td>
                    <td>{item.analyst.firstName} {item.analyst.lastName}</td>
                    <td>{item.test.name}</td>
                    <td>{item.state.name}</td>
                    <td>{item.date['@ts']}</td>
                  </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        {isSearching && <LoadingSpinner/>}
      </Layout>
    </>
  );
}

Search.Auth = WithPrivateRoute

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