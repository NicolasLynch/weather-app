
/* La API me devuelve un ID que representa un icono del clima (soleado, nublado, lluvia, etc). Dependiendo el numero que me devuelva
   es el icono que voy a usar	*/   

const useIconSelector = (iconId) => {
	if (iconId >= 200 && iconId <= 299) {
		return './assets/icons/Thunderstorm.png'; 

	} else if (iconId >= 300 && iconId <= 399) {
		return './assets/icons/HeavyRain.png';	
		
	} else if (iconId >= 500 && iconId <= 504) {
		return './assets/icons/Shower.png';

	} else if (iconId === 511) {
		return './assets/icons/Sleet.png';	
		
	} else if (iconId >= 520 && iconId <= 599) {
		return './assets/icons/HeavyRain.png';
		
	}  else if (iconId >= 600 && iconId <= 699) {
		return './assets/icons/Snow.png';
		
	} else if (iconId >= 700 && iconId <= 799) {
		return './assets/icons/HeavyCloud.png';	
		
	} else if (iconId === 800) {
		return './assets/icons/Clear.png';
		
	} else if (iconId === 801 || iconId === 802) {
		return './assets/icons/LightCloud.png';
		
	} else if (iconId === 803 || iconId === 804) {
		return './assets/icons/HeavyCloud.png';	

	} else { 
		return './assets/icons/LightCloud.png';								// Este es un comodin. Si por alguna casualidad la API larga numeros nuevos y no estoy enterado para hacer el cambio, que me muestre un dia nublado 		
	}
}

export default useIconSelector;