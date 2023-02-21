import axios from 'axios';
import { createWeatherAppMarkup } from '../js/markup-function';

const API_KEY = '330800086c869b55fadd072cf641d172';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';

const refs = {
  degree: document.querySelector('.weather__app--degree'),
  daysValue: document.querySelector('.weather__app--days-value'),
  city: document.querySelector('.weather__app--city'),
  img: document.querySelector('.weather__app--skyCons'),
  day: document.querySelector('.weather__app--day'),
  year: document.querySelector('.weather__app--year'),
};

const newsList = document.getElementById('news-list');

// console.log();
navigator.geolocation.getCurrentPosition(onSuccess, renderWeatherApp);

async function onSuccess(pos) {
  const { latitude, longitude } = pos.coords;

  const data = await weatherAppGeo(latitude, longitude);
  setTimeout(() => addWeatherMarkup(data), 450);
  //   addWeatherMarkup(data);
}

async function renderWeatherApp() {
  const data = await weatherApp();
  setTimeout(() => addWeatherMarkup(data), 450);
  //   addWeatherMarkup(data);
}

async function weatherApp() {
  const url = `${BASE_URL}q=Lviv&units=metric&appid=${API_KEY}`;
  const response = await axios.get(url);

  return response.data;
}

async function weatherAppGeo(lon, lat) {
  const url = `${BASE_URL}lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const response = await axios.get(url);

  return response.data;
}

function addWeatherMarkup(data) {
  const weatherAppObj = {
    weather: data.weather[0].main,
    temp: data.main.temp,
    icon: data.weather[0].icon,
    city: data.name,
  };

  const weatherAppMarkup = createWeatherAppMarkup(
    weatherAppObj,
    currentDay,
    allInfoDays
  );

  if (window.innerWidth < 768) {
    newsList.children[0].insertAdjacentHTML('beforebegin', weatherAppMarkup);
  } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
    newsList.children[1].insertAdjacentHTML('beforebegin', weatherAppMarkup);
  } else if (window.innerWidth >= 1280) {
    newsList.children[2].insertAdjacentHTML('beforebegin', weatherAppMarkup);
  }
}

function currentDay() {
  let today = new Date();
  let day = today.getDay();

  let dayList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return dayList[day];
}

function allInfoDays() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const monthList = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Now',
    'Dec',
  ];
  const fullDate = `${day} ${monthList[month]} ${year}`;
  return fullDate;
}
