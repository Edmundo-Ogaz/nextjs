import { useState } from 'react';
import { useRouter } from 'next/router';

import Menu, { SubMenu, Item as MenuItem } from 'rc-menu';
import 'rc-menu/assets/index.css';

//import styles from './menu.module.css';

export default function App( props ) {
	console.log('App')

  const router = useRouter();

  const [ isLoading, setIsLoading ] = useState()
  

  function handleClick(info) {
 
    switch (info.key) {
      case '1':
        router.push('/');
        setLoading(true)
        break;
      case '2-2':
        router.push('/test/ic/list');
        setLoading(true)
        break;
      case '3-3':
        router.push('/test/assign');
        setLoading(true)
        break;
      case '4-1':
        router.push('/user/create-user');
        setLoading(true)
        break;
      case '4-2':
        router.push('/postulant/create');
        setLoading(true)
        break;
      case '5-2':
        document.cookie = 'user' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        localStorage.clear('user')
        router.push('/login');
        setLoading(true)
        break;
      default:
        break;
    }
  }

  function onOpenChange(value) {
    // console.log('onOpenChange', value);
  }

  return (
    <>
      <Menu
        onClick={ (info) => props.handleMenu(info) }
        triggerSubMenuAction={ props.triggerSubMenuAction }
        onOpenChange={ onOpenChange }
        mode={ props.mode }
        motion={ props.openAnimation }
        defaultOpenKeys={ props.defaultOpenKeys }
      >
        <MenuItem key="1">Home</MenuItem>
        <SubMenu title={ <span className="submenu-title-wrapper">Resultados</span> } key="2">
          <MenuItem key="2-2">IC</MenuItem>
        </SubMenu>
        <SubMenu title={ <span className="submenu-title-wrapper">Pruebas</span> } key="3">
        <MenuItem key="3-1">IC</MenuItem>
        <MenuItem key="3-2">DISC</MenuItem>
        <MenuItem key="3-3">Asignar prueba</MenuItem>
        </SubMenu>
        <SubMenu title={ <span className="submenu-title-wrapper">Administración</span> } key="4">
          <MenuItem key="4-1">Crear Usuario</MenuItem>
          <MenuItem key="4-2">Crear Postulante</MenuItem>
        </SubMenu>
        <SubMenu title={ <span className="submenu-title-wrapper">Salir</span> } key="5">
          <MenuItem key="5-2">Salida del Sistema</MenuItem>
        </SubMenu>
      </Menu>
    </>
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