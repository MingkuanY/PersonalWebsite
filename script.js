/* COLLAGE */

/* image grayscale effect */

let currentIndex = 1;
let fade = true;

const images = document.querySelectorAll(".collage img");

images.forEach((image) => {
  image.addEventListener(
    "mouseover",
    () => {
      if (fade) {
        let index = 0;
        switch (image.classList[0]) {
          case "csstudent":
            index = 1;
            break;
          case "roadtripper":
            index = 2;
            break;
          case "hornplayer":
            index = 3;
            break;
          case "photographer":
            index = 4;
            break;
          case "rower":
            index = 5;
            break;
        }
        if (image.classList.contains("gray")) {
          image.classList.remove("gray");
        }
        if (currentIndex !== index) {
          fx.setText(phrases[index], 45, 50);
          currentIndex = index;
        }
        images.forEach((otherImage) => {
          if (otherImage !== image && !otherImage.classList.contains("gray")) {
            otherImage.classList.add("gray");
          }
        });
      }
    },
    false
  );
  image.addEventListener(
    "mouseout",
    () => {
      if (fade) {
        if (currentIndex !== 1) {
          fx.setText(phrases[1], 45, 50);
        }
        images.forEach((image) => {
          if (image.classList[0] === "csstudent") {
            image.classList.remove("gray");
          } else if (!image.classList.contains("gray")) {
            image.classList.add("gray");
          }
        });
        currentIndex = 1;
      }
    },
    false
  );
});

/* text scramble effect */

class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "abcdefghjkmnopqrstuvwxy~~~~~~~-----_____[]//#<>";
    this.update = this.update.bind(this);
  }
  setText(newText, startFactor, endFactor) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * startFactor);
      const end = start + Math.floor(Math.random() * endFactor);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = "";
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.24) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

const facet = document.getElementById("facet");
const fx = new TextScramble(facet);
const fxIntro = new TextScramble(document.getElementById("imMingkuan"));

const phrases = [
  "",
  " CS student @ Georgia Tech.",
  " road tripper.",
  " horn player.",
  " photographer.",
  " rower.",
];

// content
const csContent = document.querySelector(".csContent");
const roadtripperContent = document.querySelector(".roadtripperContent");
const hornplayerContent = document.querySelector(".hornplayerContent");
const photographerContent = document.querySelector(".photographerContent");
const rowerContent = document.querySelector(".rowerContent");

// hide states map
const countiesMap = document.getElementById("rtMap");
const countiesBio = document.querySelector(".rtBio");

const statesMap = document.getElementById("rtStates");
const statesBio = document.querySelector(".rtStatesBio");

const countriesMap = document.getElementById("rtCountries");
const countriesBio = document.querySelector(".rtCountriesBio");

// website setup
function setupInitialState() {
  fx.setText(phrases[1], 100, 30);
  images.forEach((image) => {
    if (image.classList.contains("csstudent")) {
      image.classList.remove("gray");
    } else {
      image.classList.add("gray");
    }
  });

  roadtripperContent.style.display = "none";
  hornplayerContent.style.display = "none";
  photographerContent.style.display = "none";
  rowerContent.style.display = "none";

  statesMap.style.display = "none";
  statesBio.style.display = "none";

  countriesMap.style.display = "none";
  countriesBio.style.display = "none";
}

window.addEventListener("load", setupInitialState);

/* MAP */
const colorMap = {
  livedIn: "#ffff33",
  visited2012: "#69c091",
  visited2013: "#69c091",
  visited2014: "#69c091",
  visited2015: "#69c091",
  visited2016: "#69c091",
  visited2018: "#69c091",
  visited2019: "#69c091",
  visited2020: "#69c091",
  visited2021: "#69c091",
  visited2022: "#69c091",
  visited2023: "#69c091",
  visited2024: "#69c091",
  visited2025: "#69c091",
  unvisited: "#013f3f",
};

const countiesCounter = document.querySelector(".countiesCounter");
const statesCounter = document.querySelector(".statesCounter");
const countriesCounter = document.querySelector(".countriesCounter");

const yearCounter = document.querySelector(".yearCounter");

/* map toggle menu */
const rtCountiesButton = document.querySelector(".rtNav .countiesButton");
const rtStatesButton = document.querySelector(".rtNav .statesButton");
const rtCountriesButton = document.querySelector(".rtNav .countriesButton");
const rtAnimation = document.querySelector(".rtAnimation");

let rtSelectedButton = rtCountiesButton;

function updateSelectedButton(selectedButton) {
  rtSelectedButton.classList.remove("rtSelected");
  rtSelectedButton.classList.add("rtUnselected");
  rtSelectedButton = selectedButton;
  loadMap();
  rtSelectedButton.classList.remove("rtUnselected");
  rtSelectedButton.classList.add("rtSelected");
  rtAnimation.style.left = "0";
}

rtCountiesButton.addEventListener("click", function () {
  updateSelectedButton(rtCountiesButton);
  rtAnimation.style.left = "0";
});

rtStatesButton.addEventListener("click", function () {
  updateSelectedButton(rtStatesButton);
  rtAnimation.style.left = "12rem";
});

