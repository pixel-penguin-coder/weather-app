import '../dist/style.css';
import {
  getData,
  normalizeCityName,
  parseCityData,
  parseWeatherData,
} from './modules/component';

const API_KEY = 'ae822b8b93ff4f0191371313230307';
const apiOptions = {
  current: 'current.json',
  search: 'search.json',
};
const submitBtn = document.querySelector('#submit-btn');
const resultBox = document.querySelector('.result-box');
const inputBox = document.querySelector('#input-box');
const weatherContainer = document.querySelector('.weather-container');

submitBtn.addEventListener('click', getSuggestions);
inputBox.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;
  getSuggestions(e);
});

function getSuggestions(e) {
  e.preventDefault();
  const source = `https://api.weatherapi.com/v1/${apiOptions.search}?key=${API_KEY}&q=`;
  const userInput = normalizeCityName(inputBox.value);
  getData(`${source}${userInput}`, parseCityData).then((data) => {
    resultBox.innerHTML = `
      <ul data-list>
        ${data
          .map((city) => `<li data-item>${city.city}, ${city.country}</li>`)
          .join('')}
      </ul>
      `;
    const list = document.querySelector('[data-list]');
    list.addEventListener('click', retrieveData);
  });
  inputBox.value = '';
}

function retrieveData(e) {
  const list = e.target.parentNode;
  list.classList.toggle('hide');
  const source = `https://api.weatherapi.com/v1/${apiOptions.current}?key=${API_KEY}&q=`;
  const userInput = e.target.textContent.split(',').join(' ');
  getData(`${source}${userInput}`, parseWeatherData).then((data) => {
    weatherContainer.innerHTML = `
      <div class="weather-box">
        <h3 class="weather-box__city">${data.city}, ${data.country}</h3>
        <div class="weather-box__weather">${data.weather}</div>
        <h2 class="weather-box__temperature">${data.temperatureC}&deg;C</h2>
        <p class="weather-box__feels-like">Feels like: ${data.feelsLike}&deg;C</p>
        <p class="weather-box__local-time">Local time: ${data.localTime}</p>
        <p class="weather-box__humidity">Humidity: ${data.humidity}%</p>
        <div class="weather-box__icon"><img src="${data.icon}" alt="${data.weather}"></div>
      </div>
    `;
    weatherContainer.classList.add('show');
  });
}
