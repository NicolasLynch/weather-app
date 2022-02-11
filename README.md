# weather-app

Check the weather and climatological information of the city you want.

[Live version](https://nicolaslynch.github.io/weather-app/)

![](https://nicolaslynch.github.io/portfolio/assets/images/weather-desktop.jpg)




## Install dependencies:

- Remember to have React installed

- react-router-dom@5.3.0  
(It is necessary that this version be used. Because updates from version 6.0.0 onwards generate incompatibility)





## APIs:

- https://openweathermap.org/current
- https://openweathermap.org/forecast5




## Recommendations:

It is recommended to create an account on [official page](https://openweathermap.org/) page of these APIs to receive a "API key" to access these. 
Then change the value of the following constant to that of your "API key". This constant is located in the App.js file.

Original value:
> const apikey = 'e34c50149015d9cc83fa642bfdc582a1';


Recommended change:
> const apikey = (your API key);

Doing this is important because en the future I could delete my "API key"



## Important:


For the page to work, the last directory in the URL must end with /weather-app/

For example: 
> http://localhost:3000/weather-app/












