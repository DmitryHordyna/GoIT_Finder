import API from '../service/api';
import templatesPictures from '../../templates/cardPictures.hbs';
import preloaderFactory from '../prelouder/prelouder';
import scroll from '../scroll/scroll';
const refs = {
  pictureList: document.querySelector('.gallery'),
  form: document.querySelector('.search-form'),
  btnLoad: document.querySelector('.btn-load'),
  totalP: document.querySelector('.total-p'),
  sentinel: document.querySelector('#sentinel'),
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

async function onLoadMore() {
  founderText.hide();
  preloader.show();
  const newPictures = await API.fetchPictire(querySearch, currentPage);

  markup(newPictures.hits);
  preloader.hide();
  // scrollTo();
  currentPage++;
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
      console.log(hits);
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
      // bntShow.show();
    })
    .catch(error => console.log(error))
    .finally(preloader.hide());

  currentPage++;
}
function scrollTo() {
  let scrollHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight,
  );
  window.scrollTo({
    top: scrollHeight,
    behavior: 'smooth',
    during: 1000,
  });
}
///==============! observe

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && querySearch !== '') {
      onLoadMore();
    }
  });
};

const options = {
  rootMargin: '160px',
};
const observer = new IntersectionObserver(onEntry, options);
observer.observe(refs.sentinel);
//======!
// setTimeout(
//   () =>
//     window.scrollTo(
//       window.scrollBy({
//         top: window.innerHeight,
//         left: 0,
//         behavior: 'smooth',
//       }),
//     ),
//   200,
// );
