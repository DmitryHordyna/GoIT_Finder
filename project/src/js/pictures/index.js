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

function markup(dataSearch) {
  refs.pictureList.insertAdjacentHTML(
    'beforeend',
    templatesPictures(dataSearch),
  );
}

refs.form.addEventListener('submit', onSearch);
refs.btnLoad.addEventListener('click', onLoadMore);

function onLoadMore() {
  console.log(currentPage);
  preloader.show();

  API.fetchPictire(querySearch, currentPage)
    .then(({ hits }) => {
      markup(hits);
    })
    .catch(error => error)
    .finally(preloader.hide());
  currentPage++;
  return;
}

function onSearch(e) {
  e.preventDefault();
  refs.pictureList.textContent = '';
  querySearch = e.currentTarget.elements.query.value.trim();
  preloader.show();

  querySearch &&
    API.fetchPictire(querySearch, currentPage)
      .then(({ hits }) => {
        markup(hits);
      })
      .catch(error => error)
      .finally(preloader.hide());
  currentPage++;
  bntShow.show();
  return;
}
