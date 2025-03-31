import { sliderImages } from "./sliderImages";

const container = document.querySelector(".slider__content");
const leftButton = document.querySelector(".slider__button-left");
const rightButton = document.querySelector(".slider__button-right");
const indicators = document.querySelectorAll(".slider__indicator");
let currentSlide = 0;

sliderImages.forEach((img) => {
  const image = document.createElement("img");
  image.src = img.src;
  image.alt = `Slide ${img.id}`;
  image.classList.add("slider__image");
  container.appendChild(image);
});

rightButton.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % sliderImages.length;
  updateIndicators();
  updateSlider();
});

leftButton.addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + sliderImages.length) % sliderImages.length;
  updateIndicators();
  updateSlider();
});

indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    currentSlide = index;
    updateSlider();
    updateIndicators();
  });
});

function updateSlider() {
  container.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function updateIndicators() {
  indicators.forEach((indicator, index) => {
    if (index === currentSlide) {
      indicator.classList.add("slider__indicator--active");
    } else {
      indicator.classList.remove("slider__indicator--active");
    }
  });
}
updateIndicators();

let touchStartX = 0;
let touchEndX = 0;

container.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].screenX;
  },
  { passive: true }
);

container.addEventListener(
  "touchend",
  (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  },
  { passive: true }
);

function handleSwipe() {
  const swipeThreshold = 10;

  if (touchStartX - touchEndX > swipeThreshold) {
    goToNextSlide();
    updateIndicators();
  } else if (touchEndX - touchStartX > swipeThreshold) {
    goToPrevSlide();
    updateIndicators();
  }
}

function goToNextSlide() {
  currentSlide = (currentSlide + 1) % sliderImages.length;
  updateSlider();
}

function goToPrevSlide() {
  currentSlide = (currentSlide - 1 + sliderImages.length) % sliderImages.length;
  updateSlider();
}
