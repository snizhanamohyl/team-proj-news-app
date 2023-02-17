import axios from 'axios';
// 1) список категорій -
//https://api.nytimes.com/svc//news/v3/content/section-list.json?api-key=eQ8t8FWqeAGnKDTtIFrHmgZCflFrUTcV
// 2) список новин по категоріям
//https://api.nytimes.com/svc/news/v3/content/{source}/{section}.json
//    https://api.nytimes.com/svc/news/v3/content/all/business.json?api-key=
//    https://api.nytimes.com/svc/news/v3/content/all/crosswords%20%26%20games.json?api-key=
//    const encoded = encodeURIComponent('crosswords & games'); //crosswords%20&%20games
// 3) список новин за пошуковим значенням
//https://api.nytimes.com/svc/search/v2/articlesearch.json?q=ukraine&api-key=eQ8t8FWqeAGnKDTtIFrHmgZCflFrUTcV
// 4) список популярних новин https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=
export default class SearchNews {
  constructor() {
    this.queryPage = 1;
    this.searchQuery = '';
    this.category = '';
  }

  async searchNews() {
    const API_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
    const API_KEY = '8n5KUMyFUl7iOAB9Zwf8IWBubkkgaMEq';
    const response = await axios.get(
      `${API_URL}?q=${this.searchQuery}&api-key=${API_KEY}&page=${this.queryPage}`
    );
    // then(data => {
    this.incrementPage();
    return response;
  }

  async categoryList() {
    const API_URL =
      'https://api.nytimes.com/svc//news/v3/content/section-list.json';
    const API_KEY = '8n5KUMyFUl7iOAB9Zwf8IWBubkkgaMEq';
    const response = await axios.get(`${API_URL}?api-key=${API_KEY}`);
    // then(data => {
    this.incrementPage();
    return response;
  }

  async categoryNews() {
    const API_URL = 'https://api.nytimes.com/svc/news/v3/content/all/';
    const API_KEY = '8n5KUMyFUl7iOAB9Zwf8IWBubkkgaMEq';
    const response = await axios.get(
      `${API_URL}${this.category}.json?api-key=${API_KEY}`
    );
    // then(data => {
    this.incrementPage();
    return response;
  }

  async mostPopularNews() {
    const API_URL = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json`;
    const API_KEY = '8n5KUMyFUl7iOAB9Zwf8IWBubkkgaMEq';
    const response = await axios.get(
      `${API_URL}?api-key=${API_KEY}&page=${this.queryPage}`
    );
    // then(data => {
    this.incrementPage();
    return response;
  }
  //   resetPage() {
  //     this.queryPage = 1;
  //   }

  //   incrementPage() {
  //     this.queryPage += 1;
  //   }
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
