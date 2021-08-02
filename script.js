let counter1 = 0;
let counter2 = 1;
let bool = true;
let navClick = false;
const sections = document.querySelectorAll(".section");
Array.from(sections).forEach((section) => console.log(section.classList[1]));
const section1wrapper = document.querySelector(".section-1-wrapper");
const section5wrapper = document.querySelector(".section-5-wrapper");
const leftBtn = document.querySelector(".left-btn");
const rightBtn = document.querySelector(".right-btn");
const progress = document.querySelector(".progress h2");
const circles = document.querySelectorAll(".circle");
document.querySelector(".circle-1").style.backgroundColor = "#d50000";
section1wrapper.style.transform = "scale(1)";
// PROGRESS
const progressController = () => {
  progress.textContent = `${counter2}/${sections.length}`;

  Array.from(circles).forEach((circle) => {
    circle.style.backgroundColor = "transparent";
  });

  document.querySelector(`.circle-${counter2}`).style.backgroundColor =
    "#d50000";
};
// SCROLL

console.log(sections);

const pageController = () => {
  bool = true;
  if (counter1 === 5) {
    Array.from(sections).forEach((section) => {
      section.style.left = "0";
    });
    counter1 = 0;
    counter2 = 1;
    section1wrapper.style.transform = "scale(1)";
    section5wrapper.style.transform = "scale(1.5)";
    progressController();
    bool = false;
  }
  if (counter1 === -1) {
    Array.from(sections).forEach((section) => {
      if (section.classList[1] === "section-5") {
        return;
      }

      section.style.left = "-100vw";
    });

    counter1 = 4;
    counter2 = 5;
    section1wrapper.style.transform = "scale(1.5)";
    section5wrapper.style.transform = "scale(1)";

    document.querySelector(`.section-${counter2}`).style.left = 0;
    progressController();
    bool = false;
  }
  progressController();
  return bool;
};

window.addEventListener("wheel", (e) => {
  const deltaY = e.deltaY > 0;
  if (deltaY > 0) {
    counter1++;
    counter2++;
  } else {
    counter1--;
    counter2--;
  }

  pageController();
  progressController();
  if (bool) {
    const deltaCounterSelector = document.querySelector(
      `.section-${deltaY ? counter1 : counter2}`
    );
    console.log(deltaCounterSelector);
    deltaCounterSelector.style.left = `${deltaY ? "-100vw" : "0"}`;
    document.querySelector(
      `.section-${deltaY ? counter1 : counter2}-wrapper`
    ).style.transform = `scale(${deltaY ? "1.5" : "1"})`;
    document.querySelector(
      `.section-${deltaY ? counter1 + 1 : counter2 + 1}-wrapper`
    ).style.transform = `scale(${deltaY ? "1" : "1.5"})`;

    if (navClick) {
      const deltaCounterSelector2 = document.querySelector(
        `.section-${deltaY ? counter2 : counter1}`
      );
      if (!deltaCounterSelector2) return;
      deltaCounterSelector2.style.left = `${deltaY ? "0" : "-100vw"}`;
    }
  }
});

// BUTTONS
leftBtn.addEventListener("click", function () {
  counter1--;
  counter2--;

  pageController() &&
    (document.querySelector(`.section-${counter2}`).style.left = 0);
  if (bool) {
    console.log("1:", counter1, "2", counter2);

    document.querySelector(`.section-${counter2}-wrapper`).style.transform =
      "scale(1)";
    document.querySelector(`.section-${counter2 + 1}-wrapper`).style.transform =
      "scale(1.5)";
  }
});

rightBtn.addEventListener("click", function () {
  counter1++;
  counter2++;

  pageController() &&
    (document.querySelector(`.section-${counter1}`).style.left = "-100vw");
  if (bool) {
    console.log("1:", counter1, "2", counter2);
    document.querySelector(`.section-${counter2}`).style.left = "0";
    document.querySelector(`.section-${counter1}-wrapper`).style.transform =
      "scale(1.5)";
    document.querySelector(`.section-${counter1 + 1}-wrapper`).style.transform =
      "scale(1)";
  }
});

// hamburguer menu
const menu = document.querySelector(".menu");
const navbar = document.querySelector(".navbar");
menu.addEventListener("click", () => {
  navbar.classList.toggle("change");
});

// navlinks
navbar.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("navlink")) {
    const sectionNumber = Number(e.target.dataset.section);

    counter2 = sectionNumber;
    counter1 = sectionNumber - 1;
    console.log("1:", counter1, "2", counter2);
    progressController();
    if (!pageController()) return;
    document.querySelectorAll(".section").forEach((section) => {
      section.style.left = "-100vw";
    });
    const sectionSelected = document.querySelector(`.section-${sectionNumber}`);
    const wrapperSelected = document.querySelector(
      `.section-${sectionNumber}-wrapper`
    );

    sectionSelected.style.left = "0";
    wrapperSelected.style.transform = "scale(1)";
    navClick = true;
  }
});
