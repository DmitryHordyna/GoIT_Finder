import API from '../service/api';
// import templatesPictures from '../../templates/listPictured.hbs';
import templatesPictures from '../../templates/cardPictures.hbs';
import preloaderFactory from '../prelouder/prelouder';

const refs = {
  pictureList: document.querySelector('.gallery'),
  form: document.querySelector('.search-form'),
  btnLoad: document.querySelector('.btn-load'),
};
let querySearch = '';
let currentPage = 1;

const preloader = preloaderFactory('.preloader');
const bntShow = preloaderFactory('.button_more');
const wrongText = preloaderFactory('.helper');

function markup(dataSearch) {
  refs.pictureList.insertAdjacentHTML(
    'beforeend',
    templatesPictures(dataSearch),
  );
}

refs.form.addEventListener('submit', onSearch);
refs.btnLoad.addEventListener('click', onLoadMore);

function onLoadMore() {
  wrongText.hide();
  preloader.show();

  API.fetchPictire(querySearch, currentPage)
    .then(({ hits }) => {
      if (hits.length === 0) {
        return wrongText.show();
      }
      if (hits.length <= 11) {
        return markup(hits);
      }
      markup(hits);
      bntShow.show();
    })
    .catch(error => console.log(error))
    .finally(preloader.hide());
  currentPage++;
  return;
}

function onSearch(e) {
  e.preventDefault();
  refs.pictureList.textContent = '';
  querySearch = e.currentTarget.elements.query.value.trim();
  preloader.show();
  wrongText.hide();

  API.fetchPictire(querySearch, currentPage)
    .then(({ hits }) => {
      if (hits.length === 0) {
        return wrongText.show();
      }
      if (hits.length <= 11) {
        return markup(hits);
      }
      markup(hits);
      bntShow.show();
    })
    .catch(error => console.log(error))
    .finally(preloader.hide());
  currentPage++;

  return;
}
