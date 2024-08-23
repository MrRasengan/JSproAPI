// Задание 1

// Работа с BOM
// 1. Определение текущего размера окна браузера:
// ○ Напишите функцию, которая будет выводить текущую
// ширину и высоту окна браузера при его изменении.
// 2. Подтверждение закрытия страницы:
// ○ Создайте всплывающее окно или диалоговое окно,
// которое появляется при попытке закрыть вкладку
// браузера и спрашивает пользователя, уверен ли он в
// своем решении закрыть страницу.
// 3. Управление историей переходов:
// ○ Используйте объект history для управления историей
// переходов на веб-странице. Создайте кнопки "Назад" и
// "Вперед" для перемещения по истории.

// Определение текущего размера окна браузера:

// Функция, которая выводит в консоль текущую ширину и высоту окна браузера
function getWindowSize() {
  console.log(`Ширина окна: ${window.innerWidth}px`);
  console.log(`Высота окна: ${window.innerHeight}px`);
}

// Добавляем обработчик события "resize" (изменение размера окна)
// При изменении размера окна будет вызвана функция getWindowSize()
window.addEventListener('resize', getWindowSize);

// Вызываем функцию getWindowSize() при загрузке страницы
getWindowSize();

// Подтверждение закрытия страницы:

// Добавляем обработчик события "beforeunload" (перед закрытием страницы)
window.addEventListener('beforeunload', function(event) {
  // Предотвращаем стандартное поведение закрытия страницы
  event.preventDefault();
  // Устанавливаем значение, которое будет отображаться в диалоговом окне
  event.returnValue = '';
});

// Управление историей переходов:

// Получаем ссылки на кнопки "Назад" и "Вперед"
const backButton = document.getElementById('back');
const forwardButton = document.getElementById('forward');

// Добавляем обработчики клика на кнопки
backButton.addEventListener('click', () => {
  // При клике на кнопку "Назад" вызываем window.history.back()
  // Это перемещает пользователя на предыдущую страницу в истории
  window.history.back();
});

forwardButton.addEventListener('click', () => {
  // При клике на кнопку "Вперед" вызываем window.history.forward()
  // Это перемещает пользователя на следующую страницу в истории
  window.history.forward();
});

// Задание 2

// Вы должны создать веб-страницу, которая позволяет пользователю динамически
// управлять элементами на странице. Ниже приведены основные требования и
// функциональность:
// 1. На странице должны быть кнопки "Добавить элемент", "Удалить элемент" и
// "Клонировать элемент".
// 2. При нажатии на кнопку "Добавить элемент" на страницу добавляется новый
// квадратный элемент (<div>) с размерами 100x100 пикселей. Этот элемент
// должен иметь класс .box и содержать текст, указывающий порядковый номер
// элемента (1, 2, 3 и так далее).
// 3. При нажатии на кнопку "Удалить элемент" удаляется последний добавленный
// элемент, если таковой имеется.
// 4. При нажатии на кнопку "Клонировать элемент" создается копия последнего
// добавленного элемента и добавляется на страницу.
// 5. Все элементы имеют класс .box и стилизованы с помощью CSS (см. пример).
// 6. Элементы могут быть добавлены, удалены и клонированы в любом порядке и в
// любом количестве.

const addBtn = document.getElementById('add-btn');
const removeBtn = document.getElementById('remove-btn');
const cloneBtn = document.getElementById('clone-btn');
const elementsContainer = document.getElementById('elements-container');

let elementCount = 0;

// Функция для создания нового элемента
function createElement() {
  const newElement = document.createElement('div');
  newElement.classList.add('box');
  newElement.textContent = `Элемент ${++elementCount}`;
  elementsContainer.appendChild(newElement);
}

// Обработчик события клика на кнопку "Добавить элемент"
addBtn.addEventListener('click', createElement);

// Обработчик события клика на кнопку "Удалить элемент"
removeBtn.addEventListener('click', () => {
  const elements = elementsContainer.children;
  if (elements.length > 0) {
    elementsContainer.removeChild(elements[elements.length - 1]);
    elementCount--;
  }
});

// Обработчик события клика на кнопку "Клонировать элемент"
cloneBtn.addEventListener('click', () => {
  const elements = elementsContainer.children;
  if (elements.length > 0) {
    const lastElement = elements[elements.length - 1];
    const clonedElement = lastElement.cloneNode(true);
    elementsContainer.appendChild(clonedElement);
    elementCount++;
  }
});

// Задание 3

