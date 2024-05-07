/*Алгоритм пагінаці:
1. створюэмо функцыю, яка выдполвыдаэ за нпш HTTP-запит,lordOfTheRingsAPI = (page = 1) - вона приймає один параметр - сторінка, яку ми хочемо отримати по замовчуванню
2. ми викликаєм функцію lordOfTheRingsAPI (), з елементами створення розмітки, які ми отримаємо від API;
3. створюємо функцію creatMakeup (arr), яка приймає масив, який ми отримали від API, звідки ми берем 2 параметри name, race, і створюємо для низ розмітку
4. створюємо послухач події на нашу кнопку завантаження load, по замовчуванню вона не видима, коли відрендериться розмітка вона зявляється
*/
// const list = document.querySelector('.list');
// const load = document.querySelector('.load');
// let page = 1;

// const lordOfTheRingsAPI = (page = 1) => {
//   // для пагінації ми передаем параметр page i по default встановоюємо значення 1, тобто починаєм з першої сторінки
//   const BASE_URL = 'https://the-one-api.dev/v2/character';
//   const API_KEY = 'XJlq9OFMcHAy8pAQK7xj';
//   const sort = 'sort=name:asc'; //додаєм сортування

//   const options = {
//     // якщо у нас є авторизація тоді створюємо цей об'єкт, після чого передаєм його як другий параматр до fetch()
//     method: 'GET',
//     headers: {
//       // по default, тип запиту завжди буде GET, якщо хочемо змінити тип запиту, то прописуэмо в options.method: 'POST' - перед headers
//       Authorization: `Bearer ${API_KEY}`, // тут вказуємо ключ авторизаці та спосіб Bearer
//     },
//   };

//   return fetch(`${BASE_URL}?limit=30&page=${page}&${sort}`, options)
//   .then(res => {
//     //console.log(res)
//     if (!res.ok) {
//       throw new Error(res.statusText); // якщо відповідь не 200, то повертаємо помилку, яку ми сами створили
//     }
//     return res.json();
//   });
// };

// lordOfTheRingsAPI()
//   .then(data => {
//     creatMakeup(data.docs);
//     load.hidden = false;
//   })
//   .catch(error => console.log(error));

// const creatMakeup = arr => {
//   const markUp = arr
//     .map(
//       ({ name, race }) =>
//         `<li>
//         <h2>${name}</h2>
//         <h3>${race}</h3>
//     </li>`
//     )
//     .join('');
//   list.insertAdjacentHTML('beforeend', markUp);
// };

// load.addEventListener('click', () => {
//   page += 1;
//   lordOfTheRingsAPI(page) // - відправляємо запит на бекенд з параметром завантаженої сторінки
//     .then(data => {
//       //console.log(data)
//       creatMakeup(data.docs);
//       if (data.page === data.pages) { // робим перевірку, щоб поточна сторінка була рівна кількості сторінок ждя припинення пагинації
//         // якщо ми законсолимо datа, то побачимо, що page=1 - це першп сторінка, pages=32 - це кількість всього сторінок
//         load.hidden = true;
//       }
//     })
//     .catch(error => console.log(error));
// });

//----------------------------Infinity scroll или бесконечной прокрутка или бесконечным скроллом

//https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

const list = document.querySelector('.list');
const guard = document.querySelector('.guard'); // цей дів створюється спеціально в кірці нашого списка, щоб ми бачили коли ми наближаємося до кінця viewport
let page = 1;

const options = {
  root: null, //document.querySelector("#scrollArea"), // відповідає за яким саме портом(скролом), нам треба слідкувати. Якщо ми використовуємо весь наш viewport, то root: null;
  rootMargin: '300px', // за скільки пікселів до вхолодження в viewport треба спрацювати
  threshold: 1.0, // незовсім потрібний параметр, якщо ми становили rootMargin: "300px" або інше значення крім 0, то цей параметр просто вставляємо з документації
};

const lordOfTheRingsAPI = (page = 1) => {
  const BASE_URL = 'https://the-one-api.dev/v2/character';
  const API_KEY = 'XJlq9OFMcHAy8pAQK7xj';
  const sort = 'sort=name:asc';
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  return fetch(`${BASE_URL}?limit=30&page=${page}&${sort}`, options).then(
    res => {
      //console.log(res)
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    }
  );
};

const creatMakeup = arr => {
  const markUp = arr
    .map(
      ({ name, race }) =>
        `<li>
            <h2>${name}</h2>
            <h3>${race}</h3>
        </li>`
    )
    .join('');
  list.insertAdjacentHTML('beforeend', markUp);
};

const onLoad = (entries, observer) => { // цю функцію з параметрами ми берем із
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      page += 1;
      lordOfTheRingsAPI(page).then(data => {
        creatMakeup(data.docs);
        if(data.page === data.pages) {
            observer.unobserve(guard); // якщо ми дійшли до останнбої сторінки, то відписуємо обсервера не спостерігати 
        }
      })
      .catch(error => console.log(error));
    }
  });
};

lordOfTheRingsAPI()
  .then(data => {
    creatMakeup(data.docs);
    observer.observe(guard); // обсервер спостерігай коли ми наближимося до кінця списка
  })
  .catch(error => console.log(error));

let observer = new IntersectionObserver(onLoad, options);
