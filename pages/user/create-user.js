import { useState } from 'react';
import WithPrivateRoute from '../../components/WithPrivateRoute.js'
import styles from './user.module.css';

export default function CreateUser() {
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
    <div className={styles.user}>
      <div className={styles.user__title}>
        Crear Usuario
      </div>
      <label forhtml="rut" className={styles.user__label}>
        <span className={styles['user__label-text']}>Rut</span>
        <input type="text" id="rut" className={styles.user__input} onChange={ setRut } />
      </label>
      <label forhtml="firt_name" className={styles.user__label}>
        <span className={styles['user__label-text']}>Nombres</span>
        <input type="test" id="firt_name" className={styles.user__input} onChange={ setFirtName } />
      </label>
      <label forhtml="last_name" className={styles.user__label}>
        <span className={styles['user__label-text']}>Apellidos</span>
        <input type="text" id="last_name" className={styles.user__input} onChange={ setLastName } />
      </label>
      <label forhtml="email" className={styles.user__label}>
        <span className={styles['user__label-text']}>Email</span>
        <input type="text" id="email" className={styles.user__input} onChange={ setEmail } />
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
        <input type="text" id="company" className={styles.user__input} onChange={ setCompany } />
      </label>
      <label forhtml="position" className={styles.user__label}>
        <span className={styles['user__label-text']}>Cargo</span>
        <input type="text" id="position" className={styles.user__input} onChange={ setPosition } />
      </label>
      <label forhtml="permission" className={styles.user__label}>
        <span className={styles['user__label-text']}>Permisos</span>
        <input type="text" id="permission" className={styles.user__input} onChange={ setPermission } />
      </label>
      <div className={styles['user__button']} onClick={ handleSave } disabled={ saving }>
        {saving ? 'Saving...' : 'Save'}
      </div>
    </div>
    );
}

CreateUser.Auth = WithPrivateRoute
