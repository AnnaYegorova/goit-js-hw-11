import './css/style.css';
import Notiflix from 'notiflix';
import NewsApiService from './js/components/new-api-service';
import cardsTpl from './templates/cards.hbs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import LoadMoreBtn from './js/components/load-more-btn';

const divCardContainer = document.querySelector('.gallery');

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const downBtn = new LoadMoreBtn({
  selector: '[data-action="button-scroll-down"]',
  hidden: true,
});
const upBtn = new LoadMoreBtn({
  selector: '[data-action="button-scroll-up"]',
  hidden: true,
});

const newsApiService = new NewsApiService();

const form = document.querySelector('.search-form');
form.addEventListener('submit', onSearch);

loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
const scrollDown = document.querySelector('.button-scroll-down');
scrollDown.addEventListener('click', onScrollDown);
const scrollUp = document.querySelector('.button-scroll-up');
scrollUp.addEventListener('click', onScrollUp);

function onScrollUp() {
  // console.log(divCardContainer.getBoundingClientRect());

  // const { height: cardHeight } = divCardContainer.getBoundingClientRect();
  const { height: cardHeight } = divCardContainer.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: -1 * cardHeight * 2,
    behavior: 'smooth',
  });
}

function onScrollDown() {
  // console.log('heigth', divCardContainer.getBoundingClientRect().height);

  // const { height: cardHeight } = divCardContainer.getBoundingClientRect();
  const { height: cardHeight } = divCardContainer.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

async function onSearch(event) {
  event.preventDefault();
  clearCardsContainer();

  newsApiService.query = event.currentTarget.elements.searchQuery.value;
  if (!newsApiService.query.trim()) {
    return Notiflix.Notify.warning('Oops, enter your request');
  }

  loadMoreBtn.show();
  downBtn.show();
  upBtn.show();

  newsApiService.resetPage();
  try {
    const data = await newsApiService.fetchCards();

    if (data.totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
      // loadMoreBtn.disable();
      loadMoreBtn.hide();
    }
    if (data.totalHits > 0) {
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      appendCardsMarkup(data.hits);
      loadMoreBtn.enable();
    }
    if (data.totalHits < 40) {
      loadMoreBtn.hide();
      downBtn.hide();
      upBtn.hide();
    }
  } catch (error) {
    console.log(error);
  }
}

async function onLoadMore() {
  try {
    const data = await newsApiService.fetchCards();
    appendCardsMarkup(data.hits);
    loadMoreBtn.enable();

    console.log('data.hits.length', data.hits.length);
    if (data.hits.length < 40) {
      Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");

      loadMoreBtn.disable();
      loadMoreBtn.hide();

      downBtn.hide();
    }
  } catch (error) {
    console.log(error);
  }
}

function appendCardsMarkup(cards) {
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
