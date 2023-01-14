import { useState } from 'react';
import WithPrivateRoute from '../../components/WithPrivateRoute.js'
import styles from './user.module.css';
import Menu from '../../components/menu/menu';

export default function CreateUser({companies, permissions}) {
	console.log('CreateUser')

  const [ saving, setSaving ] = useState();
  const [ rut, setRut ] = useState();
  const [ firtName, setFirtName ] = useState();
  const [ lastName, setLastName ] = useState();
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();
  const [ repassword, setRepassword ] = useState();
  const [ company, setCompany ] = useState();
  const [ position, setPosition ] = useState();
  const [ permission, setPermission ] = useState();

  const handleSave = () => {
    console.log()
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
            <input type="text" id="rut" className={styles.user__input} onChange={ setRut } />
          </label>
          <label forhtml="firt_name" className={styles.user__label}>
            <span className={styles['user__label-text']}>Nombres</span>
            <input type="test" id="firt_name" size="50" className={styles.user__input} onChange={ setFirtName } />
          </label>
          <label forhtml="last_name" className={styles.user__label}>
            <span className={styles['user__label-text']}>Apellidos</span>
            <input type="text" id="last_name" size="50" className={styles.user__input} onChange={ setLastName } />
          </label>
          <label forhtml="email" className={styles.user__label}>
            <span className={styles['user__label-text']}>Email</span>
            <input type="text" id="email" size="30"className={styles.user__input} onChange={ setEmail } />
          </label>
          <label forhtml="password" className={styles.user__label}>
            <span className={styles['user__label-text']}>Password</span>
            <input type="text" id="password" className={styles.user__input} onChange={ setPassword } />
          </label>
          <label forhtml="repassword" className={styles.user__label}>
            <span className={styles['user__label-text']}>Repita password</span>
            <input type="text" id="repassword" className={styles.user__input} onChange={ setRepassword } />
          </label>
          <label forhtml="company" className={styles.user__label}>
            <span className={styles['user__label-text']}>Empresa</span>
            <select name="company" id="company" className={styles.user__input} onSelect={ setCompany}>
              <option value="">Selecionar...</option>
              {companies.map((company) => <option key={company.id} value={company.id}>{company.name}</option>)}
            </select>
          </label>
          <label forhtml="position" className={styles.user__label}>
            <span className={styles['user__label-text']}>Cargo</span>
            <select name="position" id="position" className={styles.user__input} onSelect={ setPosition}>
              <option value="">Selecionar...</option>
              {permissions.map((permission) => <option key={permission.id} value={permission.id}>{permission.name}</option>)}
            </select>
          </label>
          {/* <label forhtml="permission" className={styles.user__label}>
            <span className={styles['user__label-text']}>Permisos</span>
            <input type="text" id="permission" className={styles.user__input} onChange={ setPermission } /> */}
            
            <label forhtml="permission1" className={styles.user__label}>
              <span className={styles['user__label-text']}>
                <input type="checkbox" id="permission1" name="permission1" value="Bike" />
                Home
              </span>
            </label>
            <label forhtml="permission2" className={styles.user__label}>
              <span className={styles['user__label-text']}>
                <input type="checkbox" id="permission2" name="permission2" value="Car" />
                Crear Usuario
              </span>
            </label>
            <label forhtml="permission3">
              <span className={styles['user__label-text']}>
                <input type="checkbox" id="permission3" name="permission3" value="Boat"/>
                Crear Test Usuario
              </span>
            </label>
          {/* </label> */}
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
        permissions: data[1],
      },
    }
  } catch(e) {
    console.log(e.message)
    return {
      props: {},
    }
  }
}
