import fetchPictire from '../service/pictures.api';
// import templatesPictures from '../../templates/listPictured.hbs';
import templatesPictures from '../../templates/cardPictures.hbs';
import preloaderFactory from '../prelouder/prelouder';

const refs = {
  pictureList: document.querySelector('.gallery'),
  form: document.querySelector('.search-form'),
};
let querySearch = '';
const preloader = preloaderFactory('.loader');

function markup(dataSearch) {
  refs.pictureList.insertAdjacentHTML(
    'beforeend',
    templatesPictures(dataSearch),
  );
}

refs.form.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  preloader.show();
  refs.pictureList.textContent = '';

  querySearch = e.currentTarget.elements.query.value.trim();

  fetchPictire(querySearch)
    .then(({ hits }) => {
      markup(hits);
    })
    .catch(error => error)
    .finally(preloader.hide());
  return;
}
// preloader.show();
// preloader.hide();
