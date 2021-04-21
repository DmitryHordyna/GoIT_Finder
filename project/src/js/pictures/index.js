import fetchPictire from '../service/pictures.api';
// import templatesPictures from '../../templates/listPictured.hbs';
import templatesPictures from '../../templates/cardPictures.hbs';

const refs = {
  pictureList: document.querySelector('.gallery'),
  form: document.querySelector('.search-form'),
};
let querySearch = '';

function markup(dataSearch) {
  refs.pictureList.insertAdjacentHTML(
    'beforeend',
    templatesPictures(dataSearch),
  );
}

refs.form.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  refs.pictureList.textContent = '';

  querySearch = e.currentTarget.elements.query.value;

  return fetchPictire(querySearch).then(({ hits }) => {
    markup(hits);
  });
}
