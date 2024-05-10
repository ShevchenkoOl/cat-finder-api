import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

export const elements = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  detail: document.querySelector('.detail'),
};

elements.error.classList.add('invisible');

const fetchList = () => {
  fetchBreeds().then(data => {
    const markUp = data
      .map(({ id, name }) => {
        return `<option value="${id}">${name}</option>`;
      })
      .join('');
    elements.select.insertAdjacentHTML('beforeend', markUp);
    new SlimSelect({
      select: elements.select,
    });
  });
};
fetchList();

elements.select.addEventListener('change', e => {
  e.preventDefault();
  let breedId = e.target.value;
  elements.loader.classList.add('invisible');
  fetchCatByBreed(breedId);
});

export const creatDetailMakeup = arr => {
  //console.log(arr);
  return arr
    .map(({ url, breeds }) => {
      const breedName = breeds[0].name;
      const breedDescription = breeds[0].description;
      const breedTemperament = breeds[0].temperament;
      return `<div class="container">
    <div class="cat-details">
      <img src="${url}" alt="" width="400" height="390"/>
      <div class="cat-info">
        <h2>${breedName}</h2>
        <p>${breedDescription}</p>
        <p><strong>Temperament:</strong> ${breedTemperament}</p>
      </div>
    </div>
  </div>`;
    })
    .join('');
};

//elements.detail.innerHTML = creatDetailMakeup();

// export const creatDetailMakeup = (breedIdParam) => {
//   let selectedBreed;
//   fetchBreeds()
//     .then(data => {
//       selectedBreed = data.find(breed => breed.id === breedIdParam);
//       return fetchCatByBreed(breedIdParam);
//     })
//     .then(catInfo => {
//       const catData = catInfo[0];
//       const { name, description, temperament } = catData.breeds.find(breed => breed.id === breedIdParam);
//       const markUp =
//         `<h2>${name}</h2>
//         <img src="${catData.url}" alt="${name}" width="400" height="390"/>
//         <p><h3>Description:</h3> ${description}</p>
//         <p><h3>Temperament:</h3> ${temperament}</p>`;
//       elements.detail.innerHTML = markUp;
//     })
//     .catch(error => {
//       console.error('Error fetching cat data:', error);
//       elements.error.classList.remove('invisible');
//     });
// };
