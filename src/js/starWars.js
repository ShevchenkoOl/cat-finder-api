const list = document.querySelector('body');
const form = document.querySelector('.form');
const selectList = document.querySelector('#selectList');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    //console.log(selectList.value);
    starsWars()
.then(data => list.innerHTML = list.innerHTML = creatMakeup(data.results))//console.log(data) //выводит в консоль ркзультат исполнение функции starsWars()
.catch(error => {console.error(error);});
});

const starsWars = () => {
    const BASE_URL = 'https://swapi.dev/api/';
    return fetch(`${BASE_URL}${selectList.value}`)
    .then(res => //console.log(res) // Это метод промиса, который выполняется после завершения запроса. Он принимает функцию обратного вызова, которая будет вызвана с результатом запроса.
     {if (!res.ok) {
      throw new Error(res.statusText); //Эта проверка выполняется для убедительности в том, что запрос завершился успешно (HTTP-статус 200). Если статус не 200, значит возникла ошибка, и функция выбрасывает исключение с текстом ошибки. 
     }
return res.json();
    }
)
};
 //console.log(starsWars());

const creatMakeup = (data) => {
    let markup = '';
    
    if (Array.isArray(data)) {
        markup = data.map(item => {
            if (item.name) { // Проверяем наличие свойства "name", чтобы определить, что это персонаж
                return `
                    <li>
                        <p>Name: ${item.name}</p>
                        <p>Height: ${item.height} cm</p>
                        <p>Mass: ${item.mass} kg</p>
                        <p>Hair Color: ${item.hair_color}</p>
                    </li>
                `;
            } else if (item.title) { // Проверяем наличие свойства "title", чтобы определить, что это фильм
                return `
                    <li>
                        <p>Title: ${item.title}</p>
                        <p>Release Date: ${item.director}</p>
                        <p>Director: ${item.release_date}</p>
                        <!-- Другие свойства фильма, которые вы хотите отобразить -->
                    </li>
                `;
            } else if (item.name) { // Проверяем наличие свойства "name", чтобы определить, что это планета
                return `
                    <li>
                        <p>Name: ${item.name}</p>
                        <p>Climate: ${item.climate}</p>
                        <p>Population: ${item.population}</p>
                        <!-- Другие свойства планеты, которые вы хотите отобразить -->
                    </li>
                `;
            }
}).join('');
}
return markup;
};