// import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

// window.addEventListener('scroll', loadMoreImages);

const API_KEY = '26860681-a6fc642b676e1a9ee24890c43';
const BASE_URL = 'https://pixabay.com/api/';

export default class ImagesApiService {
  constructor() {
    this.page = 1;
    this.query = '';
  }
  async getImages() {
    const searchParameters = {
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      q: `${this.query}`,
      per_page: '40',
      page: `${this.page}`,
    };
    this.page += 1;
    return await axios.get(`${BASE_URL}`, {
      params: searchParameters,
    });
  }

  resetPage() {
    this.page = 1;
  }
}
