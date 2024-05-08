import { creatDetailMakeup } from './finderCat.js';
const TOKEN =
  'live_fwsTbno2pr9SQVOJ0bvCfDcDRMTbkGxPv8RP8n4AgXbmimLVMEKZU93Yg0pV4kQz';
const options = {
  headers: {
    'x-api-key': TOKEN,
  },
};

export const fetchBreeds = () => {
  return fetch('https://api.thecatapi.com/v1/breeds', options).then(res => {
    //console.log(res)
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  });
};

export const fetchCatByBreed = breedId => {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`,
    options
  )
    .then(res => {
      //console.log(res)
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then(data => {
      creatDetailMakeup(data, breedId);
    });
};
//   export const fetchCatByBreed = (breedId) => {
//     const TOKEN =
//       'live_fwsTbno2pr9SQVOJ0bvCfDcDRMTbkGxPv8RP8n4AgXbmimLVMEKZU93Yg0pV4kQz';
//     const options = {
//       headers: {
//         'x-api-key': TOKEN,
//       },
//     };
//     return fetch(
//       `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`,
//       options
//     ).then(res => {
//       if (!res.ok) {
//         throw new Error(res.statusText);
//       }
//       return res.json();
//     }).then(data => {creatDetailMakeup(data, breedId);
//     });
//   };
