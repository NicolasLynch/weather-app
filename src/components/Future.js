import useDate from "../Hooks/useDate";

import DayInfo from "./DayInfo";

function Future(props) {
	

	// _____Cambiar la escala de temperatura:_____
	const changeToCelsius = () => {
		props.setTemperatureScale('C');
	}

	const changeToFahrenheit = () => {
		props.setTemperatureScale('F');
	}


	return (
		<div className="Future">
			<div className='future-grid'>
				<div className="temp-buttons">
					<div className="temp-button celsius" onClick={changeToCelsius}><span className="degree-sign">°</span>C</div>
					<div className="temp-button fahrenheit" onClick={changeToFahrenheit}><span className="degree-sign">°</span>F</div>
				</div>
				<DayInfo date={'Tomorrow'} maxTemp={props.cityInfo.futureDays.tomorrow.maxTemp} minTemp={props.cityInfo.futureDays.tomorrow.minTemp} icon={props.cityInfo.futureDays.tomorrow.iconID} weather={props.cityInfo.futureDays.tomorrow.weather} temperatureScale={props.temperatureScale} changeTemperature={props.changeTemperature}/>
				<DayInfo date={useDate(2)} maxTemp={props.cityInfo.futureDays.dayTwo.maxTemp} minTemp={props.cityInfo.futureDays.dayTwo.minTemp} icon={props.cityInfo.futureDays.dayTwo.iconID} weather={props.cityInfo.futureDays.dayTwo.weather} temperatureScale={props.temperatureScale} changeTemperature={props.changeTemperature}/>
				<DayInfo date={useDate(3)} maxTemp={props.cityInfo.futureDays.dayThree.maxTemp} minTemp={props.cityInfo.futureDays.dayThree.minTemp} icon={props.cityInfo.futureDays.dayThree.iconID} weather={props.cityInfo.futureDays.dayThree.weather} temperatureScale={props.temperatureScale} changeTemperature={props.changeTemperature}/>
				<DayInfo date={useDate(4)} maxTemp={props.cityInfo.futureDays.dayFour.maxTemp} minTemp={props.cityInfo.futureDays.dayFour.minTemp} icon={props.cityInfo.futureDays.dayFour.iconID} weather={props.cityInfo.futureDays.dayFour.weather} temperatureScale={props.temperatureScale} changeTemperature={props.changeTemperature}/>
				<DayInfo date={useDate(5)} maxTemp={props.cityInfo.futureDays.dayFive.maxTemp} minTemp={props.cityInfo.futureDays.dayFive.minTemp} icon={props.cityInfo.futureDays.dayFive.iconID} weather={props.cityInfo.futureDays.dayFive.weather} temperatureScale={props.temperatureScale} changeTemperature={props.changeTemperature}/>
			</div>
		</div>
	);
  }
  
export default Future;