rtCountriesButton.addEventListener("click", function () {
  updateSelectedButton(rtCountriesButton);
  rtAnimation.style.left = "24rem";
});

let mapTimeouts = [];

function loadMap() {
  resetMap();

  if (rtSelectedButton == rtCountiesButton) {
    /* counties map */
    countiesMap.style.display = "block";
    countiesBio.style.display = "block";

    fetch("../assets/roadtripper/MyTravels.json")
      .then((response) => response.json())
      .then((myTravels) => {
        let counter = 0;
        let countiesCount = 0;

        Object.keys(myTravels).forEach((key) => {
          const { label, counties } = myTravels[key];

          counties.forEach(({ name, visitDate, countyName }, index) => {
            let pause = name === "Fulton__GA" ? 205 : counter++;
            const timeoutId = setTimeout(() => {
              let year = new Date(visitDate).getFullYear();
              yearCounter.textContent = year;
              const element = document.getElementById(name);
              if (element) {
                element.style.fill = colorMap[key];
              }
              countiesCount++;
              countiesCounter.textContent = countiesCount;
            }, 400 + 20 * pause);
            mapTimeouts.push(timeoutId);
          });
        });
      });
  } else if (rtSelectedButton == rtStatesButton) {
    /* states map */
    statesMap.style.display = "block";
    statesBio.style.display = "block";

    fetch("../assets/roadtripper/MyStates.json")
      .then((response) => response.json())
      .then((myTravels) => {
        let counter = 0;
        let statesCount = 0;

        Object.keys(myTravels).forEach((key) => {
          const { label, states } = myTravels[key];

          states.forEach(({ name, visitDate, stateName }, index) => {
            let pause = counter++;
            const timeoutId = setTimeout(() => {
              let year = new Date(visitDate).getFullYear();
              yearCounter.textContent = year;
              const element = document.getElementById(name);
              if (element) {
                element.style.fill = colorMap[key];
              }
              if (name !== "DC") {
                statesCount++;
              }
              statesCounter.textContent = statesCount;
            }, 200 + 200 * pause);
            mapTimeouts.push(timeoutId);
          });
        });
      });
  } else {
    /* countries map */
    countriesMap.style.display = "block";
    countriesBio.style.display = "block";

    fetch("../assets/roadtripper/MyCountries.json")
      .then((response) => response.json())
      .then((myTravels) => {
        let counter = 0;
        let countriesCount = 0;

        Object.keys(myTravels).forEach((key) => {
          const { label, countries } = myTravels[key];

          countries.forEach(({ name, visitDate, countryName }, index) => {
            let pause = counter++;
            const timeoutId = setTimeout(() => {
              let year = new Date(visitDate).getFullYear();
              yearCounter.textContent = year;
              const element = document.getElementById(name);
              if (element) {
                element.style.fill = colorMap[key];
              }
              countriesCount++;
              countriesCounter.textContent = countriesCount;
            }, 200 + 250 * pause);
            mapTimeouts.push(timeoutId);
          });
        });
      });
  }
}

function resetMap() {
  document.querySelectorAll("#rtMap > path").forEach((county) => {
    county.style.fill = colorMap["unvisited"];
  });
  document.querySelectorAll("#rtStates > g > path").forEach((state) => {
    state.style.fill = colorMap["unvisited"];
  });
  document.querySelectorAll("#rtCountries > g > path").forEach((country) => {
    country.style.fill = colorMap["unvisited"];
  });

  countiesCounter.textContent = 0;
  statesCounter.textContent = 0;
  countriesCounter.textContent = 0;
  yearCounter.textContent = "2004";

  countiesMap.style.display = "none";
  countiesBio.style.display = "none";

  statesMap.style.display = "none";
  statesBio.style.display = "none";

  countriesMap.style.display = "none";
  countriesBio.style.display = "none";

  mapTimeouts.forEach((timeoutId) => {
    clearTimeout(timeoutId);
  });
  mapTimeouts = [];
}

/* click -> focus -> scroll */

const intro = document.querySelector(".intro");
const picContainers = document.querySelectorAll(".collage button");
const scrollPause = 1300;

