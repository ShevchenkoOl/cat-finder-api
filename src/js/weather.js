//Сервер - це комп'ютер зі спеціальним програмним забезпеченням.
//Бекенд - це програма, розташована на сервері, здатна обробити вхідні HTTP-запити і має набір готових дій на певні запити.
//API (інтерфейс прикладного програмування) - набір чітко визначених правил зв'язку між різними програмними компонентами. Інтерфейс описує, що можна попросити програму зробити і що буде в результаті.
//REST (representational state transfer) - стиль бекенд-архітектури, ґрунтується на наборі принципів, які описують, яким чином визначаються і адресуються мережеві ресурси.
//REST API - бекенд побудований за принципом REST. Слугує прошарком між веб-застосунком і базою даних. Має стандартний інтерфейс для звернення до ресурсів. Працює як веб-сайт, ми посилаємо HTTP-запит з клієнта на сервер, а у відповідь, заміст1ь HTML-сторінки, отримуємо дані в JSON-форматі.
//AJAX (Asynchronous JavaScript and XML) - метод отримання або відправлення даних з подальшим оновленням інтерфейсу за цими даними, без потреби перезавантаження сторінки. Завдяки цьому зменшується час відгуку і веб-сторінка стає інтерактивнішою. Цей процес можна розібрати на прикладі завантаження даних.

//запиту інформації про колекції несправжніх користувачів
// const fetchUsersBtn = document.querySelector(".btn");
// const userList = document.querySelector(".user-list");

// Weather
//Алгоритм: 1- створюємо запрос на сервер тобто функція weatherApi; 2 - створюємо функцію обробника події onSearch; 3 - створюємо нашу нову розмітку creatMakeUp
const form = document.querySelector('.js-weather');
const list = document.querySelector('.user-list');

const onSearch = evt => {
  evt.preventDefault();
  const {
    query: { value: query },
    days: { value: days },
  } = evt.currentTarget.elements; //это это элемент формы с атрибутом name="query" и name="days" соответственно, evt.currentTarget.elements - эта коллекция содержит все элементы формы (input, select, textarea и т. д.).
  // console.log(query); // возвращает сам текст введенный в атрибут name="query" и name="days" соответственно
  //console.log(days);
  if(!query){    //обробка пустого рядка
    return alert('add value')
  }
  try {
    weatherApi(query, days)
      .then(data => list.innerHTML = creatMakeUp(data.forecast.forecastday))
      .catch(err => list.innerHTML = createErrorMarkup()); // Обробка помилки
  } catch (error) {
    console.error('Помилка при виклику API:', error);
    list.innerHTML = createErrorMarkup();
  }
  //console.log(data.forecast.forecastday));
};

const weatherApi = (query = 'Prague', days = 3) => {
  const BASE_URL = 'https://api.weatherapi.com/v1/forecast.json';
  const API_KEY = '94a040c94bab4dcabf9130808222712';
  return fetch(`${BASE_URL}?key=${API_KEY}&q=${query}&days=${days}`).then(
    resp =>
      //console.log(resp)
      {
        if (!resp.ok) {
          throw new Error(resp.statusText);
        }
        return resp.json();
      }
  );
};

form.addEventListener('submit', onSearch);

const creatMakeUp = arr => {
  //console.log(arr);  //проверяем или прищел наш масив creatMakeUp(data.forecast.forecastday)
  return arr
    .map(
      ({
        day: {
          condition: { icon, text },
          avgtemp_c,
        },
        date,
      }) =>
        //console.log(icon, text, avgtemp_c, date);
        `<li>
        <img src="${icon}" alt="${text}">
        <h2>Опис: ${text}</h2>
        <h3>Дата: ${date}</h3>
        <h4>Середня температура: ${avgtemp_c}</h4>
    </li> `
    )
    .join('')
};

function createErrorMarkup(){
  return `<li><img src="https://www.shutterstock.com/image-vector/web-banner-error-400-bad-260nw-1157766460.jpg" alt="Bad request"></li>`
}


