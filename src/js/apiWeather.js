import axios from 'axios';
export default class BannerWeather {
  constructor() {
    this.location = '';
  }
  async searchNews() {
    const API_ID = '296e6e46c560816b8e578018dec48817';
    const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
    const response = await axios.get(
      `${API_URL}?q=${this.location}&units=metric&appid=${API_ID}`
    );

    return response;
  }
}
