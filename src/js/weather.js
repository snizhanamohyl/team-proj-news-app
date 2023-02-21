import { weatherApp, weatherAppGeo } from '../js/api-weather';
import { createWeatherAppMarkup } from '../js/markup-function';

const refs = {
  degree: document.querySelector('.weather__app--degree'),
  daysValue: document.querySelector('.weather__app--days-value'),
  city: document.querySelector('.weather__app--city'),
  img: document.querySelector('.weather__app--skyCons'),
  day: document.querySelector('.weather__app--day'),
  year: document.querySelector('.weather__app--year'),
};

const newsList = document.getElementById('news-list');

navigator.geolocation.getCurrentPosition(onSuccess, renderWeatherApp);

async function onSuccess(pos) {
  const { latitude, longitude } = pos.coords;

  const data = await weatherAppGeo(latitude, longitude);
  setTimeout(() => addWeatherMarkup(data), 500);
}

async function renderWeatherApp() {
  const data = await weatherApp();
  setTimeout(() => addWeatherMarkup(data), 500);
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
