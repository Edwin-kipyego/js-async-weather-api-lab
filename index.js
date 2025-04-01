const API_KEY = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"; // Replace with your actual OpenWeatherMap API key

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent the form from refreshing the page

  const cityInput = document.getElementById("city"); // Input field for city name
  const city = cityInput.value.trim();

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  // Fetch current weather and five-day forecast
  fetchCurrentWeather(city);
  fetchFiveDayForecast(city);
}

// Fetch current weather based on city
function fetchCurrentWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  console.log("Fetching weather data from URL:", url); // Debugging line

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch current weather data.");
      }
      return response.json();
    })
    .then(data => {
      console.log("Weather data received:", data); // Debugging line
      displayCurrentWeather(data);
    })
    .catch(error => {
      console.error("Error fetching current weather:", error);
      alert("Unable to fetch current weather. Please try again.");
    });
}

// Render current weather data to the DOM
function displayCurrentWeather(json) {
  document.getElementById("temp").textContent = json.main.temp + "°C";
  document.getElementById("low").textContent = json.main.temp_min + "°C";
  document.getElementById("high").textContent = json.main.temp_max + "°C";
  document.getElementById("humidity").textContent = json.main.humidity + "%";
  document.getElementById("cloudCover").textContent = json.clouds.all + "%";

  // Convert sunrise and sunset times to readable format
  const sunriseTime = new Date(json.sys.sunrise * 1000).toLocaleTimeString();
  const sunsetTime = new Date(json.sys.sunset * 1000).toLocaleTimeString();

  document.getElementById("sunrise").textContent = sunriseTime;
  document.getElementById("sunset").textContent = sunsetTime;
}

// Fetch five-day forecast data based on city
function fetchFiveDayForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
  console.log("Fetching five-day forecast from URL:", url); // Debugging line

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch five-day forecast data.");
      }
      return response.json();
    })
    .then(data => {
      console.log("Five-day forecast data received:", data); // Debugging line
      displayFiveDayForecast(data);
      createChart(data); // Optional: Create a chart for temperatures
    })
    .catch(error => {
      console.error("Error fetching five-day forecast:", error);
      alert("Unable to fetch five-day forecast. Please try again.");
    });
}

// Render five-day forecast data to the DOM
function displayFiveDayForecast(json) {
  const forecastContainer = document.getElementById("forecast");
  forecastContainer.innerHTML = ""; // Clear previous forecast

  json.list.forEach((forecast, index) => {
    if (index % 8 === 0) { // Show one forecast per day (every 8th item)
      const forecastDiv = document.createElement("div");
      forecastDiv.classList.add("forecast");

      const date = new Date(forecast.dt * 1000);
      const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;

      forecastDiv.innerHTML = `
        <p><strong>Date:</strong> ${dateStr}</p>
        <p><strong>Temp:</strong> ${forecast.main.temp}°C</p>
        <p><strong>Humidity:</strong> ${forecast.main.humidity}%</p>
      `;

      forecastContainer.appendChild(forecastDiv);
    }
  });
}

// Bonus: Render temperature chart using five-day forecast data and Chart.js
function createChart(json) {
  const labels = json.list
    .filter((_, index) => index % 8 === 0) // Show one forecast per day
    .map(forecast => {
      const date = new Date(forecast.dt * 1000);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    });

  const temps = json.list
    .filter((_, index) => index % 8 === 0)
    .map(forecast => forecast.main.temp);

  const ctx = document.getElementById("WeatherChart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Temperature (°C)",
          data: temps,
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "Date",
          },
        },
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: "Temperature (°C)",
          },
        },
      },
    },
  });
}

// Add event listener for form submission
document.addEventListener("DOMContentLoaded", function () {
  const cityForm = document.getElementById("cityForm");

  if (cityForm) {
    cityForm.addEventListener("submit", handleFormSubmit);
  } else {
    console.error("Form not found!");
  }
});






























































//const API_KEY = "YOUR API KEY"

//function handleFormSubmit(event) {
  //handle submit event
//}

//function fetchCurrentWeather(city) {
  //fetch current weather based on city
//}

//function displayCurrentWeather(json) {
  //render current weather data to the DOM using provided IDs and json from API
//}


//function fetchFiveDayForecast(city) {
  //fetch five day forecast data based on city
//}

//function displayFiveDayForecast(json) {
  //render five day forecast data to the DOM using provided IDs and json from API
//}

//function createChart(json) {
  //Bonus: render temperature chart using five day forecast data and ChartJS
//}

//document.addEventListener('DOMContentLoaded', function() {
  //add event listener here for form submission
//})
