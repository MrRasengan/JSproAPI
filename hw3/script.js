// Цель: Разработать веб-приложение, которое каждый день будет отображать новое случайное изображение из коллекции Unsplash, давая пользователю возможность узнать больше о фотографе и сделать "лайк" изображению.

// Регистрация на Unsplash:

// • Перейдите на веб-сайт Unsplash (https://unsplash.com/).
// • Зарегистрируйтесь или войдите в свой аккаунт. (если у вас не было регистрации до этого, новый аккаунт создавать не нужно).

// Создание приложения:

// • Перейдите на страницу разработчика Unsplash (https://unsplash.com/developers).
// • Нажмите "New Application".
// • Заполните необходимую информацию о приложении (можете использовать http://localhost для тестирования).
// • Получите свой API-ключ после создания приложения.

// Разработка веб-приложения:

// • Создайте HTML-страницу с элементами: изображение, имя фотографа, кнопка "лайк" и счетчик лайков.
// • Используя JavaScript и ваш API-ключ, получите случайное изображение из Unsplash каждый раз, когда пользователь загружает страницу.
// • Отобразите информацию о фотографе под изображением.
// • Реализуйте функционал "лайка". Каждый раз, когда пользователь нажимает кнопку "лайк", счетчик должен увеличиваться на единицу.

// * Дополнительные задачи (по желанию):

// • Добавьте функцию сохранения количества лайков в локальное хранилище, чтобы при новой загрузке страницы счетчик не сбрасывался.
// • Реализуйте возможность просмотра предыдущих "фото дня" с сохранением их в истории просмотров.

const API_KEY = "F6YYB6AcHErgfeEic4ZOxpLlbHxr5dmxCXXq19F-Wxw";
const API_URL = 'https://api.unsplash.com/photos/random';
const LOCAL_STORAGE_KEY = 'photoOfTheDay';
const HISTORY_KEY = 'photoHistory';

document.addEventListener('DOMContentLoaded', () => {
    const photoElement = document.getElementById('photo');
    const photographerElement = document.getElementById('photographer');
    const likeButton = document.getElementById('like-button');
    const likeCountElement = document.getElementById('like-count');
    const previousButton = document.getElementById('previous-button');
    const historyElement = document.getElementById('history');

    let likeCount = parseInt(localStorage.getItem(LOCAL_STORAGE_KEY)) || 0;
    likeCountElement.textContent = likeCount;

    // Функция для загрузки случайного фото
    async function loadRandomPhoto() {
        try {
            const response = await fetch(`${API_URL}?client_id=${API_KEY}`);
            console.log('Response Status:', response.status); // Логируем статус ответа
            console.log('Response URL:', response.url); // Логируем URL запроса

            if (!response.ok) {
                throw new Error(`Ошибка ответа: ${response.status}`);
            }

            const photo = await response.json();
            console.log('Photo Response:', photo); // Логируем ответ от API

            // Убедитесь, что photo - это объект, а не массив
            if (Array.isArray(photo)) {
                console.error('Полученные данные не соответствуют ожидаемому формату');
                return;
            }

            if (photo && photo.urls && photo.user) {
                photoElement.src = photo.urls.regular;
                photoElement.alt = photo.alt_description || 'Фото дня';
                photographerElement.innerHTML = `
                    <p>Фото от: ${photo.user.name}</p>
                    <a href="${photo.user.links.html}" target="_blank">Профиль фотографа</a>
                `;
                addToHistory(photo);
            } else {
                console.error('Не удалось получить фото: нет данных');
            }
        } catch (error) {
            console.error('Ошибка загрузки фото:', error);
        }
    }

    // Функция для добавления фото в историю
    function addToHistory(photo) {
        let history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
        history.unshift({
            src: photo.urls.regular,
            photographer: photo.user.name
        });
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
        updateHistoryDisplay();
    }

    // Функция для обновления отображения истории
    function updateHistoryDisplay() {
        console.log('Обновление истории');
        let history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
        historyElement.innerHTML = ''; // Очистить предыдущие элементы
        history.forEach(item => {
            const img = document.createElement('img');
            img.src = item.src;
            img.alt = 'История фото дня';
            img.style.width = '100px';
            img.style.height = 'auto';
            historyElement.appendChild(img);
        });
    }

    // Обработчик кнопки лайка
    likeButton.addEventListener('click', () => {
        likeCount++;
        likeCountElement.textContent = likeCount;
        localStorage.setItem(LOCAL_STORAGE_KEY, likeCount);
    });

    // Обработчик кнопки просмотра предыдущих фото
    previousButton.addEventListener('click', () => {
        console.log('Кнопка "Просмотр предыдущих фото" нажата');
        historyElement.classList.toggle('hidden');
    });

    loadRandomPhoto();
});
