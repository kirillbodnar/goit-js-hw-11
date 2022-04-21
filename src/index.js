import './styles.css';
import ImagesApiService from './js_components/fetchImages';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const imagesApiService = new ImagesApiService();

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('.search-form__input'),
  gallery: document.querySelector('.gallery'),
};

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  window.addEventListener('scroll', loadMoreImagesOnScroll);
  clearGallery();
  imagesApiService.resetPage();
  imagesApiService.query = refs.input.value;
  imagesApiService.getImages().then(image => {
    noImagesFoundNotification(image);
    appendCardMarkUp(image.data.hits);
    lightbox.refresh();
  });
}

function loadMoreImagesOnScroll() {
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
    imagesApiService.getImages().then(image => {
      endOfImagesNotification(image);
      appendCardMarkUp(image.data.hits);
      lightbox.refresh();
    });
  }
}

function createCardMarkUp(image) {
  return image
    .map(({ tags, webformatURL, largeImageURL, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
      <a href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" title="${tags} "loading="lazy" />
  </a>
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

function endOfImagesNotification(image) {
  if (image.data.hits.length === 0) {
    return Notify.warning("We're sorry, but you've reached the end of search results.");
  }
}

function noImagesFoundNotification(image) {
  if (image.data.hits.length === 0) {
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
  }
}
