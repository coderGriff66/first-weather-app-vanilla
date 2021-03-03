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
