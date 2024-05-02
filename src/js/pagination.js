const list = document.querySelector('.list');
const load = document.querySelector('.load');
let page = 1;


const lordOfTheRingsAPI = (page = 1) => {     // для пагінації ми передаем параметр page i по default встановоюємо значення 1, тобто починаєм з першої сторінки
    const BASE_URL = 'https://the-one-api.dev/v2/character';
    const API_KEY = 'XJlq9OFMcHAy8pAQK7xj';

    const options = {                     // якщо у нас є авторизація тоді створюємо цей об'єкт, після чого передаєм його як другий параматр до fetch()
        headers: {                        // по default, тип запиту завжди буде GET, якщо хочемо змінити тип запиту, то прописуэмо в options.method: 'POST' - перед headers
            Authorization: `Bearer ${API_KEY}`    // тут вказуємо ключ авторизаці та спосіб Bearer
        }
    };

    return fetch(`${BASE_URL}?limit=30&page=${page}`, options).then(res => {//console.log(res)
        if(!res.ok) {
            throw new Error(res.statusText)
        }
        return res.json();
    }    
)
};

lordOfTheRingsAPI().then(data => {
    creatMakeup(data.docs);
    load.hidden = false;
});

const creatMakeup = (arr) => {
    const markUp = arr.map(({name, race}) => 
    `<li>
        <h2>${name}</h2>
        <h3>${race}</h3>
    </li>`).join('');
    list.insertAdjacentHTML('beforeend', markUp);
};

load.addEventListener('click', () => {
    page += 1;
    lordOfTheRingsAPI(page).then(data => {console.log(data)});
});