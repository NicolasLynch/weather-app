import React, {useState, useEffect} from 'react';

import City from "./City";

import { Link } from 'react-router-dom';	


function Menu(props) {

	// Mostar el menu:
	const [classShowmenu, setClassShowmenu] = useState('');																	// Esta constante puede guardar dos clases CSS. La primera es una animacion para que aparezca el menu y la segunda es para que desaparezca 
	useEffect(() => {
		if (props.menuActive === true) {
			setClassShowmenu('menu-right-displacement');

		} else if (props.menuActive === false) {																			// ¿Por que uso "else if" en vez de unicamente "else"? Esto se debe a que el props.menuActive guarda 3 valores: "", true y false. Al poner solamente "else" estaria poniendo en la misma bolsa a los valores "" y false. Esto se soluciona con el else if (props.menuActive === false) {}   // ¿Por que tres valores donde el primero es practicamente "nada" en vez de unicamente true y false?  Esto se debe a que utilizaremos estos valores en el archivo Menu.js,  dependiendo de que si el valor el true o false se creara una animacion que dezplaza el menu a la izquierda izquierda o la derecha. El problema viene cuando inicio la página web, al estar en uno de esos valores de forma predeterminada, se me ejecutara la animación     
			setClassShowmenu('menu-left-displacement');
		}
	}, [props.menuActive]);




	// Mostrar mensaje en caso de error/no encontar la ciudad:
	const [errormessage, setErrormessage] = useState()												
	useEffect(() => {
		setErrormessage({display: props.error ? 'initial' : 'none'});														// En caso de que el useState "error" sea igual a true, que la propiedad CSS "display" sea igual a "initial" (O sea, que aparezca el mensaje); caso contario, que la propiedad CSS "display" sea igual a "none" (O sea, que desaparezca el mensaje)  
	}, [props.error]);




	// Obtener el nombre de la ciudad:
	const getCityName = (e) => {
		props.setCityName(e.target.value);
	}



	// _____Rederizar la ciudad escrita y rederigirse al link de esa ciudad:_____									
	const form = document.getElementById('form');																			// Más abajo al <form> le pusimos un id llamado "form". Con esta constante accedemos a él 	// Esto es de los conceptos más basicos para acceder a elementos del archivo HTML cuando vimos el curso de JavaScript  
	const changeCity = () => {
		props.fetchingCity(props.cityName);														
		props.setLink(props.cityName);
		form.reset();																										// Esto borra el texto del del form. De esta menera el usario no tiene que borrar la ciudad anteriormente escrita para ingresar una nueva. Simplemente es para mayor comodidad del usuario 
	}



	// Simular hacer click en el boton "Search" cuando enviamos información desde el <input>			 					// Creamos este evento para poder acceder a una ciudad cuando apretamos el boton "enter" desde el <input>. Esto se debe a que como sabemos, esta aplicacioó habre una nueva página cuando queremos acceder a la información de una ciudad, esto se logra mediante el uso de la herramienta "react router". El problema es que para que funcione dicha herramienta devemos hacer click en el elemento <Link> (o en sus elementos hijos), esto se cumple con el boton "search" que es hijo de este elemento; el problema es que no podemos "activar" el elememto <Link> con un <input> de hijo y haciendo un submit (enviar/cargar informacíon), si o si debemos hacer click en este elementos o en sus hijos. Esta función soluciona este problema, ya que cuando apretemos la tecla "enter" dentro del <input> y por ende hagamos un submit, esta función "simulara" hacer click en el boton "search" y por ende en el elemento <Link>. O sea, estariamos haciendo click en el boton search con tan solo enviar información por el <input>  	// Esto no es muy elegante pero es la sulución que se me ocurrio y por el momento funciona de perlas
	const searchButton = document.getElementById('searchButton')															// Más abajo al boton search le pusimos un id llamado "searchButton". Con esta constante accedemos a él 	// Esto es de los conceptos más basicos para acceder a elementos del archivo HTML cuando vimos el curso de JavaScript  															
	const simulateClick = (e) => {																									
		e.preventDefault();																									// Pusimos este preventDefault() porque no queremos que se recargue automaticamente la página como hace naturamente cualquier <input> cuando envia información. Con esto evitamos problemas
		searchButton.click();																								// Simula que "estamos haciendo click" en el boton "search"
	}
	

	
	return (
		<div className={`Menu ${classShowmenu}`}>
			<div className='delete-icon-container'>																					{/* Esto solamente existe para poder alinear la cruz */}
				<span className="material-icons delete-icon" onClick={props.ChangeMenuActive}>clear</span>
			</div>
			<form id='form' className="form" onChange={getCityName} onSubmit={simulateClick}>
				<span className="material-icons search-icon">search</span>
				<input id="input" className='input' type="text" placeholder="search location"/>
				<Link to={`/${props.cityName}`} className='link' onClick={props.ChangeMenuActive}>									{/* Esto es parte del "react router". O sea, sirve para cambiar de link. Al hacer click aquí, me redirijo al link selecionado. Recordar que este cambia segun la ciudad tipeada ej: "http://localhost:3000/salto" */}
					<div id='searchButton' className='button' onClick={changeCity} >Search</div>
				</Link>
			</form>
			<p className='errorMessage' style={errormessage}>City not found</p>
			{props.items.map(e => <City cityName={e} key={`${props.items.indexOf(e)}`} fetchingCity={props.fetchingCity} setLink={props.setLink} ChangeMenuActive={props.ChangeMenuActive}/>)}	{/* Use como key la respectiva posición en el Array de cada elemento */}
		</div>
	);
}
  
  export default Menu;