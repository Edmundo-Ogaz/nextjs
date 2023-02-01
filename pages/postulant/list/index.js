import { useState } from 'react';

import Link from 'next/link'
import Image from 'next/image'

import { toast } from 'react-toastify';

import WithPrivateRoute from '../../../components/WithPrivateRoute.js'
import Layout from "../../../components/layout";
import LoadingSpinner from '../../../components/LoadingSpinner/index.js';

import styles from './list.module.css';

export default function List() {
	console.log('List')

  const [ isSearching, setIsSearching ] = useState(false);

  const [ rut, setRut ] = useState();
  const [ name, setName ] = useState();
  const [ age, setAge ] = useState();
  const [ sexo, setSexo ] = useState();
  const [ email, setEmail ] = useState();

  const [ postulants, setPostulants ] = useState([]);

  const handleSearch = async () => {
    console.log('handleSearch')
    setIsSearching(true)
    try {
      let query = ''
      if (rut)
        query = `rut=${rut}`

      if (name)
        query = `name=${name}`
      
      if (email)
        query = `email=${email}`
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NETLIFY_SERVERLESS_API}/postulants?${query}`,
        )
      const json = await response.json();
      if (response?.ok === false) {
        throw new Error(json?.error)
      }
      setPostulants(json)
    } catch(e) {
      toast.error(e.message);
    } finally {
      setIsSearching(false)
    }
  }

  function handleRut(event) {
		setRut(event.target.value)
	}

  function handleName(event) {
		setName(event.target.value)
	}

  function handleEmail(event) {
		setEmail(event.target.value)
	}

  return (
    <>
      <Layout>
        <div>
          <h2>Postulantes</h2>
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
            <button id="search" className={styles.search__button} onClick={ handleSearch } disabled={ isSearching }>
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>
          <table className={styles.search__list}>
            <thead className={styles.search__list__header}>
              <tr>
                  <th>RUT</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Edad</th>
                  <th>Sexo</th>
                  <th>Actualizado</th>
                  <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {postulants.map((postulant) => {
                return (<tr key={postulant.id} className={styles['search__list__body-row']}>
                    <td>{ postulant.rut }</td>
                    <td>{ postulant.firstName } { postulant.lastName }</td>
                    <td>{ postulant.email }</td>
                    <td>{ postulant.age }</td>
                    <td>{ postulant.sexo }</td>
                    <td>{ postulant.createdAt['@ts'] }</td>
                    <td>
                      <Link
                        href={{
                          pathname: `/postulant/edit/${postulant.id}`,
                        }}
                      >
                        <Image src="/images/edit_icon.svg" alt="edit" width="24" height="24" />
                      </Link>
                    </td>
                </tr>)
              })}
            </tbody>
          </table>
        </div>
        {isSearching && <LoadingSpinner/>}
      </Layout>
    </>
  );
}

List.Auth = WithPrivateRoute