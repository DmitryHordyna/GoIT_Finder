import API from '../service/api';
import templatesPictures from '../../templates/cardPictures.hbs';
import preloaderFactory from '../prelouder/prelouder';
import scroll from '../scroll/scroll';
const refs = {
  pictureList: document.querySelector('.gallery'),
  form: document.querySelector('.search-form'),
  btnLoad: document.querySelector('.btn-load'),
  totalP: document.querySelector('.total-p'),
};

let querySearch = '';
let currentPage = 1;

const preloader = preloaderFactory('.preloader');
const bntShow = preloaderFactory('.button_more');
const wrongText = preloaderFactory('.helper');
const founderText = preloaderFactory('.about');

refs.form.addEventListener('submit', onSearch);
refs.btnLoad.addEventListener('click', onLoadMore);

function markup(dataSearch) {
  refs.pictureList.insertAdjacentHTML(
    'beforeend',
    templatesPictures(dataSearch),
  );
}

function onLoadMore() {
  featchApi(querySearch, currentPage);
  // window.scrollBy(0, window.innerHeight);
  setTimeout(
    () =>
      window.scrollBy(
        window.scrollBy({
          top: window.innerHeight,
          left: 0,
          behavior: 'smooth',
        }),
      ),
    200,
  );
}

function onSearch(e) {
  e.preventDefault();

  refs.pictureList.textContent = '';
  querySearch = e.currentTarget.elements.query.value.trim();

  founderText.hide();
  preloader.show();
  wrongText.hide();

  featchApi(querySearch);
}

function featchApi(querySearch) {
  API.fetchPictire(querySearch, currentPage)
    .then(({ hits, total }) => {
      if (querySearch === '') {
        return;
      }
      if (hits.length === 0) {
        bntShow.hide();
        return wrongText.show();
      }
      if (hits.length <= 11) {
        bntShow.hide();
        return markup(hits);
      }
      refs.totalP.textContent = total;
      markup(hits);
      bntShow.show();
    })
    .catch(error => console.log(error))
    .finally(preloader.hide());

  currentPage++;
}
