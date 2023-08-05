const apiKey = '01b45bae3f5bd04d41fba78ae3b067e6'; // Replace this with your API key

const cityInput = document.getElementById('cityInput');
const addBtn = document.getElementById('addBtn');
const weatherCards = document.getElementById('weatherCards');


let cities = [];

function getWeatherData(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => displayWeatherCard(data))
    .catch(error => console.error('Error fetching data:', error));
}

function displayWeatherCard(data) {
  const weatherCard = document.createElement('div');
  weatherCard.classList.add('weather-card');

  const weatherType = data.weather[0].main.toLowerCase();

  const weatherDetails = document.createElement('div');
  weatherDetails.classList.add('weather-details');
  weatherDetails.innerHTML = `
  <p>${data.main.temp.toFixed(1)}°</p>
  <p>H: ${data.main.temp_max.toFixed(1)}° L: ${data.main.temp_min.toFixed(1)}°</p>
  <p></p>
  <p>${data.name}, ${data.sys.country}</p>
  `;
  weatherCard.appendChild(weatherDetails);

const weatherIconContainer = document.createElement('div'); // Container for icon and description
  weatherIconContainer.classList.add('weather-icon-container');

  const weatherIcon = document.createElement('img');
  weatherIcon.src = getWeatherIconPath(weatherType);
  weatherIcon.alt = weatherType;
  weatherIconContainer.appendChild(weatherIcon);

  const weatherTypeDescription = document.createElement('p');
  weatherTypeDescription.textContent = data.weather[0].description.toUpperCase();
  weatherIconContainer.appendChild(weatherTypeDescription);

  weatherCard.appendChild(weatherIconContainer);

  weatherCards.appendChild(weatherCard);
}

function getWeatherIconPath(weatherType) {
    if (weatherType === 'cloud') {
      return './photos/cloud.png';
    } else if (weatherType === 'haze') {
      return 'photos/haze.png';
    } else if (weatherType === 'rain'){
        return "photos/rain.png"
    } else {
      // Default image if weather type is not cloud or haze
      return 'photos/cloud.png';
    }
  }

function addCity() {
  const city = cityInput.value.trim();

  if (city === '' || cities.includes(city)) {
    return;
  }

  cities.push(city);
  cities.sort();

  getWeatherData(city);

  cityInput.value = '';
}

addBtn.addEventListener('click', addCity);
cityInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addCity();
  }
});
