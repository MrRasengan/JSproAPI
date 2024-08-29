// Вашей задачей является создание веб-слайдера для отображения изображений на веб-странице. Слайдер должен позволять переключаться между изображениями и отображать их в центре экрана.

// 1. Создайте интерфейс веб-страницы, который включает в себя следующие элементы:

// a. Контейнер для отображения текущего изображения.
// b. Кнопки "Предыдущее изображение" и "Следующее изображение" для переключения между изображениями.
// c. Навигационные точки (индикаторы) для быстрого переключения между изображениями.

// 2. Используйте HTML для создания элементов интерфейса.

// 3. Используйте JavaScript для обработки событий:

// a. При клике на кнопку "Предыдущее изображение" должно отображаться предыдущее изображение.
// b. При клике на кнопку "Следующее изображение" должно отображаться следующее изображение.
// c. При клике на навигационные точки, слайдер должен переключаться к соответствующему изображению.

// 4. Слайдер должен циклически переключаться между изображениями, то есть после последнего изображения должно отображаться первое, и наоборот.

// 5. Добавьте стилизацию для слайдера и элементов интерфейса с использованием CSS для улучшения внешнего вида.

// Массив с изображениями
const images = [
	"https://via.placeholder.com/800x600",
	"https://via.placeholder.com/800x600/0000FF",
	"https://via.placeholder.com/800x600/FF0000",
	"https://via.placeholder.com/800x600/00FF00",
];

// Получаем необходимые элементы
const sliderImage = document.querySelector(".slider-image");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const sliderNav = document.querySelector(".slider-nav");



let currentIndex = 0; // Индекс текущего изображения

// Функция для отображения текущего изображения
function displayCurrentImage() {
	sliderImage.classList.add("fade-out");
	setTimeout(() => {
	sliderImage.src = images[currentIndex];
	sliderImage.classList.remove("fade-out");
	updateNavigation();
	}, 500);
	}

// Функция для обновления навигационных точек
function createNavigationDots() {
	for (let i = 0; i < images.length; i++) {
	const dot = document.createElement("span");
	dot.classList.add("dot");
	dot.addEventListener("click", () => {
	currentIndex = i;
	displayCurrentImage();
	});
	sliderNav.appendChild(dot);
	}
	}

	function updateNavigation() {
	const dots = sliderNav.querySelectorAll(".dot");
	dots.forEach(dot => dot.classList.remove("active"));
	dots[currentIndex].classList.add("active");
	}

	createNavigationDots();

// Обработчик события клика на кнопку "Предыдущее изображение"
prevBtn.addEventListener("click", () => {
	currentIndex = (currentIndex - 1 + images.length) % images.length; // Циклическое переключение
	displayCurrentImage();
});

// Обработчик события клика на кнопку "Следующее изображение"
nextBtn.addEventListener("click", () => {
	currentIndex = (currentIndex + 1) % images.length; // Циклическое переключение
	displayCurrentImage();
});

// Отображаем первое изображение
displayCurrentImage();
