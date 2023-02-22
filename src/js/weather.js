import { weatherApp, weatherAppGeo } from '../js/api-weather';
import { createWeatherAppMarkup } from '../js/markup-function';

const newsList = document.getElementById('news-list');

async function renderWeatherAppGeo(pos) {
  const { latitude, longitude } = pos.coords;

  const data = await weatherAppGeo(latitude, longitude);
  addWeatherMarkup(data);
}

async function renderWeatherApp() {
  const data = await weatherApp();
  addWeatherMarkup(data);
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
    newsList.children[0].insertAdjacentHTML('afterend', weatherAppMarkup);
  } else if (window.innerWidth >= 1280) {
    newsList.children[1].insertAdjacentHTML('afterend', weatherAppMarkup);
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

export { renderWeatherAppGeo, renderWeatherApp };
