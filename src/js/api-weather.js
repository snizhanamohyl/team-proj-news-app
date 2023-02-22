import axios from 'axios';

const API_KEY = '330800086c869b55fadd072cf641d172';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';

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

export { weatherApp, weatherAppGeo };
