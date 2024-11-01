document.getElementById('search_form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const infoSelect = document.getElementById('info_select').value;
    const idInput = document.getElementById('id_input').value;
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    const loading = document.getElementById('loading');

    // Проверка выбора категории и ввода идентификатора
    if (!infoSelect || !idInput) {
        displayError("Select category and enter correct ID/ Выберите категорию и введите корректный ID (1-10).");
        return;
    }
    resultDiv.innerHTML = '';
    errorDiv.innerHTML = '';
    loading.style.display = 'block';  // Показать лоадер
    try {
        const response = await fetch(`https://swapi.py4e.com/api/${infoSelect}/${idInput}/`);
        
        if (!response.ok) {
            throw new Error(`Error/ Ошибка ${response.status}: Server is not available/ Сервер не доступен`);
        }
        const data = await response.json();
        loading.style.display = 'none';  // Скрыть лоадер
        displayResult(data, infoSelect);
    } catch (error) {
        loading.style.display = 'none';  // Скрыть лоадер
        displayError(error.message);
    }
});

// Функция для отображения результата с фильтрацией данных по категориям
function displayResult(data, category) {
    const resultDiv = document.getElementById('result');
    document.getElementById('error').innerHTML = '';  // Скрыть ошибку при успешном результате
    let output = '';
    // Выбираем, какие данные отображать, в зависимости от категории
    switch (category) {
        case 'people':
            output = `
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Height:</strong> ${data.height}</p>
                <p><strong>Mass:</strong> ${data.mass}</p>
                <p><strong>Hair Color:</strong> ${data.hair_color}</p>
                <p><strong>Skin Color:</strong> ${data.skin_color}</p>
                <p><strong>Eye Color:</strong> ${data.eye_color}</p>
                <p><strong>Birth Year:</strong> ${data.birth_year}</p>
                <p><strong>Gender:</strong> ${data.gender}</p>`;
            break;
        case 'films':
            output = `
                <p><strong>Title:</strong> ${data.title}</p>
                <p><strong>Episode ID:</strong> ${data.episode_id}</p>
                <p><strong>Opening Crawl:</strong> ${data.opening_crawl}</p>
                <p><strong>Director:</strong> ${data.director}</p>
                <p><strong>Producer:</strong> ${data.producer}</p>
                <p><strong>Release Date:</strong> ${data.release_date}</p>`;
            break;
        case 'starships':
            output = `
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Model:</strong> ${data.model}</p>
                <p><strong>Manufacturer:</strong> ${data.manufacturer}</p>
                <p><strong>Cost in Credits:</strong> ${data.cost_in_credits}</p>
                <p><strong>Length:</strong> ${data.length}</p>
                <p><strong>Max Atmosphering Speed:</strong> ${data.max_atmosphering_speed}</p>
                <p><strong>Crew:</strong> ${data.crew}</p>
                <p><strong>Hyperdrive Rating:</strong> ${data.hyperdrive_rating}</p>
                <p><strong>Starship Class:</strong> ${data.starship_class}</p>`;
            break;
        case 'planets':
            output = `
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Rotation Period:</strong> ${data.rotation_period}</p>
                <p><strong>Orbital Period:</strong> ${data.orbital_period}</p>
                <p><strong>Diameter:</strong> ${data.diameter}</p>
                <p><strong>Surface Water:</strong> ${data.surface_water}</p>
                <p><strong>Population:</strong> ${data.population}</p>`;
            break;
        default:
            output = '<p>Unknown category</p>';
            break;
    }
    resultDiv.innerHTML = output;
}

// Функция для отображения ошибок
function displayError(message) {
    const errorDiv = document.getElementById('error');
    document.getElementById('result').innerHTML = '';  // Скрыть результат при ошибке
    errorDiv.textContent = message;
}