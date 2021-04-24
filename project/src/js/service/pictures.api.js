const API_KEY = '&key=21266258-ed1f1a426d97c1dcb24ced78e';
const BASE_URL = 'https://pixabay.com/api/';
const OptionsPicture = '?image_type=photo&orientation=horizontal';

function fetchPictire(querySearch) {
  return fetch(
    `${BASE_URL}${OptionsPicture}${querySearch}&q=${querySearch}&page=1&per_page=12${API_KEY}`,
  ).then(res => {
    if (!res.ok) {
      throw res;
    }
    return res.json();
  });
}

export default fetchPictire;
