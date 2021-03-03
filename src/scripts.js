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

function ourTime(timestamp) {
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

function findCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let searchCity = document.querySelector("#search-city");
  cityElement.innerHTML = searchCity.value;

  searchCity(searchCity.value);
}

function searchCity(city) {
  let apiKey = "06e5d3dda0232566f39a1df37e2d5cdd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

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
  document.querySelector("#feels").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#barom").innerHTML = response.data.main.pressure.toFixed(2);
  document.querySelector("#humid").innerHTML = response.data.main.humidity;
  document.querySelector("#winds").innerHTML = Math.round(response.data.wind.speed);
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

function showFahrenheitTemperature(event) {
event.preventDefault();
  let temperatureElement = document.querySelector("#temp-now");
  let fahrenheitTemperature = ("celsiusTemperature" * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(showFahrenheitTemperature);
  
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
}

function showCelsiusTemperature(event) {
event.preventDefault(); 
  let = temperatureElement = document.querySelector("#temp-now");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

 celsius.classList.add("active");
 fahrenheit.classList.remove("active"); 
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", findCity);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheitTemperature);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsiusTemperature);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentPosition);

