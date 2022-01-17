const API_KEY = `25261473-89ff100c1e0e7a5a30ee5e680`;
export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
  }
  fetchArticles() {
    console.log(this);
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=10`;
    fetch(url)
      .then(r => r.json())
      .then(console.log);
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
