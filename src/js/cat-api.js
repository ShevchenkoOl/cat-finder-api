//import axios from 'axios';
import { creatDetailMakeup } from "./finderCat.js";

//Без використання axios
export const fetchBreeds = () => {
    const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
    const TOKEN = 'live_fwsTbno2pr9SQVOJ0bvCfDcDRMTbkGxPv8RP8n4AgXbmimLVMEKZU93Yg0pV4kQz';
    const options = {
        headers: {
            'x-api-key': TOKEN
        }
    };
    return fetch(`${BASE_URL}`, options).then(
      res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
       }
    );
  };

  export const fetchCatByBreed = (breedId) => {
    const TOKEN =
      'live_fwsTbno2pr9SQVOJ0bvCfDcDRMTbkGxPv8RP8n4AgXbmimLVMEKZU93Yg0pV4kQz';
    const options = {
      headers: {
        'x-api-key': TOKEN,
      },
    };
    return fetch(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`,
      options
    ).then(res => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    }).then(data => {creatDetailMakeup(data, breedId);
    });
  };
 