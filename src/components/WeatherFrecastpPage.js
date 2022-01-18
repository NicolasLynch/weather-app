import Menu from './Menu';
import Home from './Home';
import Future from './Future';
import Highlights from './Highlights';


const WeatherFrecastpPage = (props) => {
	return(
		<div className="WeatherFrecastPage" onLoad={props.autoGeolocation}>
			<Menu menuActive={props.menuActive} ChangeMenuActive={props.ChangeMenuActive} cityName={props.cityName} setCityName={props.setCityName} link={props.link} items={props.items} fetchingCity={props.fetchingCity} setLink={props.setLink} error={props.error}/>
			<Home ChangeMenuActive={props.ChangeMenuActive} cityInfo={props.cityInfo} getGeolocation={props.getGeolocation} temperatureScale={props.temperatureScale} changeTemperature={props.changeTemperature}/>
			<Future cityInfo={props.cityInfo} temperatureScale={props.temperatureScale} setTemperatureScale={props.setTemperatureScale} changeTemperature={props.changeTemperature}/>
			<Highlights cityInfo={props.cityInfo}/>	
		</div>
	)
}

export default WeatherFrecastpPage;