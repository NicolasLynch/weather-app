import React, { useState, useEffect } from 'react';

import './App.css';

import WeatherFrecastpPage from './components/WeatherFrecastpPage';

import {BrowserRouter as Router, Route} from 'react-router-dom';							// Esto es parte del "react router". O sea, sirve para cambiar de link 



function App() {
	
	// Obtener la lista de tareas del localStorage
	const getLocalItems = () => {															// Esta funcion se usara más adelante para pasarle la informacion al state items apenas se habra la página. Apenas se habre la página web, si hay información en localStorage, más precisamente en la key "lists", se guarda esa información en este mismo state "items". De no haber nada porque se borro todo o porque es la primera vez que el usuario entra, se coloca un [] como información (un array vacio). // RECORDAR que la información que almacena el localStorage es un array que contiene las tareas en forma de objetos.  Ej: [{},{},{}]  
		let list = localStorage.getItem('citysList');

		if (list) {
			return JSON.parse(localStorage.getItem('citysList'));

		}else { 
			return [];
		}
	}


	const [items, setItems] = useState(getLocalItems());									// Apenas se habre la página web, si hay información en localStorage, más precisamente en la key "lists", se guarda esa información en este mismo state "items". De no haber nada porque se borro todo o porque es la primera vez que el usuario entra, se coloca un [] como información (un array vacio). // RECORDAR que la información que almacena el localStorage es un array que contiene las tareas en forma de objetos.  Ej: [{},{},{}]     // Este state es una representacion del localSorage, y toda la información que ingrese aqui sera enviada al localStorage. Pero es nesesario hacer lo contrario y enviarle la informacion del localStorage a este state cuando apenas abrimos la pagina porque de esta manera podemos obtenemos una representacion de la información localStorage para trabajar con ella y luego reemplazar la información original del localStorage 


	// Agregar tareas al localStorage:
	useEffect(() => {																		// Con este Hook ejecutamos la linea de codigo de abajo cada vez que el valor del state "items" se haya modificado. Tambien ejecutamos estalinea cuandoapenas abrimos la pagina. Sin toda esta funcion/UseEfect, no se crearia el espacio en el localStorage, osea las funcion de arriba "getLocalItems" depende de este state para funcionar y para crear su respectiva key en el localStorage por primera vez cuando se habre la página    									
		localStorage.setItem('citysList', JSON.stringify(items));							// Le ingresamos al localStorage la información del state "items". Esto se se hace de forma automatica cuando abrimos la pagina o cuando hacemos algun tipo de modificación

		if (items.length > 5) {																// Si hay mas de 5 elementos en la lista, borra el ultimo
			setItems(items.slice(0, 5));
		}
		
	}, [items])	






	
	
	// _____Mensaje en caso de error/no encontrar la ciudad:_____
	const [error, setError] = useState(false);												// Si el valor del useState "error" es "false", significa que no hay ningun error y por ende se accedieron a los datos de las APIs correctamente. Caso contrario este valor cambiara a "true" y me sera mostrado en pantalla el mensaje de "Ciudad no encontrada" en rojo 






	
	// _____Desplegar el menu_____
	const [menuActive, setMenuActive] = useState('')										// Esta constante va a tener 3 valores: "", true y false   // ¿Por que tres valores donde el primero es practicamente "nada" en vez de unicamente true y false?  Esto se debe a que utilizaremos estos valores en el archivo Menu.js,  dependiendo de que si el valor el true o false se creara una animacion que dezplaza el menu a la izquierda izquierda o la derecha. El problema viene cuando inicio la página web, al estar en uno de esos valores de forma predeterminada, se me ejecutara la animación   

	const ChangeMenuActive = () => {														// Cambia el valor de la constante a true o false 
		if (menuActive === '' || menuActive === false){										// Si menuActive es igual a "" (valor por defecto cuando iniciamos la página) o es false, que su valor pase a true
			setMenuActive(true)

		} else if (menuActive === true){								
			setMenuActive(false)
		}
	}




	// _____Nombre de la ciudad tipeada:_____
	const [cityName, setCityName] = useState('');								

	


	// _____Informacion apta para renderizar:_____
	const [cityInfo, setCityInfo] = useState(
		{																					// Esta es una copia del objeto de abajo (el real con el que voy a trabajar). De no poner esta copia de objeto con sus respectivas keys, me saldria un error cuando quiera acceder a los objetos que representan los dias futuros. ¿Por que ocurre esto? No se, pero se soluciona de esta manera   
			city: "",
			iconId: "",
			temp: "",								
			weather: "",
			windSpeed: "",						
			windDeg: "",
			humidity: "",
			visibility: "", 				
			airPressure: "",										
			futureDays: {		
				tomorrow: {
					minTemp: "",
					maxTemp: "",
					iconID: '',
					weather: ""
				},
				dayTwo: {
					minTemp: "",										
					maxTemp: "",
					iconID: '',
					weather: ""
				},
				dayThree: {
					minTemp: "",
					maxTemp: "",
					iconID: '',
					weather: ""
				},
				dayFour: {
					minTemp: "",
					maxTemp: "",
					iconID: '',
					weather: ""
				},
				dayFive: {
					minTemp: "",
					maxTemp: "",
					iconID: "",
					weather: ""
				}
			}
		}
	)




	// _____Obtener la informacion de la api y con eso crear un objeto unicamente con la información que necesito_____
	const fetchingCity = (location) => {	
	
		const cityObjet = (today, future) => {												// Objeto donde voy a guardar la información que necesito entre toda la que me da la API:
			return (
				{
					city: today.name,
					iconId: today.weather[0].id,
					temp: today.main.temp,													// Convierte la temperatura de kelvin (valor por defecto) a celcius y a su vez le quita los decimales
					weather: today.weather[0].description,	
					windSpeed: Number((today.wind.speed * 2.23694).toFixed(1)),				// Convertimos el METRO/segundo (valor por defecto) a MILLA/hora. Y de paso con el toFixed() solamente dejamos un solo decimal despues de la coma    // Cuando hay un numero entero me queda al final con un ".0"   Ej: 25.0	con el Number() soluciono eso	
					windDeg: today.wind.deg,
					humidity: today.main.humidity,
					visibility: Number((today.visibility * 0.000621371).toFixed(1)), 		// Con el " * 0.000621371" covertimos los metros (valor por defecto) a millas. 
					airPressure: today.main.pressure,										// Esto esta en "hPa" (hectopascal) pero equivalente mb (millibar) (que es lo que necesito), ya que valen lo mismo debido a que su equivalencia es de 1 a 1
					futureDays: {		
						tomorrow: {
							minTemp: future[0].minTemp,										// Convierte la temperatura de kelvin (valor por defecto) a celcius y a su vez le quita los decimales	
							maxTemp: future[0].maxTemp,
							iconID: future[0].futureIconID,
							weather: future[0].futureWeather
						},
						dayTwo: {
							minTemp: future[1].minTemp,					
							maxTemp: future[1].maxTemp,
							iconID: future[1].futureIconID,
							weather: future[1].futureWeather
						},
						dayThree: {
							minTemp: future[2].minTemp,					
							maxTemp: future[2].maxTemp,
							iconID: future[2].futureIconID,
							weather: future[2].futureWeather
						},
						dayFour: {
							minTemp: future[3].minTemp,					
							maxTemp: future[3].maxTemp,
							iconID: future[3].futureIconID,
							weather: future[3].futureWeather
						},
						dayFive: {
							minTemp: future[4].minTemp,					
							maxTemp: future[4].maxTemp,
							iconID: future[4].futureIconID,
							weather: future[4].futureWeather
						}
					}
				}
			)
		}
	
	
		const futureDayInfo = (data, futureDays) => {																	// Esta funcion tiene 2 parametros. El primero es "data", representa la información que obtendremos de la API. El segundo parametro es "futureDays", en el pondremos un numero entero que representa la cantidad de diás a futuro al cual hacemos referencia, es decir, si queremos acceder a la información de mañanana tenemos que poner 1 ya que representa un dia al futuro. Si queremos acceder aa la informacion de pasado mañana, tenemos que poner 2   
			const today = new Date();																					// Dia actual. Osea, hoy 

			today.setDate(today.getDate() + futureDays);																// Dependiendo los numeros que agregue va a a ser los dia a futuro. Por ejemplo +1 es igual a mañana y +2 es igual a pasado mañana		
			const futureDay = today;
			
			const daySelected = data.list.filter(e => (new Date(e.dt_txt)).getDate() === futureDay.getDate());			// Esta API nos devuelve varios objetos de apaertir de hoy a 5 dias al futuro. El tema es que hay 8 predicciones por dia, y cada prediccion tiene su propia temperatura máxima y mánima. Con esta linea de codigo estamos filtrando unicamente los 8 objetos del dia que nos interesa, descartando los demas.   

			const maxTemp = Math.max(...(daySelected.map(e => e.main.temp_max)));										// De la linea de codigo anterior obtuvimos una lista de 8 ojetos del dia seleccionado. Cada objeto corresponde a una hora direrente. En esta linea de codigo obtenemos las temperaturas máximas de cada hora y luego la metemos a una lista, luego obtenemos la temperatura más alta dentro de esa lista de temperaturas máximas. Por logíca esa es la temperatura más alta del día
			const minTemp = Math.min(...(daySelected.map(e => e.main.temp_min)));										// La misma logica pero con la temperatura más baja
			
			const futureIconID = daySelected[0].weather[0].id;															// Este es el icono del clima del dia seleccionado. 	// Hay muchos objetos con distintas horas y por ende distintos iconos para el mismo día, pero elegi el primer icono que corresponde a la primera hora de ese dia. Esta es sumamente arbitrario

			const futureWeather = daySelected[0].weather[0].description;												// Esta es la descripcion del dia seleccionado. Ademas de decirnos el clima, lo utilizaremos como descripcion para las imagenes. Esto es mucha utilidad para las personas no videntes. 	// Hay muchos objetos con distintas horas y por ende distintas descripciones para el mismo día, pero elegi la primera descripcion que corresponde a la primera hora de ese dia. Esto es sumamente arbitrario

			return {																									// Nos retornara este objeto con la información que nos interesa del día seleccionado
				maxTemp: maxTemp,
				minTemp: minTemp,
				futureIconID: futureIconID,
				futureWeather: futureWeather
			}
		}



		// _____Obteniendo in formación de la API:_____
		const apikey = 'e34c50149015d9cc83fa642bfdc582a1';																// Esta key me la da la la página oficial de la API luego de logearme. Es obligatorio ingresarla en el URL de la API para que este funcione. Es probable que en un futuro la misma página me cambie este valor por otro
		let urlToday = "";																								// Esta url representa a la API que me va a brindar la información del dia de hoy
		let urlFuture= "";																								// Esta url representa a la API que me va a brindar la información de los proximos 5 días

		let latitude = '';
		let longitude = '';
		let city = '';

		if (Array.isArray(location) === true) {																			// Esto me permite saber si la información ingresada corresponde al nombre de una ciudad o son las coordenadas que se utilizaran en la geolocalización. Primero que nada hay que tener en cuenta que decidi que cuando el nombre de una ciudad esta sera un "string" Ej: Arrecifes. Y cuando se enviara las coordenadas, estas seran dos valores de un "Array" [longitud, latitud] Ej: [546546854, 6823153468].  // La función de este "if" es saber si la información enviada es un "Array" y por ende coordenadas. Caso contrario es un "String" con el nombre de la ciudad. De pendiendo cual sea el caso, se eligira un URL distinto propio para coordenadas (geolocatation) o nombres de ciudades  																
			latitude = location[0];
			longitude = location[1];
			urlToday = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;		
			urlFuture= `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
		} else {
			city = location;
			urlToday = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;				
			urlFuture= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`;				
		}

		

		const getData = async () => {																					

			const dataToday = await fetch(urlToday).then((response) => {													// Este es el fetching de la ciudad/coodenadas ingresada/s con la información del dia de hoy
				if (response.ok) {
				  	return response.json();
				} else {
				  	throw new Error('Something went wrong');
				}

			}).then((responseJson) => {
				setError(false);																									
				return  responseJson;
			}).catch((error) => {
				console.log(error);																							// En caso de error que me muestre el mensaje de error en la consola, luego que aparezca el cartel rojo que dicice que hay un error en el menu y por ultimo que me desplegue el menu para ver ese mensaje 														 
				setError(true);
				ChangeMenuActive()
			});


			const dataFutureDays = await fetch(urlFuture).then((response) => {												// Este es el fetching de la ciudad/coodenadas ingresada/s con la información de los proximos 5 dias
				if (response.ok) {
				  	return response.json();
				} else {
				  	throw new Error('Something went wrong');
				}

			}).then((responseJson) => {
				setError(false);

				const futureDayOne = futureDayInfo(responseJson, 1);														// Esto representa la información del día de mañana 						
				const futureDayTwo = futureDayInfo(responseJson, 2)	;														// Esto representa la información de pasado mañana 						
				const futureDayThree = futureDayInfo(responseJson, 3);
				const futureDayFour = futureDayInfo(responseJson, 4);
				const futureDayFive = futureDayInfo(responseJson, 5);

				return [futureDayOne, futureDayTwo, futureDayThree, futureDayFour, futureDayFive];	

			}).catch((error) => {
				console.log(error);
				setError(true);
				ChangeMenuActive()
			});

			setCityInfo(cityObjet(dataToday, dataFutureDays));			

			if (items.includes(dataToday.name) === false) {																// Agrega el nombre de la ciudad a la lista de ciudades del "Local Storage". Esta condicion sirve para crequear que no este la ciudad ya escrita en la lista, en caso de no estar esta ciudad en la lista, se es agregada. De esta forma evitamos repetir ciudades
				setItems([dataToday.name, ...items]);		
			}
		}
		getData();
	}


	

	// _____Geolocalización_____
	const getGeolocation = () => {

		const options = {															// Este objeto es el tercer parametro de "geolocation.getCurrentPosition()". Son las opciones que podriamos tener 
			enableHightAccuracy: true,												// En caso de que un dispositivo tenga más opciones de geolozalizacion (como un dispositivo movil que tiene GPS), esta opción nos permite utilizarlas.    // Por defecto es "false", por ese motivo lo pusimos en "true".    // En este caso, que estamos usando una PC de sobremesa, la precición nos dara "0" ya que no tenemos altimetro, ni GPS ni nada de eso 
			timeOut: 5000,															// Determina el tiempo que le establecemos para que nos devuelva la posición. En este caso son 5 segundos		
			maximunAge:0															// Es el tiempo que le permitios tener algo en "cache".	Es decir, al preguntarle la posicion y tenerla en cache, la va a utilizar o no.   // Como NO queremos que utilice la informacion del cache, sino la información real, le pondremos "0"     			
		}
	
		const getPosition = (position) => {											// Esta función es el primer parametro de "geolocation.getCurrentPosition()". Esta función sirve para obtener la posicion. Recibe un objeto con opciones que seria el tercer parametro de "geolocation.getCurrentPosition". Se podria decir que esta es la verdadera funcion del golocalization
			fetchingCity([position.coords.latitude, position.coords.longitude]);	// Estoy ejecutando la función fetchinchingCity() con la informacion de las coodenadas. Es nesesario poner estos valores en forma de array como se aclaro más arriba en la funcion fetchingCity()
		}
	
		const error = (error) => {													// Esta función es el segundo parametro de "geolocation.getCurrentPosition()". Nos devuelve un error en caso de haberlo  // Este error se presenta generalmente cuando el usuario no le permite a la página web acceder a su geolocalización
			console.log(error);														
		}
		
		const geolocation = () => {
			const geolocation = navigator.geolocation;								// En esta constante guardamos la "geolocalización"
			geolocation.getCurrentPosition(getPosition, error, options);			// Este metodo nos permite saber la geolocalización de nuestra PC de sobremesa. Este metodo admite 3 parametros. El primero es obligatorio, seria "la función que va a obtener la posición" (en este caso "getPosition"), es una "función""" que hay que crear a parte; El segundo parametro seria un "error", en el caso de que lo hubiera (en este caso lo llamamos "error"), es una "función" que hay que crear a parte; Y el tercer parametro que también es opcional, son "las opciones" que podemos poner (en este caso lo llamamos options), es un objeto que hay que crear a parte
		}
	
		geolocation();
	}



	// ____Link de la paginas a las cuales voy a rederigirme:_____
	const [link, setLink] = useState('ramdon');										// Cuando cambie de ciudad sere rendireccionado a otro link. Ej: "http://localhost:3000/pergamino". Esto es necesario para trabajar con el "react router"	 // Esto obtiene el nombre de la ciudad que el usuario escribio desde el <form> del menu		// Este useState "link" representa lo que va escrito en el link despues del / en la barra de navegacion		// Este "ramdon" es necesaria para evitar errores con el "react-router", esto se debe a que e el inico se debe renderizar unicamente la página principal "http://localhost:3000/" pero al no estar esta "ramdon" tambien a renderizar la pagina secundaria que es "http://localhost:3000//${cityName}" pero al no haber escrito nada, esta pagina igual a "http://localhost:3000/" o sea, igual a la primera, havciendo que se rendericen las dos al mismo tiempo un debajo de la otra. Con esta "a" la segunda pagina no se renderiza debido a que me queda "http://localhost:3000/a" y por ende no se renderiza     




	//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX								// Esto podria probocar algun error si lo paso a una página de hosting
	// _____Obtener la la ciudad segun el su domio web:_____  						// Esto es util para obtener la información de una ciudad cuando copie y pegue un dominio, ya que de lo contrario, no se renderiazara ninguna página Ej: "http://localhost:3000/salto" 
	useEffect(() => {
		if ((window.location.pathname.slice(1)).replace(/%20/g, ' ')){				// window.location representa el  dominio Ej: "http://localhost:3000/salto".	// window.location.pathname es la ultima parte de ese dominio (incluido el slash) ej: /salto		// .slice(1) me quita el primer diguito del "string", de esta manera quito el slash y me queda solamente el nombre de la ciudad			// .replace(/%20/g, ' ') reemplaza el "%20" por un " " (espacio basio), esto se debe a que los URL en vez de tener un espacio, usan el %20. Esto es necesario para cuando dominio tiene una ciudad cuyo nombre es de dos palabras por ejemplo "/buenos%20aires" la cual convertiremos en "buenos aires". De esta manera la API puede buscarla. Esa cosa rara del "/ /g" donde adentro esta el %20 sirve para reemplazar a todos los %20 que se encuentren, sin esto solamente reemplazaria al primero     		// ¿Cual es la función del if? Basicamente es preguntar si existe esa ciudad como palabra. En caso de ser true, se ejecuta lo de abajo. Esto es nesesario porque la página inicial su dominio es http://localhost:3000/, esto quiere decir que no hay existe una ciudad excrita, y si se ejecutara este esta funcion sin este if, esto me traeria errores  	
			fetchingCity((window.location.pathname.slice(1)).replace(/%20/g, ' '));
			setLink((window.location.pathname.slice(1)).replace(/%20/g, ' '));
		}
	}, [window.location.pathname]);

	




	// _____Escala de temperatura:_____
	const [temperatureScale, setTemperatureScale] = useState('C');				// Aquí puede haber 2 posibles valores. "Celsius" o "fahrenheit". Por defecto vamos a tener el valor de celsius 



	// _____Convertir la temperatura a otras escalas:_____
	const changeTemperature = (temperature) => {								// La temperatura que recibimos desde la API esta en "kelvin". Con esta funcion vamos a convertir dicha temperatura a "celsius" o a "fahrenheit"
		
		if (temperature && temperatureScale === 'C') {							// Convierte de kelvin (temmperatura original) a celsius. 	// ¿Que quiere decir "temperature && temperatureScale === 'C'"? 	Significa: "Si la temperatura EXISTE y el temperatureScale es igual a C, hacer lo siguiente:"  con la primera parte de esto evito que se haga cuanta si es que no recibi datos y de esta manera evito errores (de esta manera no se hace la cuenta de abajo cuando estamos esperando los datos de la API)
			return parseInt(temperature -273.15);

		} else if (temperature && temperatureScale === 'F') {					// Convierte de kelvin (temmperatura original) a fahrenheit
			return parseInt((temperature - 273.15) * 9/5 + 32);
		}
	}


	




	return (
		<div className="App">
			<Router>																		{/* Esto es parte del "react router". O sea, sirve para cambiar de link		// ¿Por que pongo dos rutas que muestran la misma página cuando esto se podria hacer con una sola? Basicamente esto me soluciona dos problemas. El primero es que cuando se renderizan nuevas imagenes, la pagina se recarga (así funcionan las descargas de links/imagenes) y esto me lleva al segundo error, el cual se va a activar la geolocalizacion automaticamente cuando se habra la página. Al tener una página principal, puedo hacer que solamente en esta se ejecute la geolocalizacion de forma automatica apenas habra la página (ya que solamente la página inicial tiene el props "autoGeolocation={getGeolocation}". y cuando seleccionemos una ciudad, se abrira una nueva página cuyo link tenda el nombre de la ciudad ej: "http://localhost:3000/salto" y se cargaran las imagenes de esta ciudad, ademas este segundo link no tiene la opcion de mostar la geolocalizacion de forma automatica devido a que no tiene el props autoGeolocation={getGeolocation} */}

				<Route exact path="/clima/" render={() => {										{/* Esto es parte del "react router". O sea, sirve para cambiar de link.  Esta ruta representa la la página inicial. O sea, "http://localhost:3000/" */}																					
					return(
						<div>
							<WeatherFrecastpPage autoGeolocation={getGeolocation} menuActive={menuActive} ChangeMenuActive={ChangeMenuActive} cityName={cityName} setCityName={setCityName} cityInfo={cityInfo}  getGeolocation={getGeolocation} link={link} items={items} fetchingCity={fetchingCity} setLink={setLink} error={error} temperatureScale={temperatureScale} setTemperatureScale={setTemperatureScale} changeTemperature={changeTemperature}/>
						</div>
					)}}>										
				</Route>

				<Route  path={`/clima/${link}`} render={() => {									{/* Lo mismo que lo anterior, pero en este caso la página de esta ruta representa depende la ciudad tipeada. Ejemplo: "http://localhost:3000/salto" */}
					return (
						<div>
							<WeatherFrecastpPage menuActive={menuActive} ChangeMenuActive={ChangeMenuActive} cityName={cityName} setCityName={setCityName} cityInfo={cityInfo}  getGeolocation={getGeolocation} link={link} items={items} fetchingCity={fetchingCity} setLink={setLink} error={error} temperatureScale={temperatureScale} setTemperatureScale={setTemperatureScale} changeTemperature={changeTemperature}/>										
						</div>
					)}}>
				</Route>
				

			</Router>


		</div>
	);
}

export default App;
