import axios from "axios";
import Notiflix from 'notiflix';
import { creatDetailMakeup, elements } from './finderCat.js';

//-----------------------------Using the library axios

axios.defaults.headers.common["x-api-key"] = "live_fwsTbno2pr9SQVOJ0bvCfDcDRMTbkGxPv8RP8n4AgXbmimLVMEKZU93Yg0pV4kQz";

export const fetchBreeds = () => {
return axios.get('https://api.thecatapi.com/v1/breeds')
.then((res)=>{
  //console.log(res);
  return res.data;
})
.catch((error)=>{
  console.error('Error fetching cat breeds:', error);
  Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!'),
  elements.loader.classList.add('invisible')
});
}

export const fetchCatByBreed = breedId => {
return axios.get('https://api.thecatapi.com/v1/images/search', {
  params: {breed_ids: `${breedId}`}
})
.then((res)=>{
  //console.log(res);
  return res.data;
})
.then(data => {
        const detailMarkup = creatDetailMakeup(data);
        elements.detail.innerHTML = detailMarkup;
      })
.catch((error)=>{
  console.error('Error fetching cat breeds:', error);
  Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!'),
  elements.loader.classList.add('invisible')
});
}

//------------------------------------------------ Without using the library axios, using the fetch API

// const TOKEN ='live_fwsTbno2pr9SQVOJ0bvCfDcDRMTbkGxPv8RP8n4AgXbmimLVMEKZU93Yg0pV4kQz';
// const options = {
//   headers: {
//     'x-api-key': TOKEN,
//   },
// };

// export const fetchBreeds = () => {
//   return fetch('https://api.thecatapi.com/v1/breeds', options)
//   .then(res => {
//     //console.log(res)
//     if (!res.ok) {
//       throw new Error(
//         Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!'),
//         elements.loader.classList.add('invisible')
//       );
//     }
//     return res.json();
//   });
// };

// export const fetchCatByBreed = breedId => {
//   return fetch(
//     `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`,
//     options
//   )
//     .then(res => {
//       //console.log(res)
//       if (!res.ok) {
//         throw new Error(
//         Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!'),
//         elements.loader.classList.add('invisible')
//       );
//       }
//       return res.json();
//     })
//     .then(data => {
//       const detailMarkup = creatDetailMakeup(data);
//       elements.detail.innerHTML = detailMarkup;
//     })
// };
