// import './sass/main.scss';
import './css/style.css';
import Notiflix from 'notiflix';
// import debounce from 'lodash.debounce';
import NewsApiService from './js/components/new-api-service';
// import { divide } from 'lodash';
import cardsTpl from './templates/cards.hbs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import LoadMoreBtn from './js/components/load-more-btn';

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const newsApiService = new NewsApiService();

const form = document.querySelector('.search-form');
form.addEventListener('submit', onSubmitForm);

const button_load = document.querySelector('.load-more');
loadMoreBtn.refs.button.addEventListener('click', onClickLoadMore);

const divCardContainer = document.querySelector('.gallery');

function onSubmitForm(event) {
  event.preventDefault();
  newsApiService.query = event.currentTarget.elements.searchQuery.value;
  if (!newsApiService.query.trim()) {
    return Notiflix.Notify.warning('Oops, enter your request');
  }
  newsApiService.resetPage();
  newsApiService.fetchCards().then(cards => {
    clearCardsContainer();
    appendCardsMarkup(cards.hits);
  });
}
function onClickLoadMore() {
  console.log('Load more');
  newsApiService.fetchCards().then(appendCardsMarkup);
}
function appendCardsMarkup(cards) {
  console.log('append');
  divCardContainer.insertAdjacentHTML('beforeend', cardsTpl(cards));
  lightBoxes();
}
function clearCardsContainer() {
  divCardContainer.innerHTML = '';
}
function lightBoxes() {
  let lightbox = new SimpleLightbox('.gallery a', {
    caption: true,
    captionsData: 'alt',
    captionDelay: 250,
    navText: ['←', '→'],
    captionPosition: 'bottom',
  });
  lightbox.refresh();
}
