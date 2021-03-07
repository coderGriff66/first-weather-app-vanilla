function formatDate(timestamp) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let now = new Date(timestamp);
  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();

  let whatDateElement = document.querySelector("#what-date");
  whatDateElement.innerHTML = `${day}, ${month} ${date}, ${year}`;

  return `${day}, ${month}, ${date}, ${year}`;
}

let whatDateElement = document.querySelector("#what-date");
let currentDay = new Date();
whatDateElement.innerHTML = formatDate(currentDay);

function formatDay(timestamp) {
let now = new Date(timestamp);
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
return days[now.getDay()];
}

function ourTime(timestamp) {
  return formatHours(timestamp);
}

function formatHours(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
 return `${hours}:${minutes}`;
}

let whatTimeElement = document.querySelector("#what-time");
whatTimeElement.innerHTML = ourTime(currentDay)

function showTemp(response) {
  let city = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let h2 = document.querySelector("#temp-now");
  h2.innerHTML = temp;
  let h1 = document.querySelector("#city");
  h1.innerHTML = city;
  let h3 = document.querySelector("#sky-now");
  h3.innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  document.querySelector("#feels").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#barom").innerHTML = response.data.main.pressure.toFixed(2);
  document.querySelector("#humid").innerHTML = response.data.main.humidity;
  document.querySelector("#winds").innerHTML = Math.round(response.data.wind.speed);
  whatDateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "06e5d3dda0232566f39a1df37e2d5cdd";
  let endPoint = "https://api.openweathermap.org/data/2.5/weather?q";
  let apiUrl = `${endPoint}&lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentPosition);

function findCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#search-city");
  cityElement.innerHTML = cityInput.value;

  searchCity(cityInput.value);
}

function showWeatherPlanner(response) {
  let forecastElement = document.querySelector("#wx-planner");
  forecastElement.innerHTML = null;
  let forecast = null;
  
  for (let index = 0; index < 4; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-3">
      <div class="day-temps">
        <div class="card">
           <h5 class= "title2">${formatHours(forecast.dt * 1000)}</h5>
              <div class="card-body2">
                <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"/>
                  <p class=“temp-max” id="temp-max"><strong>${Math.round(forecast.main.temp_max)}&#176</strong></p>
              </div>
        </div>    
      </div>
    </div>
    `;
  } 
  showWeatherForecast(response);       
}


function showWeatherForecast(response) {
  let forecastElement = document.querySelector("#wx-forecast");
  forecastElement.innerHTML = null;
  forecast = null;
  
  for (let index = 5; index < 21; index+=4) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col">
          <div class="card">
            <h5 class="title3" id="day-one">${formatDay(forecast.dt * 1000)}</h5>
              <div class="card-body3">
                <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"/>
                 <div class=“temp-max” id="temp-max><strong>${Math.round(forecast.main.temp_max)}&#176</strong></p><p class= "temp-min" id="temp-min1"><em>${Math.round(forecast.main.temp_min)}&#176</em></p>
              </div>
    </div>
              
    `;
  } 
  formatDay(timestamp);       
}

function searchCity(city) {
  let apiKey = "06e5d3dda0232566f39a1df37e2d5cdd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherPlanner);
}

function showFahrenheitTemperature(event) {
event.preventDefault();
  let temperatureElement = document.querySelector("#temp-now");
  // document.querySelector("#feels").innerHTML = Math.round(response.data.main.feels_like);
  // document.querySelector("#temp-max").innerHTML = Math.round(forecast.main.temp_max);
  // document.querySelector("#temp-max1").innerHTML = Math.round(forecast.main.temp_max1);
  // document.querySelector("#temp-min1").innerHTML = Math.round(forecast.main.temp_min1);

  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature); 
}

function showCelsiusTemperature(event) {
event.preventDefault(); 
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let = temperatureElement = document.querySelector("#temp-now");
  // document.querySelector("#feels").innerHTML = Math.round(response.data.main.feels_like);
  // document.querySelector("#temp-max").innerHTML = Math.round(forecast.main.temp_max);
  // document.querySelector("#temp-max1").innerHTML = Math.round(forecast.main.temp_max1);
  // document.querySelector("#temp-min1").innerHTML = Math.round(forecast.main.temp_min1);
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

}

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", findCity);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheitTemperature);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsiusTemperature);

searchCity("Detroit");

