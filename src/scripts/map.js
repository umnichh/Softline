import { mapPoints } from "./mapPoints";

const map = document.querySelector(".map__container");
const openDialog = document.querySelector(".map__open-dialog");
const dialogContainer = document.querySelector(".map__dialog-container");
const dialog = document.querySelector(".map__dialog");
const arrow = document.querySelector(".map__arrow-down");

//Коэффициент уменьшенной картинки на мобилке
let CROP_COEFFICIENT = 1.38051044084;

const buttons = document.querySelectorAll(".map__button");
let dialogButtons = document.querySelectorAll(".map__list-item--bold");
let containers = document.querySelectorAll(".map__list-container");
let smallArrows = document.querySelectorAll(".map__small-arrow");

let isMobile = window.innerWidth <= 1170;

let cities = [...mapPoints];

// отрисовка точека на карте
renderMap();
function renderMap() {
  for (let i = 0; i < cities.length; i++) {
    const newPoint = document.createElement("div");
    const cityName = document.createElement("span");
    const circle = document.createElement("div");

    if (isMobile) {
      newPoint.style = `
        position: absolute; 
        top: ${cities[i].y / CROP_COEFFICIENT}px; 
        left: ${cities[i].x / CROP_COEFFICIENT}px;
        `;
    } else {
      newPoint.style = `position: absolute; top: ${cities[i].y}px; left: ${cities[i].x}px;`;
    }
    circle.style =
      "width: 8px; height: 8px; border-radius: 100%; background: rgb(68, 68, 68);";
    cityName.style = `font-size: ${cities[i].fontSize}px`;

    newPoint.classList.add("map__point");
    cityName.classList.add("map__city");
    cityName.textContent = cities[i].city;

    //только у Санкт-Петербурга gap: 4px
    if (cities[i].city != "Санкт-Перербург") {
      newPoint.classList.add("map__point--2px");
    } else {
      newPoint.classList.add("map__poitn--4px");
    }

    //порядок рисовки в зависимости от позиции названия город относитлеьно точки
    if (cities[i].position === "under") {
      newPoint.appendChild(circle);
      newPoint.appendChild(cityName);
    } else {
      newPoint.appendChild(cityName);
      newPoint.appendChild(circle);
    }

    map.appendChild(newPoint);
  }
}

//сброс стилей и карты под мобилку
window.addEventListener("resize", () => {
  const newIsMobile = window.innerWidth <= 1170;
  if (newIsMobile !== isMobile) {
    isMobile = newIsMobile;
    let isCrop = true;
    clearMap(isCrop);
    renderMap();
    clearStyles();
  }
});

// ивенты при нажатии кнопок в хэдере карты
buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    if (event.currentTarget.dataset.map === "all") {
      cities = [...mapPoints];
    } else {
      cities = mapPoints.filter(
        (item) => item.map === event.currentTarget.dataset.map
      );
    }

    clearMap();
    renderMap();

    const underline = document.createElement("div");
    button.classList.add("map__button--active");
    underline.classList.add("map__underline");
    button.appendChild(underline);
  });
});

//Офисы Softline
dialogButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    for (let i = 0; i < containers.length; i++) {
      if (containers[i].dataset.id == index) {
        containers[i].classList.toggle("map__list-container--active");
        button.classList.toggle("map__list-item--active");
        smallArrows[i + 1].classList.toggle("map__small-arrow--active");
      }
    }
  });
});

// окно с городами
openDialog.addEventListener("click", () => {
  arrow.classList.toggle("map__arrow-down--rotate");
  dialogContainer.classList.toggle("map__dialog-container--active");
  dialog.classList.toggle("map__dialog--active");
  map.classList.toggle("map__container--opacity");

  if (dialogContainer.classList.contains("map__dialog-container--active")) {
    buttons.forEach((button) => {
      button.classList.add("map__button--opacity");
    });
  } else {
    buttons.forEach((button) => {
      button.classList.remove("map__button--opacity");
    });
  }
});

//сброс стилей
function clearStyles() {
  for (let i = 0; i < containers.length; i++) {
    containers[i].classList.remove("map__list-container--active");
    dialogButtons[i].classList.remove("map__list-item--active");
    smallArrows[i + 1].classList.remove("map__small-arrow--active");
  }
}
//чистка карты, подсветки текста, подчеркиваний
function clearMap(isCrop) {
  if (!isCrop) {
    const buttons = document.querySelectorAll(".map__button");
    buttons.forEach((button) => button.classList.remove("map__button--active"));

    const underlines = document.querySelectorAll(".map__underline");
    underlines.forEach((underline) => underline.remove());

    isCrop = false;
  }
  const oldPoints = document.querySelectorAll(".map__point");
  oldPoints.forEach((point) => point.remove());
}
