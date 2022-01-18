import { useCardinalDirections } from "../Hooks/useCardinalDirections";

function Highlights(props) {


	// Direccion del viento:																			// Esto rota la flecha que muestra la direcion del viento segun los grados de la direccion del viento que me brinde la API 
	const styleWindDirectionCircle = {
		transform: `rotate(${props.cityInfo.windDeg}deg)`
	}
	

	// Puntos cardinales de la direccion del viento: 
	const windCardinaldDirection = useCardinalDirections(props.cityInfo.windDeg);						// Recordar que estamos usando un Hook personalizado / custom Hook


	// Barra de porcentaje de humedad:																	// Esto hace que la barra amarilla que muestra el procentaje de humedad tenga un tamaño equivalente al porcentaje de humedad quye me brinda la API
	const styleProgressBarValue = {
		width: `${props.cityInfo.humidity}%`
	}


	return (
		<div className="Highlights">
			<div className='highlights-grid'>
				<p className='highlights-text'>Today's Highlights</p>
				<div className='wind-status-box'>
					<p className='wind-status-text'>Wind status</p>
					<div className='wind-speed'>{props.cityInfo.windSpeed}
						<span className='wind-speed-unity'>mph</span>
					</div>
					<div className='wind-direction'>
						<div className='wind-direction-circle' style={styleWindDirectionCircle}>
							<img src={`./assets/icons/near_me.svg`} alt='wind direction' className='wind-icon'></img>
						</div>
						<div className='wind-direction-text'>{windCardinaldDirection}</div>	
					</div>
				</div>
				<div className='humidity-box'>
					<p className='humidity-box-text'>Humidity</p>
					<div className='humedity-percent'>{props.cityInfo.humidity}
						<span className='percent-symbol'>%</span>
					</div>
					<div className='humidity-bar'>
						<div className='percent-indicator'>
							<div>0</div>
							<div className='percent-indicator-50'>50</div>
							<div>100</div>
						</div>
						<div className='progress-bar'>
							<div className='progress-bar-value' style={styleProgressBarValue}></div>			
						</div>
						<div className='bar-percent-symbol'>%</div>
					</div>
				</div>
				<div className='visibility-box'>
					<p className='visibility-text'>Visibility</p>
					<div className='visibility-distance'>{props.cityInfo.visibility}
						<span className='unit-distance'>miles</span>
					</div>
				</div>
				<div className='air-presure-box'>
					<p className='air-presure-text'>Air Pressure</p>
					<div className='air-presure-number'>{props.cityInfo.airPressure}
						<span className='air-presure-unity'>mb</span>
					</div>
				</div>
			</div>
		</div>
	);
  }
  
  export default Highlights;