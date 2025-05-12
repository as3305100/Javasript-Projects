document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "28bd4ddba028d9a7f81609aa77c3d2a9";
  const cityInput = document.getElementById("city-input");
  const addCityBtn = document.getElementById("add-city-btn");
  const cityList = document.getElementById("city-list");
  const weatherContainer = document.getElementById("weather-container");

  let cities = JSON.parse(localStorage.getItem("cities")) || [];

  renderCities()

  addCityBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city && !cities.includes(city)) {
      cities.push(city);
      saveCities();
      renderCities();
    }
    //  console.log(cities)
    cityInput.value = "";
  });

cityList.addEventListener('click', async (e) => {
    //  console.log(e.target.tagName)
    if(e.target.tagName === 'SPAN') {
        const cityDisplay = e.target.textContent;
        const weatherData = await fetchWeatherData(cityDisplay)
        displayWeather(weatherData);
    }
})

cityList.addEventListener('click',(e) => {
      if(e.target.tagName === 'BUTTON') {
            let removeIt = e.target.parentNode
            cities.splice(cities.indexOf(removeIt.textContent), 1)
            removeIt.remove()
            saveCities();
            weatherContainer.innerHTML = `
            <p>Select a city to view its weather information.</p>
            `
      }
})

  function renderCities() {
    cityList.innerHTML = "";
    cities.forEach((city) => { 
        const li = document.createElement('li')
        li.innerHTML = `
          <span>${city}</span>
          <button class="delete-btn">Delete</button>
        `
        cityList.appendChild(li)
    })    
  } 

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
       alert("City not found!")
       return
    }
    const data = await response.json();
    console.log(data)
    return data;
  }

  function displayWeather(data) {
    weatherContainer.innerHTML = `
    <h3>${data.name}</h3>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Weather: ${data.weather[0].description}</p>
    `;
  }

  function saveCities() {
    localStorage.setItem("cities", JSON.stringify(cities));
  }
});
