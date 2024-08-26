// Задание 1
// Вам необходимо создать навигационное меню для веб-сайта, в
// котором меняется активный пункт при клике без фактического
// перехода на другие страницы. Меню должно обладать следующими
// характеристиками:
// 1. Подсветка активного пункта: При клике на пункт меню он
// должен становиться активным, и для активного пункта должен
// применяться определенный стиль (например, изменение цвета
// фона). Если выбрать другой пункт, предыдущий должен
// перестать быть активным.
// 2. Эффекты наведения: При наведении курсора на пункты меню
// должны применяться эффекты (например, изменение цвета
// текста или фона) для подсказки пользователю, что пункт меню
// является интерактивным.

// Получаем все ссылки в меню
const navLinks = document.querySelectorAll("nav a");

// Добавляем обработчик клика на каждую ссылку
navLinks.forEach((link) => {
	link.addEventListener("click", (event) => {
		// Предотвращаем переход по ссылке
		event.preventDefault();

		// Убираем класс "active" у всех ссылок
		navLinks.forEach((l) => l.classList.remove("active"));

		// Добавляем класс "active" к текущей ссылке
		event.target.classList.add("active");
	});
});

// Задание 2
// Создайте простое модальное окно, которое появляется при клике на кнопку "Открыть
// модальное окно" и закрывается при клике на кнопку "Закрыть". Модальное окно
// должно содержать заголовок "Модальное окно" и кнопку для закрытия.
// * Модальное окно должно плавно появляться и исчезать при открытии и закрытии.

// Получаем кнопку для открытия модального окна
const openModalButton = document.getElementById("openModal");

// Получаем модальное окно и кнопку закрытия
const modal = document.getElementById("modal");
const closeButton = document.getElementsByClassName("close")[0];

// Добавляем обработчики событий для открытия и закрытия модального окна
openModalButton.addEventListener("click", () => {
	modal.style.display = "block";
});

closeButton.addEventListener("click", () => {
	modal.style.display = "none";
});

// Закрываем модальное окно при клике вне его
window.addEventListener("click", (event) => {
	if (event.target == modal) {
		modal.style.display = "none";
	}
});

// Задание 3
// У вас есть кнопка "Купить". Создайте скрипт, который при клике на эту кнопку меняет её текст на "Товар
// добавлен в корзину" в течение 2 секунд, а затем возвращает исходный текст "Купить". В обработчике
// события клика также проверьте, является ли событие доверенным. Если событие является доверенным,
// выполните изменение текста кнопки и убедитесь, что после 2 секунд текст возвращается в исходное
// состояние.

// Получаем кнопку 'Купить'
const buyButton = document.getElementById('buyButton');

// Добавляем обработчик события клика на кнопку
buyButton.addEventListener('click', (event) => {
  // Проверяем, является ли событие доверенным
  if (event.isTrusted) {
    // Меняем текст кнопки на 'Товар добавлен в корзину'
    buyButton.textContent = 'Товар добавлен в корзину';

    // Используем setTimeout(), чтобы вернуть текст кнопки в исходное состояние через 2 секунды
    setTimeout(() => {
      buyButton.textContent = 'Купить';
    }, 2000);
  }
});

// Задание 4
// Вам предоставляется задача создать простой онлайн опросник, который позволяет пользователям
// отвечать на вопросы с вариантами ответов. Ваша задача - разработать интерфейс и функциональность
// для этого опросника, используя HTML, CSS и JavaScript.
// 1. Создайте интерфейс с несколькими вопросами и вариантами ответов. Каждый вопрос должен
// иметь несколько вариантов ответов.
// 2. Реализуйте обработку событий, чтобы пользователи могли выбирать варианты ответов.
// 3. Добавьте кнопку "Завершить опрос", которая будет показывать результаты опроса.
// 4. При нажатии на кнопку "Завершить опрос", вы должны проверить, что пользователь ответил на все
// вопросы, и отобразить выбранные им варианты ответов.
// 5. Если пользователь не ответил на все вопросы, покажите ему сообщение о необходимости ответить
// на все вопросы перед завершением опроса.
// 6. По желанию можно добавить стилизацию опросника с использованием CSS для лучшего
// пользовательского опыта.

// Получаем форму и кнопку "Завершить опрос"
const form = document.getElementById('questionnaire');
const submitButton = document.querySelector('.submit-button');
const resultDiv = document.getElementById('result');
const answersDiv = document.getElementById('answers');

// Добавляем обработчик события клика на кнопку "Завершить опрос"
submitButton.addEventListener('click', () => {
  // Получаем выбранные ответы
  const answers = getSelectedAnswers();

  // Проверяем, что на каждый вопрос есть хотя бы один ответ
  if (hasAnsweredAllQuestions(answers)) {
    // Отображаем результаты опроса
    showResults(answers);
  } else {
    alert('Пожалуйста, ответьте на все вопросы перед завершением опроса.');
  }
});

function getSelectedAnswers() {
  // Получаем все радиокнопки в форме
  const radioButtons = form.querySelectorAll('input[type="radio"]');

  // Создаем массив выбранных ответов
  const selectedAnswers = [];

  // Перебираем все радиокнопки и добавляем выбранные ответы в массив
  radioButtons.forEach((radioButton) => {
    if (radioButton.checked) {
      selectedAnswers.push(radioButton.value);
    }
  });

  return selectedAnswers;
}

function hasAnsweredAllQuestions(answers) {
  // Получаем все вопросы в форме
  const questions = form.querySelectorAll('.question');

  // Проверяем, что на каждый вопрос есть хотя бы один ответ
  return answers.length === questions.length;
}

function showResults(answers) {
  // Очищаем блок для отображения результатов
  answersDiv.innerHTML = '';

  // Отображаем выбранные ответы
  answers.forEach((answer, index) => {
    const questionNumber = index + 1;
    let questionText;
    let answerText;

    // Определяем текст вопроса и ответа на русском языке
    switch (index) {
      case 0:
        questionText = 'Какое ваше любимое время года?';
        switch (answer) {
          case 'spring':
            answerText = 'Весна';
            break;
          case 'summer':
            answerText = 'Лето';
            break;
          case 'autumn':
            answerText = 'Осень';
            break;
          case 'winter':
            answerText = 'Зима';
            break;
        }
        break;
      case 1:
        questionText = 'Какой ваш любимый цвет?';
        switch (answer) {
          case 'red':
            answerText = 'Красный';
            break;
          case 'blue':
            answerText = 'Синий';
            break;
          case 'green':
            answerText = 'Зеленый';
            break;
          case 'yellow':
            answerText = 'Желтый';
            break;
        }
        break;
    }

    const answerElement = document.createElement('div');
    answerElement.textContent = `Вопрос ${questionNumber}: ${answerText}`;
    answersDiv.appendChild(answerElement);
  });

  // Показываем блок с результатами
  resultDiv.style.display = 'block';
}