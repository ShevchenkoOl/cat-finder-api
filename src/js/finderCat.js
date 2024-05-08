import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const elements = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  detail: document.querySelector('.detail'),
};

elements.error.classList.add('invisible');

const fetchList = () => {
fetchBreeds()
.then(data => {
  const markUp = data.map(({ id, name }) => { 
    return `<option value="${id}">${name}</option>`
  }).join('');
    elements.select.insertAdjacentHTML('beforeend', markUp);
    new SlimSelect({
      select: elements.select,
    })
})

}
fetchList();

elements.select.addEventListener('change', e => {
  e.preventDefault();
  let breedId = e.target.value;
  elements.loader.classList.add('invisible');
  fetchCatByBreed(breedId)
  .then(catData => {
    creatDetailMakeup(catData, breedId);
  });
});

export const creatDetailMakeup = (breedIdParam) => {
  let selectedBreed;
  fetchBreeds()
    .then(data => {
      selectedBreed = data.find(breed => breed.id === breedIdParam);
      return fetchCatByBreed(breedIdParam);
    })
    .then(catInfo => {
      const catData = catInfo[0];
      const { name, description, temperament } = catData.breeds.find(breed => breed.id === breedIdParam);
      const markUp =
        `<h2>${name}</h2>
        <img src="${catData.url}" alt="${name}" width="400" height="390"/>
        <p><h3>Description:</h3> ${description}</p>
        <p><h3>Temperament:</h3> ${temperament}</p>`;
      elements.detail.innerHTML = markUp;
    })
    .catch(error => {
      console.error('Error fetching cat data:', error);
      elements.error.classList.remove('invisible');
    });
};
