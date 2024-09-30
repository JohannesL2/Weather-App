const apiUrl = "https://api.openweathermap.org/data/2.5/";
const apiKey = "f4339e2bc9ab792cb818577605a90001";

const favoriteList = document.getElementById("favoriteList");
const favoriteBtn = document.getElementById("favoriteBtn"); // test
const unFavoriteBtn = document.getElementById("unFavoriteBtn");
const locationInput = document.getElementById("locationInput");
const locationBtn = document.getElementById("locationBtn");
const temperatureElement = document.getElementById("temperature");
const locationElement = document.getElementById("location");
const descriptionElement = document.getElementById("description");
const day1Element = document.getElementById("day1temp");
const day2Element = document.getElementById("day2temp");
const day3Element = document.getElementById("day3temp");
const day4Element = document.getElementById("day4temp");
const day5Element = document.getElementById("day5temp");

//localStorage.setItem("test", "Stockholm");
//localStorage.getItem("test");

locationBtn.addEventListener("click", () => {
  const location = locationInput.value;
  if (location) {
    fetchWeather(location);
  }
});

function fetchWeather(location) {
  const url = `${apiUrl}weather?q=${location}&appid=${apiKey}&units=metric`;
  const urlForecast = `${apiUrl}forecast?q=${location}&appid=${apiKey}&units=metric`;

  fetch(urlForecast)
    .then((response) => response.json())
    .then((data) => {
      day1Element.textContent = `${Math.round(data.list[0].main.temp)}°C`;
      day2Element.textContent = `${Math.round(data.list[1].main.temp)}°C`;
      day3Element.textContent = `${Math.round(data.list[2].main.temp)}°C`;
      day4Element.textContent = `${Math.round(data.list[3].main.temp)}°C`;
      day5Element.textContent = `${Math.round(data.list[4].main.temp)}°C`;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      locationElement.textContent = data.name;
      temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
      descriptionElement.textContent = data.weather[0].description;

      var iconcode = data.weather[0].icon;
      var iconUrl = "https://openweathermap.org/img/wn/" + iconcode + "@4x.png";
      document.querySelector(".weather-icon").src = iconUrl;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

const addFavorite = () => {
  const favoriteLocation = localStorage.getItem("favoriteLocation");
  if (favoriteLocation) {
    const li = document.createElement("li");
    li.textContent = favoriteLocation;
    favoriteList.innerHTML = "";
    favoriteList.appendChild(li);
    // Använder senaste child för att göra li till en länk
    favoriteList.lastChild.onclick = function () {
      fetchWeather(favoriteLocation);
    };
  }
};

favoriteBtn.addEventListener("click", () => {
  localStorage.setItem("favoriteLocation", locationElement.textContent);
  addFavorite();
});

addFavorite();

unFavoriteBtn.addEventListener("click", () => {
  localStorage.removeItem("favoriteLocation");
  favoriteList.innerHTML = "";
});

// TODO: add date + time, see:
function dateTime() {
  let dateText = new Date().toISOString().split("T")[0];
  let timeText = new Date().toLocaleTimeString();
  document.getElementById("time").innerHTML = timeText;
  document.getElementById("date").innerHTML = dateText;
}
setInterval(dateTime, 1000);

fetchWeather("Stockholm");
