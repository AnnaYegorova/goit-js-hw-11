import { includes } from 'lodash';

const API_KEY = `25261473-89ff100c1e0e7a5a30ee5e680`;
export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchCards() {
    console.log(this);
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=10`;
    return fetch(url)
      .then(r => r.json())
      .then(data => {
        this.incrementPages();
        return data.cards;
      });
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
