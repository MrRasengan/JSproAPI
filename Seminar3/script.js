// Задание 1
// Вы разрабатываете интернет-магазин и хотите добавить
// функциональность динамического фильтрации товаров по
// категориям. У вас есть форма с выпадающим списком (select), в
// котором пользователь может выбрать категорию товаров. При выборе
// категории товаров, необходимо динамически обновлять список
// отображаемых товаров на странице, чтобы пользователь видел
// только товары из выбранной категории.
// 1. Создайте интерфейс веб-страницы, который включает в себя
// следующие элементы:
// a. Выпадающий список (select) с категориями товаров.
// b. Список товаров, который будет отображать товары в
// соответствии с выбранной категорией.
// c. Каждый товар в списке должен содержать название и
// категорию.
// 2. Используйте HTML для создания элементов интерфейса.
// 3. Используйте JavaScript для обработки событий:
// ○ При выборе категории товаров в выпадающем списке, форма
// должна следить за изменениями.
// ○ Динамически обновите список товаров на странице, чтобы
// отображать только товары из выбранной категории.
// 4. Создайте объекты товаров и их категорий для имитации данных магазина.
// 5. Стилизуйте элементы интерфейса с помощью CSS для улучшения
// внешнего вида.

// Имитация данных магазина
const products = [
	{ name: "Смартфон", category: "electronics" },
	{ name: "Наушники", category: "electronics" },
	{ name: "Куртка", category: "clothing" },
	{ name: "Футболка", category: "clothing" },
	{ name: "Роман", category: "books" },
	{ name: "Учебник", category: "books" },
];

// Функция для обновления списка товаров
function updateProductList(category) {
	const productList = document.getElementById("product-list");
	productList.innerHTML = "";

	const filteredProducts = category === "all" ? products : products.filter((product) => product.category === category);

	filteredProducts.forEach((product) => {
		const li = document.createElement("li");
		li.textContent = product.name;
		productList.appendChild(li);
	});
}

// Обработчик изменения выбора категории
document.getElementById("category-select").addEventListener("change", (event) => {
	const selectedCategory = event.target.value;
	updateProductList(selectedCategory);
});

// Инициализация списка товаров при загрузке страницы
window.onload = () => {
	updateProductList("all");
};

// Задание 2. Бесконечная лента фотографий
// Для создания бесконечной ленты с фотографиями с использованием Unsplash API, выполните следующие
// шаги:
// 1. Зарегистрируйтесь на Unsplash:
// ○ Перейдите на веб-сайт Unsplash (https://unsplash.com/).
// ○ Нажмите кнопку "Join" или "Регистрация", чтобы создать аккаунт, если у вас его еще нет.
// ○ Войдите в свой аккаунт Unsplash.
// 2. Создайте приложение:
// ○ После входа в аккаунт Unsplash, перейдите на страницу разработчика Unsplash
// (https://unsplash.com/developers).
// ○ Нажмите "New Application" (Новое приложение).
// ○ Заполните информацию о вашем приложении, такую как имя, описание и сайт (вы можете
// использовать http://localhost для тестового сайта).
// ○ После заполнения информации, нажмите "Create Application" (Создать приложение).
// 3. Получите API-ключ:
// ○ После создания приложения, вы получите API-ключ. Этот ключ будет
// отображаться в вашей панели управления приложением.
// ○ API-ключ представляет собой строку вида YOUR_ACCESS_KEY.
// Скопируйте его.
// 4. Измените код HTML и JavaScript:
// ○ Откройте вашу HTML-страницу в текстовом редакторе или
// интегрированной среде разработки.
// ○ Замените 'YOUR_ACCESS_KEY' в коде JavaScript на ваш собственный
// API-ключ.

const photoGallery = document.getElementById("photo-gallery");
const loading = document.getElementById("loading");

const API_KEY = "gPokICWKTmi35iVU5His8pj52JcO8QFVkXA4_6seKC0";
const API_URL = "https://api.unsplash.com/photos";
const PER_PAGE = 10;

let page = 1;
let isLoading = false;
let isEnd = false;

// Функция для загрузки фотографий
async function loadPhotos() {
	if (isLoading || isEnd) return;

	isLoading = true;
	loading.style.display = "block";

	try {
		const response = await fetch(`${API_URL}?page=${page}&per_page=${PER_PAGE}&client_id=${API_KEY}`);
		const photos = await response.json();

		if (photos.length === 0) {
			isEnd = true;
		} else {
			photos.forEach((photo) => {
				const img = document.createElement("img");
				img.src = photo.urls.regular;
				img.alt = photo.alt_description || "Фото";
				photoGallery.appendChild(img);
			});
			page++;
		}
	} catch (error) {
		console.error("Ошибка загрузки фотографий:", error);
	} finally {
		isLoading = false;
		loading.style.display = "none";
	}
}

// Функция для проверки, достигли ли мы низа страницы
function handleScroll() {
	const scrollPosition = window.innerHeight + window.scrollY;
	const threshold = document.documentElement.scrollHeight - 100;

	if (scrollPosition >= threshold) {
		loadPhotos();
	}
}

// Событие скроллинга
window.addEventListener("scroll", handleScroll);

// Инициализация загрузки фотографий при загрузке страницы
window.onload = loadPhotos;
