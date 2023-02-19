import axios from 'axios';

export default class SearchNews {
  constructor() {
    // this.queryPage = 1;
    this.searchQuery = '';
    this.category = '';
    this.dataFilter = '';
  }

  async searchNews() {
    const API_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
    const API_KEY = '8n5KUMyFUl7iOAB9Zwf8IWBubkkgaMEq';
    const response = await axios.get(
      `${API_URL}?q=${this.searchQuery}&api-key=${API_KEY}`
    );

    return response;
  }

  async searchNewsWithData() {
    const API_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
    const API_KEY = '8n5KUMyFUl7iOAB9Zwf8IWBubkkgaMEq';
    const response = await axios.get(
      `${API_URL}?q=${this.searchQuery}&api-key=${API_KEY}`
    );

    return response;
  }

  async categoryList() {
    const API_URL =
      'https://api.nytimes.com/svc//news/v3/content/section-list.json';
    const API_KEY = '8n5KUMyFUl7iOAB9Zwf8IWBubkkgaMEq';
    const response = await axios.get(`${API_URL}?api-key=${API_KEY}`);

    return response;
  }

  async categoryNews() {
    const API_URL = 'https://api.nytimes.com/svc/news/v3/content/all/';
    const API_KEY = '8n5KUMyFUl7iOAB9Zwf8IWBubkkgaMEq';
    const response = await axios.get(
      `${API_URL}${this.category}.json?api-key=${API_KEY}`
    );

    return response;
  }

  async categoryNewsWithData() {
    const API_URL = 'https://api.nytimes.com/svc/news/v3/content/all/';
    const API_KEY = '8n5KUMyFUl7iOAB9Zwf8IWBubkkgaMEq';
    const response = await axios.get(
      `${API_URL}${this.category}.json?api-key=${API_KEY}&${this.dataFilter}`
    );

    return response;
  }

  async mostPopularNews() {
    const API_URL = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json`;
    const API_KEY = '8n5KUMyFUl7iOAB9Zwf8IWBubkkgaMEq';
    const response = await axios.get(`${API_URL}?api-key=${API_KEY}`);

    return response;
  }
  // resetPage() {
  //   this.queryPage = 1;
  // }

  // incrementPage() {
  //   this.queryPage += 1;
  // }
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
