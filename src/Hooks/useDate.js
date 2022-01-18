/* 
_____Obtener la fecha actual o futura:_____ 																
Ante cualquier duda, investigar el constructor "new Date()" y sus respectivos metodos ".getDay()", ".getDate", "getMonth" y "setDate" */

const useDate = (addDays) => {																				// El para metro "addDay" corresponde a la cantidad de días que quiero sumarle a la fecha actual. Por ejemplo, si hoy es "25 de agosto", al tener un addDays = 2, me daria como resultado "27 de agosto". De no poner 0, me devuelve la fecha actual  																		
	const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const monts = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	
	const date = new Date();																				// Fecha actual
	
	date.setDate(date.getDate() + addDays);																	// Esto suma una X cantidad de días a mi fecha actual. Por ejemplo, si hoy es "25 de agosto", al tener un addDays = 2, me daria como resultado "27 de agosto". De no poner 0, me devuelve la fecha actual  																			
	
	const today = `${days[date.getDay()]}, ${date.getDate()} ${monts[date.getMonth()]}`;					// Esto me devuelve la fecha de la forma escrita que yo quiero 
	
	return today;
}

export default useDate;