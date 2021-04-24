const API_KEY = '&key=21266258-ed1f1a426d97c1dcb24ced78e';
const BASE_URL = 'https://pixabay.com/api/';
const OptionsPicture = '?image_type=photo&orientation=horizontal';

export default {
  async fetchPictire(querySearch, currentPage) {
    const responce = await fetch(
      `${BASE_URL}${OptionsPicture}&q=${querySearch}&page=${currentPage}&per_page=12${API_KEY}`,
    );
    const pictures = await responce.json();
    
    return pictures;
  },
};
