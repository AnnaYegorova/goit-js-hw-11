// import './sass/main.scss';
import './css/style.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import NewsApiService from './js/components/new-api-service';
// const API_KEY = `25261473-89ff100c1e0e7a5a30ee5e680`;

const newsApiService = new NewsApiService();

const form = document.querySelector('.search-form');
form.addEventListener('submit', onSubmitForm);

const button_load = document.querySelector('.load-more');
button_load.addEventListener('click', onClickLoadMore);

function onSubmitForm(event) {
  event.preventDefault();
  newsApiService.query = event.currentTarget.elements.searchQuery.value;
  if (!newsApiService.query) {
    Notiflix.Notify.failure('Oops, enter your request');
    return;
  }
  newsApiService.fetchArticles();
}
function onClickLoadMore() {
  console.log('Load more');
  newsApiService.fetchArticles();
}
