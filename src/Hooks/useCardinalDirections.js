export const useCardinalDirections = (windDeg) => {													// Esta función me devuelve el "nombre del punto cardinal" de la direccion de donde sopla el viento segun la API. Para cada punto cardinal hay un margen de grados  Por ejempo: el Este esta en el grado 90°, lo que hacemos es tomar como validos los valores que que sean 11.25 unidades más chicos o más grandes que el 90. Osea, los numeros que van entre [78.75 y 101.25]. El numero 11.25 lo obtuve dividiendo 360 por todos los puntos cardinales y luego dividirlo por 2 para centrar el punto cardinal 												
	if ((348.75 <= windDeg && windDeg <= 360) || (0 <= windDeg && windDeg < 11.25)) {				// El norte es un poco más complejo que los demas porque hay tomar en cuenta los numeros que van desde el grado 438.75° hasta el 11.25°. Obviamente la computadora no tiene en cuenta que esto es un circulo y que 360° y 0° valen lo mismo, por ende pongo estas declaraciones extras
		return 'N';

	} else if (11.25 <= windDeg && windDeg < 33.75) {
		return 'NNE'; 

	} else if (33.75 <= windDeg && windDeg < 56.25) {
		return 'NE';

	} else if (56.25 <= windDeg && windDeg < 78.75) {
		return 'ENE';

	} else if (78.75 <= windDeg && windDeg < 101.25) {
		return 'E';

	} else if (101.25 <= windDeg && windDeg < 123.75) {
		return 'ESE';

	} else if (123.75 <= windDeg && windDeg < 146.25) {
		return 'SE';

	} else if (146.25 <= windDeg && windDeg < 168.75) {
		return 'SSE';

	} else if (168.75 <= windDeg && windDeg < 191.25) {
		return 'S';

	} else if (191.25 <= windDeg && windDeg < 213.75) {
		return 'SSW';

	} else if (213.75 <= windDeg && windDeg < 236.25) {
		return 'SW';

	} else if (236.25 <= windDeg && windDeg < 258.75) {
		return 'WSW';

	} else if (258.75 <= windDeg && windDeg < 281.25) {
		return 'W';

	} else if (281.25 <= windDeg && windDeg < 303.75) {
		return 'WNW';

	} else if (303.75 <= windDeg && windDeg < 326.25) {
		return 'NW';

	} else if (326.25 <= windDeg && windDeg < 348.75) {
		return 'NNW';	
	}	
}	