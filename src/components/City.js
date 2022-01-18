import { Link } from 'react-router-dom';	


function City(props) {


	// Renderizar la ciudad seleccionada de la lista															// Esto busca la ciudad usando como parametro el texto del "textContent" que tiene la etiqueta <p> dentro del componente <City>. O sea, si ese textContent dice "Bariloche", busca la ciudad de bariloche  		
	const cityListRender = (e) => {																				// ¿Por que hay tantos if y else if? Yo necesito el "textContent" del elemento <p>, el problema viene en que si hago click en cualquier otra parte del componente <City>, vease la etiqueta padre <div> o en el icono de la flecha, me va sartar un error por el "textContent" de esos otros elementos es diferente. Con estos if me redirijo hacia la etiqueta <p>
		if (e.target.id === 'parentBox'){
			props.fetchingCity(e.target.children[0].textContent);
			props.setLink(e.target.children[0].textContent);	

		} else if (e.target.id === 'text') {
			props.fetchingCity(e.target.textContent);
			props.setLink(e.target.textContent);	

		} else if (e.target.id === 'arrow') {
			props.fetchingCity(e.target.parentElement.children[0].textContent);
			props.setLink(e.target.parentElement.children[0].textContent);	
		}
	}


	return (
		<Link to={`/${props.cityName}`} className='link' onClick={props.ChangeMenuActive}>						{/* Esto es parte del "react router". O sea, sirve para cambiar de link. Al hacer click aquí, me redirijo al link selecionado. Recordar que este cambia segun la ciudad tipeada ej: "http://localhost:3000/salto" */}
			<div id='parentBox' className="city" onClick={cityListRender}>
				<p id='text' className='city-name'>{props.cityName}</p>
				<span id='arrow' className="material-icons arrow-icon">keyboard_arrow_right</span>
			</div>
		</Link>	
	);
}

export default City;