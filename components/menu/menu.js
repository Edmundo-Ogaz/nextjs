import React from 'react';
// import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/router';

import Menu, { SubMenu, Item as MenuItem } from 'rc-menu';
import 'rc-menu/assets/index.css';
//import './menu.css';
//import styles from './menu.module.css';

//import { removeSession } from '../../services/sessionStorage'

export default function App( props ) {
	console.log('App')

  const router = useRouter();
  
  //const navigate = useNavigate();

  function handleClick(info) {
    // console.log(`clicked ${info.key}`);
    // console.log(info);
    // console.log(info.item.props.children)
 
    switch (info.key) {
      case '1':
        router.push('/');
        break;
      case '2-2':
        router.push('/user/create-user');
        break;
      case '4-2':
        document.cookie = 'user' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        router.push('/login');
        break;
    
      default:
        break;
    }
  }

  function onOpenChange(value) {
    // console.log('onOpenChange', value);
  }

  return (
    <Menu
      onClick={ handleClick }
      triggerSubMenuAction={ props.triggerSubMenuAction }
      onOpenChange={ onOpenChange }
      mode={ props.mode }
      motion={ props.openAnimation }
      defaultOpenKeys={ props.defaultOpenKeys }
    >
      <MenuItem key="1">Home</MenuItem>
      <SubMenu
            title={
              <span className="submenu-title-wrapper">Crear usuario</span>
            }
            key="2"
            popupOffset={ [ 10, 15 ] }
        >
        <MenuItem key="2-2">Crear Usuario</MenuItem>
      </SubMenu>
      <SubMenu title={ <span className="submenu-title-wrapper">Pruebas</span> } key="3">
        <MenuItem key="3-1">Test</MenuItem>
      </SubMenu>
      <SubMenu title={ <span className="submenu-title-wrapper">Salir</span> } key="4">
        <MenuItem key="4-1">Cambiar Usuario</MenuItem>
        <MenuItem key="4-2">Salida del Sistema</MenuItem>
      </SubMenu>
    </Menu>
  );
}

// App.propTypes = {
// 	mode: PropTypes.string,
// 	openAnimation: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
// 	triggerSubMenuAction: PropTypes.string,
// 	defaultOpenKeys: PropTypes.arrayOf(PropTypes.string),
// 	updateChildrenAndOverflowedIndicator: PropTypes.bool,
// 	onLogOut: PropTypes.func
// };