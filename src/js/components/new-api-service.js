import { includes } from 'lodash';
const BASE_URL = 'https://pixabay.com/api';
const API_KEY = `25261473-89ff100c1e0e7a5a30ee5e680`;
export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchCards() {
    console.log(this);
    const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}
    &image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;
    return fetch(url).then(responce => {
      this.incrementPages();
      return responce.json();
    });
    // .then(responce=>responce.json())
    // .then({data} => {
    //   this.incrementPages();
    //   return data;
    // }
    // );
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  incrementPages() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}
