//import axios from "axios";

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const input = document.querySelector('.input');
const detailElement = document.querySelector('.detail');


fetchBreeds().then(data => {
  creatMakeup(data);
});


const creatMakeup = arr => {
  const markUp = `<form>
        <select id="electElement">
                ${arr
                  .map(
                    ({ id, name }) => `<option value="${id}">${name}</option>`
                  )
                  .join('')}
        </select>
    </form>`;
  input.insertAdjacentHTML('beforeend', markUp);
};

input.addEventListener('change', e => {
  e.preventDefault();
  let breedId = e.target.value;

  fetchCatByBreed(breedId).then(catData => {
    creatDetailMakeup(catData, breedId);
  });
});

// const showLoadingMessage = () => {
//   detailElement.innerHTML = 'Loading data, please wait...';
// };

// // Функция для скрытия сообщения о загрузке данных
// const hideLoadingMessage = () => {
//   detailElement.innerHTML = ''; // Очищаем содержимое detail
// };

export const creatDetailMakeup = (arr, breedIdParam) => {
// showLoadingMessage();
  if (!arr || arr.length === 0) {
    console.error('Array is empty or undefined');
    //hideLoadingMessage();
    return;
  }
  const breed = arr.find(cat => cat.breeds && cat.breeds.find(breed => breed.id === breedIdParam));
  //const breed = arr[0].breeds.find(breed => breed.id === breedIdParam);
  if (!breed) {
    console.error('Breed not found');
    //hideLoadingMessage();
    return;
  }
  const {name, description, temperament} = breed.breeds.find(breed => breed.id === breedIdParam);  //const {name, description, temperament} = breed;
  const markUp =
  `<h2>${name}</h2>
       <img src="${breed.url}" alt="${name}" width="400" height="390"/>
       <p><h3>Description:</h3> ${description}</p>
       <p><h3>Temperament:</h3> ${temperament}</p>`;
  detailElement.innerHTML = markUp;
  //hideLoadingMessage();
};