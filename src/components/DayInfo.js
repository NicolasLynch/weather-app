import useIconSelector from "../Hooks/useIconSelector";

function DayInfo(props) {
	return (
		<div className="day-info">
			<p className='date'>{props.date}</p>
			<img src={useIconSelector(props.icon)} alt={`${props.weather}`} className='future-icon'></img>
			<div className='temperatures'>
				<p className='max-temperature'>{`${props.changeTemperature(props.maxTemp)}°${props.temperatureScale}`}</p>
				<p className='min-temperature'>{`${props.changeTemperature(props.minTemp)}°${props.temperatureScale}`}</p>
			</div>
		</div>
	);
  }
  
  export default DayInfo;