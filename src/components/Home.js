import useDate from "../Hooks/useDate";
import useIconSelector from "../Hooks/useIconSelector";

import { Link } from 'react-router-dom';	

function Home(props) {

	return (
		<div className='Home'>
			<div className='buttons'>
				<div className='search-button' onClick={props.ChangeMenuActive}>Search for place</div>
				<Link to="/clima/">																										{/* Esto es parte del "react router". O sea, sirve para cambiar de link. Al hacer click aquí, me redirijo al link selecionado. Recordar que este cambia segun la ciudad tipeada ej: "http://localhost:3000/salto" */}
					<div className='gps-button' onClick={props.getGeolocation}>
						<img src={`./assets/icons/gps.svg`} alt='GPS icon' className='gps-icon'></img>								{/* ////// */}
					</div>
				</Link>
			</div>
			<div className='today-icon-space'>
				<img src='./assets/images/Cloud-background.png' alt='Background' className='background-image'></img>				{/* Imagen de fondo */}
				<img src={useIconSelector(props.cityInfo.iconId)} alt={props.cityInfo.weather} className='today-icon'></img>		{/* Icono del clima */}
			</div>
			<div className='today'>
				<p className='today-temperature'>{props.changeTemperature(props.cityInfo.temp)}<span className='temperature-unit'>{`°${props.temperatureScale}`}</span></p>												{/*///////////*/}
				<p className='today-text'>{props.cityInfo.weather}</p>
				<p className="today-date"><span>Today</span><span className='today-date-separation'>•</span><span>{useDate(0)}</span></p>
				<p className='location'><span className="material-icons location-icon">location_on</span>{props.cityInfo.city}</p>				{/* ////////////////////////// */}
			</div>
		</div>
	);
  }
  
  export default Home;