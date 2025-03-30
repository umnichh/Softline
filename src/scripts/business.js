const cards = document.querySelectorAll(".business__card");

cards.forEach((card) => {
  const textWrapper = card.querySelector(".business__wrapper");
  let isMobile = window.innerWidth <= 1170;
  const arrow = card.querySelector(".business__arrow-down");

  const mouseOverHandler = () => {
    textWrapper.classList.add("business__wrapper--active");
  };
  const mouseOutHandler = () => {
    textWrapper.classList.remove("business__wrapper--active");
  };
  const clickHandler = () => {
    card.classList.toggle("business__card--active");
    arrow.classList.toggle("business__arrow-down--active");
  };

  function resetClasses() {
    textWrapper.classList.remove("business__wrapper--active");
    card.classList.remove("business__card--active");
  }

  function setupListeners() {
    card.removeEventListener("mouseover", mouseOverHandler);
    card.removeEventListener("mouseout", mouseOutHandler);
    card.removeEventListener("click", clickHandler);

    resetClasses();

    if (isMobile) {
      card.addEventListener("click", clickHandler);
    } else {
      card.addEventListener("mouseover", mouseOverHandler);
      card.addEventListener("mouseout", mouseOutHandler);
    }
  }

  setupListeners();
  let resizeTimeout;
  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const newIsMobile = window.innerWidth <= 1170;
      if (newIsMobile !== isMobile) {
        isMobile = newIsMobile;
        setupListeners();
      }
    }, 100);
  };

  window.addEventListener("resize", handleResize);

  card._cleanup = () => {
    window.removeEventListener("resize", handleResize);
    resetClasses();
  };
});
