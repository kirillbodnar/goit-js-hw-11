// import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

// window.addEventListener('scroll', loadMoreImages);

const API_KEY = '26860681-a6fc642b676e1a9ee24890c43';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImages(name) {
  const searchParameters = {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    q: `${name}`,
    per_page: '40',
  };

  return await axios.get(`${BASE_URL}`, {
    params: searchParameters,
  });
}

// function loadMoreImages(name) {
//   if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
//     getImages(name);
//     console.log('woah');
//   }
// }
