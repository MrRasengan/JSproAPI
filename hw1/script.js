// Домашнее задание

// Вы разрабатываете веб-страницу для отображения расписания занятий в спортивном клубе. Каждое занятие имеет название, время проведения, максимальное количество участников и текущее количество записанных участников.

// 1. Создайте веб-страницу с заголовком "Расписание занятий" и областью для отображения занятий.

// 2. Загрузите информацию о занятиях из предоставленных JSON-данных. Каждое занятие должно отображаться на странице с указанием его названия, времени проведения, максимального количества участников и текущего количества записанных участников.

// 3. Пользователь может нажать на кнопку "Записаться" для записи на занятие. Если максимальное количество участников уже достигнуто, кнопка "Записаться" становится неактивной.

// 4. После успешной записи пользователя на занятие, обновите количество записанных участников и состояние кнопки "Записаться".

// 5. Запись пользователя на занятие можно отменить путем нажатия на кнопку "Отменить запись". После отмены записи, обновите количество записанных участников и состояние кнопки.

// 6. Все изменения (запись, отмена записи) должны сохраняться и отображаться в реальном времени на странице.

// 7. При разработке используйте Bootstrap для стилизации элементов.

// Данные о занятиях в формате JSON
const initialClassesData = [
  {
    name: "Йога",
    time: "10:00 - 11:00",
    maxParticipants: 20,
    currentParticipants: 15,
  },
  {
    name: "Фитнес",
    time: "12:00 - 13:00",
    maxParticipants: 15,
    currentParticipants: 12,
  },
  {
    name: "Бокс",
    time: "16:00 - 17:00",
    maxParticipants: 10,
    currentParticipants: 8,
  },
];

// Загрузка данных из localStorage
function loadClassesData() {
  const savedData = localStorage.getItem('classesData');
  if (savedData) {
    return JSON.parse(savedData);
  }
  return initialClassesData;
}

// Сохранение данных в localStorage
function saveClassesData() {
  localStorage.setItem('classesData', JSON.stringify(classesData));
}

// Функция для создания и отображения карточки занятия
function createClassCard(classData) {
  const classCard = document.createElement("div");
  classCard.classList.add("col-md-4", "mb-4");

  const card = document.createElement("div");
  card.classList.add("card");

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const classTitle = document.createElement("h5");
  classTitle.classList.add("card-title");
  classTitle.textContent = classData.name;

  const classTime = document.createElement("p");
  classTime.classList.add("card-text");
  classTime.textContent = `Время: ${classData.time}`;

  const classParticipants = document.createElement("p");
  classParticipants.classList.add("card-text");
  classParticipants.textContent = `Участников: ${classData.currentParticipants}/${classData.maxParticipants}`;

  const registerBtn = document.createElement("button");
  registerBtn.classList.add("btn", "btn-primary");
  registerBtn.textContent = "Записаться";
  registerBtn.disabled = classData.currentParticipants >= classData.maxParticipants;
  registerBtn.addEventListener("click", () => registerForClass(classData));

  const unregisterBtn = document.createElement("button");
  unregisterBtn.classList.add("btn", "btn-danger", "ml-2");
  unregisterBtn.textContent = "Отменить запись";
  unregisterBtn.disabled = classData.currentParticipants <= 0;
  unregisterBtn.addEventListener("click", () => unregisterFromClass(classData));

  cardBody.append(
    classTitle,
    classTime,
    classParticipants,
    registerBtn,
    unregisterBtn,
  );

  card.appendChild(cardBody);
  classCard.appendChild(card);

  return classCard;
}

// Функция для регистрации пользователя на занятие
function registerForClass(classData) {
  if (classData.currentParticipants < classData.maxParticipants) {
    classData.currentParticipants++;
    saveClassesData(); // Сохранение изменений в localStorage
    updateClassCard(classData);
  }
}

// Функция для отмены записи пользователя на занятие
function unregisterFromClass(classData) {
  if (classData.currentParticipants > 0) {
    classData.currentParticipants--;
    saveClassesData(); // Сохранение изменений в localStorage
    updateClassCard(classData);
  }
}

// Функция для обновления карточки занятия
function updateClassCard(classData) {
  const classCard = Array.from(classesContainer.children).find((card) => {
    const classTitle = card.querySelector(".card-title").textContent;
    return classTitle === classData.name;
  });

  const classParticipants = classCard.querySelector(".card-text:nth-child(3)");
  classParticipants.textContent = `Участников: ${classData.currentParticipants}/${classData.maxParticipants}`;

  const registerBtn = classCard.querySelector(".btn-primary");
  const unregisterBtn = classCard.querySelector(".btn-danger");

  registerBtn.disabled = classData.currentParticipants >= classData.maxParticipants;
  unregisterBtn.disabled = classData.currentParticipants <= 0;
}

// Функция для отображения всех занятий
function renderClasses() {
  classesData.forEach((classData) => {
    const classCard = createClassCard(classData);
    classesContainer.appendChild(classCard);
  });
}

// Инициализация
const classesData = loadClassesData();
const classesContainer = document.getElementById("classes-container");
renderClasses();
