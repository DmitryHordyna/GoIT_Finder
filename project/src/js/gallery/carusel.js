import preloaderFactory from '../prelouder/prelouder';

const refs = {
  modal: document.querySelector('.js-lightbox'),
  modalImg: document.querySelector('.lightbox__image'),
  gallery: document.querySelector('.gallery'),
};

refs.gallery.addEventListener('click', onShowCard);
refs.modal.addEventListener('click', onCloseModal);
window.addEventListener('keyup', onKeyModalEscClose);

function onShowCard(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  cleanPicture();
  refs.modalImg.src = e.target.id;
}

function onKeyModalEscClose(e) {
  if (e.key !== 'Escape') {
    return;
  }
  cleanPicture();
}

function onCloseModal(e) {
  if (e.target.nodeName !== 'DIV' && e.target.nodeName !== 'BUTTON') {
    return;
  }
  cleanPicture();
}

function cleanPicture() {
  refs.modal.classList.toggle('is-open');
  refs.modalImg.src = '';
}