images.forEach((pic) => {
  pic.addEventListener("click", () => {
    fade = false;

    // fade the other images
    images.forEach((image) => {
      if (pic !== image) {
        image.classList.add("fade");
      }
    });
    // enlarge the current pic
    picContainers.forEach((picContainer) => {
      if (picContainer.children[0].classList.contains(pic.classList[0])) {
        const csStudentContainer = document.querySelector(
          ".csstudentContainer"
        );
        const csHeight = csStudentContainer.offsetHeight;
        const currHeight = picContainer.offsetHeight;
        const translateX =
          csStudentContainer.getBoundingClientRect().left -
          picContainer.offsetLeft;
        const translateY =
          csStudentContainer.offsetTop - picContainer.offsetTop;
        picContainer.style.transformOrigin = "top left";
        picContainer.style.transform = `translate(${translateX}px, ${translateY}px) scale(${
          csHeight / currHeight
        })`;
        picContainer.style.zIndex = "10";
        if (picContainer.children[0].classList.contains("hornplayer")) {
          picContainer.children[0].style.borderRadius = "50%";
          picContainer.children[0].style.aspectRatio = "1";
        }
      }
    });

    // scramble 'Hi, I'm Mingkuan' into nothing
    fxIntro.setText(phrases[0], 20, 25);

    // CHANGE AND SCROLL TO SECTION

    // hide all content sections
    csContent.style.display = "none";
    roadtripperContent.style.display = "none";
    hornplayerContent.style.display = "none";
    photographerContent.style.display = "none";
    rowerContent.style.display = "none";

    // show specific content based on clicked image
    switch (pic.classList[0]) {
      case "csstudent":
        csContent.style.display = "block";
        setTimeout(() => {
          const csStudentSection = document.querySelector(".csstudentSection");
          csStudentSection.scrollIntoView({ behavior: "smooth" });
        }, scrollPause);
        break;
      case "roadtripper":
        roadtripperContent.style.display = "block";
        setTimeout(() => {
          const rtMainSection = document.querySelector(".rtMainSection");
          rtMainSection.scrollIntoView({ behavior: "smooth" });
          updateSelectedButton(rtCountiesButton);
        }, scrollPause);
        break;
      case "hornplayer":
        hornplayerContent.style.display = "block";
        setTimeout(() => {
          const hpMainSection = document.querySelector(".hpMainSection");
          hpMainSection.scrollIntoView({ behavior: "smooth" });
        }, scrollPause);
        break;
      case "photographer":
        photographerContent.style.display = "block";
        setTimeout(() => {
          const phMainSection = document.querySelector(".phMainSection");
          phMainSection.scrollIntoView({ behavior: "smooth" });
        }, scrollPause);
        break;
      case "rower":
        rowerContent.style.display = "block";
        setTimeout(() => {
          const roMainSection = document.querySelector(".roMainSection");
          roMainSection.scrollIntoView({ behavior: "smooth" });
        }, scrollPause);
        break;
    }

    // reset classes afterward
    setTimeout(() => {
      fade = true;
      images.forEach((image) => {
        if (image.classList.contains("fade")) {
          image.classList.remove("fade");
        }
      });
      picContainers.forEach((picContainer) => {
        picContainer.style.transform = "scale(1)";
        picContainer.style.zIndex = "0";
        picContainer.children[0].style.aspectRatio = "0.818";
        picContainer.children[0].style.borderRadius = "0";
      });
      document.getElementById("imMingkuan").innerHTML =
        "Hi, I'm <span class='stronger'>Mingkuan</span>. ";
    }, 2500);
  });
});

/* scroll to CS projects */

const csBox1 = document.querySelector(".csBox1");
csBox1.addEventListener("click", () => {
  const ensembleProject = document.querySelector(".project1");
  ensembleProject.scrollIntoView({ behavior: "smooth", block: "center" });
});

const csBox2 = document.querySelector(".csBox2");
csBox2.addEventListener("click", () => {
  const ensembleProject = document.querySelector(".project2");
  ensembleProject.scrollIntoView({ behavior: "smooth", block: "center" });
});

const csBox3 = document.querySelector(".csBox3");
csBox3.addEventListener("click", () => {
  const ensembleProject = document.querySelector(".project3");
  ensembleProject.scrollIntoView({ behavior: "smooth", block: "center" });
});

const csBox4 = document.querySelector(".csBox4");
csBox4.addEventListener("click", () => {
  const ensembleProject = document.querySelector(".project4");
  ensembleProject.scrollIntoView({ behavior: "smooth", block: "center" });
});

const csBox5 = document.querySelector(".csBox5");
csBox5.addEventListener("click", () => {
  const ensembleProject = document.querySelector(".project5");
  ensembleProject.scrollIntoView({ behavior: "smooth", block: "center" });
});

const csBox6 = document.querySelector(".csBox6");
csBox6.addEventListener("click", () => {
  const ensembleProject = document.querySelector(".project6");
  ensembleProject.scrollIntoView({ behavior: "smooth", block: "center" });
});

/* scroll back home */

const landingSection = document.querySelector(".landingSection");
const homeButton = document.querySelector(".homeButton");

function handleHome() {
  if (window.scrollY >= landingSection.getBoundingClientRect().bottom) {
    homeButton.style.display = "block";
  } else {
    homeButton.style.display = "none";
  }
}

homeButton.addEventListener("click", () => {
  landingSection.scrollIntoView({ behavior: "smooth" });
});

// PHOTOGRAPHER

// background scroll fade fx NOT WORKING

// const gallerySection = document.querySelector('.gallerySection');
// const phMainSection = document.querySelector('.phMainSection');

// function handleScrollFade() {
//   if (window.scrollY > 0) {
//     const opac = window.scrollY / (gallerySection.offsetTop - landingSection.getBoundingClientRect().top);
//     console.log("opac: " + opac)
//     const phMainSection = document.querySelector('.phMainSection');
//     phMainSection.style.backgroundColor = `rgba(255, 255, 255, ${opac})`;
//   }
// }

// window scroll

window.onscroll = function () {
  handleHome();
  // handleScrollFade();
};
