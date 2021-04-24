import API from '../service/api';
import templatesPictures from '../../templates/cardPictures.hbs';
import preloaderFactory from '../prelouder/prelouder';

const refs = {
  pictureList: document.querySelector('.gallery'),
  form: document.querySelector('.search-form'),
  btnLoad: document.querySelector('.btn-load'),
};
let querySearch = 'cat';
let currentPage = 1;

const preloader = preloaderFactory('.loader');
const bntShow = preloaderFactory('.button_more');
const wrongText = preloaderFactory('.helper');

refs.form.addEventListener('submit', onSearch);
refs.btnLoad.addEventListener('click', onLoadMore);

function markup(dataSearch) {
  refs.pictureList.insertAdjacentHTML(
    'beforeend',
    templatesPictures(dataSearch),
  );
}

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

// import templatesPictures from '../../templates/listPictured.hbs';

// API.fetchPictire(querySearch, currentPage)
//   .then(({ hits }) => {
//     if (hits.length === 0) {
//       return wrongText.show();
//     }
//     if (hits.length <= 11) {
//       return markup(hits);
//     }
//     markup(hits);
//     bntShow.show();
//     return;
//   })
//   .catch(error => console.log(error))
//   .finally(preloader.hide());
