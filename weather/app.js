let valueSearch = document.getElementById("valueSearch");
let cityName = document.getElementById("city");
let temperature = document.getElementById("temperature");
let description = document.querySelector('.description');
let clouds = document.getElementById("clouds");
let humidity = document.getElementById("humidity");
let pressure = document.getElementById("pressure");
let form = document.querySelector('form');

const url = "https://api.openweathermap.org/data/2.5/weather?q=";
// 🔑 Replace with your actual OpenWeather API key
const apiKey = "&appid=YOUR_API_KEY&units=metric"; 

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let city = valueSearch.value.trim();
  if (city) {
    getWeather(city);
  }
});

// Fetch Weather Data
function getWeather(city) {
  fetch(url + city + apiKey)
    .then((res) => res.json())
    .then((data) => {
      if (data.cod === "404") {
        alert("City not found. Try again.");
        return;
      }
      console.log(data);

      // Update DOM
      cityName.querySelector("figcaption").innerText = data.name;
      temperature.innerHTML = Math.round(data.main.temp); // Already in Celsius (units=metric)
      description.innerText = data.weather[0].description;
      clouds.innerText = data.clouds.all;
      humidity.innerText = data.main.humidity;
      pressure.innerText = data.main.pressure;
    })
    .catch((err) => {
      console.error("Error fetching weather:", err);
      alert("Something went wrong. Please try again.");
    });
}
const toggleBtn = document.getElementById("themeToggle");
const body = document.body;

// Check saved theme
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
}

// Toggle on click
toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  // Save preference
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});
