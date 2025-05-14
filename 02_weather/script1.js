// first dom has loaded then we grab the input and other things 
// this is the standard way 
document.addEventListener('DOMContentLoaded', () => {

const cityInput = document.getElementById("city-input");
const getWeatherBtn = document.getElementById("get-weather-btn");
const weatherInfo = document.getElementById("weather-info");
const cityNameDisplay = document.getElementById("city-name");
const temperatureDisplay = document.getElementById("temperature");
const descriptionDisplay = document.getElementById("description");
const errorMessage = document.getElementById("error-message");

const API_KEY = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"

getWeatherBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if(!city) return
    // it may throw an error
    // server/database is always in another continent

    try {
      const weatherData = await fetchWeatherData(city)      
      displayWeatherData(weatherData)
    } catch (error) {
      showError()
    }
    

})

async function fetchWeatherData(city) {
    // get the data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url) // await is used till the promise full fill then get the response .then also used in that case
    // console.log(typeof response)
    // console.log("Response :", response)

    if(!(response.ok)) {
        throw new Error('Failed to fetch weather data')
    }
    const data = await response.json()
    return data
}

function displayWeatherData(data) {
    // display the data
    //  console.log(data)
    const {name, main, weather} = data
    cityNameDisplay.textContent = name
    temperatureDisplay.textContent = `Temperature: ${main.temp}`
    descriptionDisplay.textContent = `Description: ${weather[0].description}`

    // unlock the display
    weatherInfo.classList.remove('hidden')
    errorMessage.classList.add('hidden')
    
    
}

 function showError() {   
    weatherInfo.classList.add('hidden');
    errorMessage.classList.remove('hidden');
 }


})

/* 
 note 1 : remeber when you making a request to the server or api request or databasecall 
 server may through the error.
 note 2 : database is always in another continent
 so, its not a immediate response
 note 3 : function should be aysnchronos when we using await

*/
