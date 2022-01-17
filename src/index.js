// import './sass/main.scss';
import './css/style.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import NewsApiService from './js/components/new-api-service';
import { divide } from 'lodash';
import cardsTpl from './templates/cards.hbs';

const newsApiService = new NewsApiService();

const form = document.querySelector('.search-form');
form.addEventListener('submit', onSubmitForm);

const button_load = document.querySelector('.load-more');
button_load.addEventListener('click', onClickLoadMore);

const divCard = document.querySelector('.gallery');

function onSubmitForm(event) {
  event.preventDefault();
  newsApiService.query = event.currentTarget.elements.searchQuery.value;
  if (!newsApiService.query.trim()) {
    Notiflix.Notify.failure('Oops, enter your request');
    return;
  }
  newsApiService.resetPage();
  newsApiService.fetchCards().then(appendCardsMarkup);
}
function onClickLoadMore() {
  console.log('Load more');
  newsApiService.fetchCards().then(appendCardsMarkup);
}
function appendCardsMarkup(cards) {
  console.log('append');
  divCard.insertAdjacentHTML('beforeend', cardsTpl(cards));
}