// 1. Вы создаете веб-страницу для отображения списка статей. Каждая статья состоит из заголовка и
// текста. Вам необходимо использовать Bootstrap для стилизации элементов.
// 2. Используйте Bootstrap, чтобы стилизовать элементы:
// a. Заголовок статьи (<h2>)
// b. Текст статьи (<p>)
// c. Кнопки "Добавить статью", "Удалить" и "Редактировать".
// 3. Создайте начальный список статей, который будет загружаться при загрузке страницы. Используйте
// JSON-данные для определения заголовков и текстов статей.
// 4. Позвольте пользователю добавлять новые статьи. При нажатии на кнопку "Добавить статью" должна
// появиться новая статья с заголовком "Новая статья" и текстом "Введите содержание статьи...".
// 5. Реализуйте функциональность удаления статей. При нажатии на кнопку "Удалить" соответствующая
// статья должна быть удалена из списка.
// 6. Реализуйте функциональность редактирования статей. При нажатии на кнопку "Редактировать"
// пользователь должен иметь возможность изменить заголовок и текст статьи. Используйте
// всплывающее окно или prompt для ввода новых данных.
// 7. Все изменения (добавление, удаление, редактирование) должны быть сохранены в локальное
// хранилище браузера, чтобы они сохранялись после перезагрузки страницы.

// Получение данных статей из локального хранилища
let articles = JSON.parse(localStorage.getItem('articles')) || [
  {
    title: 'Статья 1',
    content: 'Содержание статьи 1'
  },
  {
    title: 'Статья 2',
    content: 'Содержание статьи 2'
  },
  {
    title: 'Статья 3',
    content: 'Содержание статьи 3'
  }
];

const articlesContainer = document.getElementById('articles-container');
const addArticleBtn = document.getElementById('add-article-btn');
const editArticleModal = document.getElementById('editArticleModal');
const editTitleInput = document.getElementById('edit-article-title');
const editContentTextarea = document.getElementById('edit-article-content');
const saveChangesBtn = document.getElementById('save-changes-btn');

let currentEditIndex = null;

// Функция для создания и отображения статьи
function createArticle(article, index) {
  const articleElement = document.createElement('div');
  articleElement.classList.add('card', 'mb-3');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const title = document.createElement('h2');
  title.classList.add('card-title');
  title.textContent = article.title;

  const content = document.createElement('p');
  content.classList.add('card-text');
  content.textContent = article.content;

  const actions = document.createElement('div');
  actions.classList.add('d-flex', 'justify-content-end');

  const editBtn = document.createElement('button');
  editBtn.classList.add('btn', 'btn-warning', 'mr-2');
  editBtn.textContent = 'Редактировать';
  editBtn.addEventListener('click', () => editArticle(index));

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('btn', 'btn-danger');
  deleteBtn.textContent = 'Удалить';
  deleteBtn.addEventListener('click', () => deleteArticle(index));

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  cardBody.appendChild(title);
  cardBody.appendChild(content);
  cardBody.appendChild(actions);

  articleElement.appendChild(cardBody);
  articlesContainer.appendChild(articleElement);
}

// Функция для добавления новой статьи
function addArticle() {
  const newArticle = {
    title: 'Новая статья',
    content: 'Введите содержание статьи...'
  };
  articles.push(newArticle);
  saveArticles();
  createArticle(newArticle, articles.length - 1);
}

// Функция для удаления статьи
function deleteArticle(index) {
  articles.splice(index, 1);
  saveArticles();
  articlesContainer.innerHTML = '';
  renderArticles();
}

// Функция для редактирования статьи
function editArticle(index) {
  currentEditIndex = index;
  editTitleInput.value = articles[index].title;
  editContentTextarea.value = articles[index].content;
  $(editArticleModal).modal('show');
}

// Функция для сохранения изменений в статье
function saveArticleChanges() {
  articles[currentEditIndex].title = editTitleInput.value;
  articles[currentEditIndex].content = editContentTextarea.value;
  saveArticles();
  $(editArticleModal).modal('hide');
  articlesContainer.innerHTML = '';
  renderArticles();
}

// Функция для сохранения статей в локальное хранилище
function saveArticles() {
  localStorage.setItem('articles', JSON.stringify(articles));
}

// Функция для отображения всех статей
function renderArticles() {
  articles.forEach((article, index) => {
    createArticle(article, index);
  });
}

// Инициализация
addArticleBtn.addEventListener('click', addArticle);
saveChangesBtn.addEventListener('click', saveArticleChanges);
renderArticles();

