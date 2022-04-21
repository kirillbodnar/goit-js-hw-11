import './styles.css';
import { getImages } from './js_components/fetchImages';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('.search-form__input'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  clearGallery();
  let name = refs.input.value;
  getImages(`${name}`).then(image => appendCardMarkUp(image.data.hits));
}

function createCardMarkUp(image) {
  return image
    .map(({ tags, webformatURL, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div>`;
    })
    .join('');
}

function appendCardMarkUp(image) {
  refs.gallery.insertAdjacentHTML('beforeend', createCardMarkUp(image));
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}
