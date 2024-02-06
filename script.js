/* COLLAGE */

/* image grayscale effect */

let currentIndex = 1;
let fade = true;

const images = document.querySelectorAll('.collage img');

images.forEach(image => {
  image.addEventListener('mouseover', () => {
    if (fade) {
      let index = 0;
      switch (image.classList[0]) {
        case 'csstudent':
          index = 1;
          break;
        case 'roadtripper':
          index = 2;
          break;
        case 'hornplayer':
          index = 3;
          break;
        case 'photographer':
          index = 4;
          break;
        case 'rower':
          index = 5;
          break;
      }
      if (image.classList.contains('gray')) {
        image.classList.remove('gray');
      }
      if (currentIndex !== index) {
        fx.setText(phrases[index], 45, 50);
        currentIndex = index;
      }
      images.forEach(otherImage => {
        if (otherImage !== image && !otherImage.classList.contains('gray')) {
          otherImage.classList.add("gray");
        }
      });
    }
  }, false);
  image.addEventListener('mouseout', () => {
    if (fade) {
      if (currentIndex !== 1) {
        fx.setText(phrases[1], 45, 50);
      }
      images.forEach(image => {
        if (image.classList[0] === 'csstudent') {
          image.classList.remove("gray");
        } else if (!image.classList.contains('gray')) {
          image.classList.add('gray');
        }
      });
      currentIndex = 1;
    }
  }, false);
});

/* text scramble effect */

class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = 'abcdefghjkmnopqrstuvwxy~~~~~~~-----_____[]//#<>'
    this.update = this.update.bind(this)
  }
  setText(newText, startFactor, endFactor) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * startFactor)
      const end = start + Math.floor(Math.random() * endFactor)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.24) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

const facet = document.getElementById('facet');
const fx = new TextScramble(facet);
const fxIntro = new TextScramble(document.getElementById('imMingkuan'));

const phrases = [
  '',
  ' CS student @ Georgia Tech.',
  ' road tripper.',
  ' horn player.',
  ' photographer.',
  ' rower.'
];

// content
const csContent = document.querySelector('.csContent');
const roadtripperContent = document.querySelector('.roadtripperContent');
const hornplayerContent = document.querySelector('.hornplayerContent');
const photographerContent = document.querySelector('.photographerContent');
const rowerContent = document.querySelector('.rowerContent');


// website setup
function setupInitialState() {
  fx.setText(phrases[1], 100, 30);
  images.forEach(image => {
    if (image.classList.contains('csstudent')) {
      image.classList.remove('gray');
    } else {
      image.classList.add('gray');
    }
  });

  roadtripperContent.style.display = 'none';
  hornplayerContent.style.display = 'none';
  photographerContent.style.display = 'none';
  rowerContent.style.display = 'none';
}

window.addEventListener('load', setupInitialState);







/* click -> focus -> scroll */

const intro = document.querySelector('.intro');
const picContainers = document.querySelectorAll('.collage button');

images.forEach(pic => {
  pic.addEventListener('click', () => {
    fade = false;

    // fade the other images
    images.forEach(image => {
      if (pic !== image) {
        image.classList.add('fade');
      }
    });
    // enlarge the current pic
    picContainers.forEach(picContainer => {
      if (picContainer.children[0].classList.contains(pic.classList[0])) {
        const csStudentContainer = document.querySelector('.csstudentContainer');
        const csHeight = csStudentContainer.offsetHeight;
        const currHeight = picContainer.offsetHeight;
        const translateX = csStudentContainer.getBoundingClientRect().left - picContainer.offsetLeft;
        const translateY = csStudentContainer.offsetTop - picContainer.offsetTop;
        picContainer.style.transformOrigin = 'top left';
        picContainer.style.transform = `translate(${translateX}px, ${translateY}px) scale(${csHeight / currHeight})`;
        picContainer.style.zIndex = '10';
        if (picContainer.children[0].classList.contains('hornplayer')) {
          picContainer.children[0].style.borderRadius = '50%';
          picContainer.children[0].style.aspectRatio = '1';
        }
      }
    });

    // scramble 'Hi, I'm Mingkuan' into nothing
    fxIntro.setText(phrases[0], 20, 25);



    // CHANGE AND SCROLL TO SECTION

    // hide all content sections
    csContent.style.display = 'none';
    roadtripperContent.style.display = 'none';
    hornplayerContent.style.display = 'none';
    photographerContent.style.display = 'none';
    rowerContent.style.display = 'none';

    // show specific content based on clicked image
    const pause = 1300;
    switch (pic.classList[0]) {
      case 'csstudent':
        csContent.style.display = 'block';
        setTimeout(() => {
          const csStudentSection = document.querySelector('.csstudentSection');
          csStudentSection.scrollIntoView({ behavior: 'smooth' });
        }, pause);
        break;
      case 'roadtripper':
        roadtripperContent.style.display = 'block';
        setTimeout(() => {
          const rtMainSection = document.querySelector('.rtMainSection');
          rtMainSection.scrollIntoView({ behavior: 'smooth' });
        }, pause);
        break;
      case 'hornplayer':
        hornplayerContent.style.display = 'block';
        setTimeout(() => {
          const hpMainSection = document.querySelector('.hpMainSection');
          hpMainSection.scrollIntoView({ behavior: 'smooth' });
        }, pause);
        break;
      case 'photographer':
        photographerContent.style.display = 'block';
        setTimeout(() => {
          const phMainSection = document.querySelector('.phMainSection');
          phMainSection.scrollIntoView({ behavior: 'smooth' });
        }, pause);
        break;
      case 'rower':
        rowerContent.style.display = 'block';
        setTimeout(() => {
          const roMainSection = document.querySelector('.roMainSection');
          roMainSection.scrollIntoView({ behavior: 'smooth' });
        }, pause);
        break;
    }

    // reset classes afterward
    setTimeout(() => {
      fade = true;
      images.forEach(image => {
        if (image.classList.contains('fade')) {
          image.classList.remove('fade');
        }
      });
      picContainers.forEach(picContainer => {
        picContainer.style.transform = 'scale(1)';
        picContainer.style.zIndex = '0';
        picContainer.children[0].style.aspectRatio = '0.818';
        picContainer.children[0].style.borderRadius = '0';
      });
      document.getElementById('imMingkuan').innerHTML = "Hi, I'm <span class='stronger'>Mingkuan</span>. ";
    }, 2500);
  });
});








/* scroll to CS projects */

const csEnsemble = document.querySelector('.csEnsemble');
csEnsemble.addEventListener('click', () => {
  const ensembleProject = document.querySelector('.ensembleProject');
  ensembleProject.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

const csBite = document.querySelector('.csBite');
csBite.addEventListener('click', () => {
  const ensembleProject = document.querySelector('.biteProject');
  ensembleProject.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

const csGeoSurfer = document.querySelector('.csGeoSurfer');
csGeoSurfer.addEventListener('click', () => {
  const ensembleProject = document.querySelector('.geosurferProject');
  ensembleProject.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

const csTravelDust = document.querySelector('.csTravelDust');
csTravelDust.addEventListener('click', () => {
  const ensembleProject = document.querySelector('.traveldustProject');
  ensembleProject.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

const csKanjiro = document.querySelector('.csKanjiro');
csKanjiro.addEventListener('click', () => {
  const ensembleProject = document.querySelector('.kanjiroProject');
  ensembleProject.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

const csBump = document.querySelector('.csBump');
csBump.addEventListener('click', () => {
  const ensembleProject = document.querySelector('.bumpProject');
  ensembleProject.scrollIntoView({ behavior: 'smooth', block: 'center' });
});







/* scroll back home */

const landingSection = document.querySelector('.landingSection');
const homeButton = document.querySelector('.homeButton');

function handleHome() {
  if (window.scrollY >= landingSection.getBoundingClientRect().bottom) {
    homeButton.style.display = 'block';
  } else {
    homeButton.style.display = 'none';
  }
}

window.onscroll = handleHome;

homeButton.addEventListener('click', () => {
  landingSection.scrollIntoView({ behavior: 'smooth' });
});










/* MAP */
const colorMap = {
  livedIn: '#ffff33',
  visited2012: '#008d8c',
  visited2013: '#1a968e',
  visited2014: '#2c9e90',
  visited2015: '#3ca791',
  visited2016: '#4caf91',
  visited2018: '#6bbf92',
  visited2019: '#7bc792',
  visited2020: '#8ccf92',
  visited2021: '#9dd692',
  visited2022: '#aede92',
  visited2023: '#bfe692',
}

document.addEventListener('DOMContentLoaded', function () {
  fetch('../assets/roadtripper/MyTravels.json')
    .then(response => response.json())
    .then(myTravels => {
      Object.keys(myTravels).forEach(key => {
        const { label, counties } = myTravels[key];

        counties.forEach(county => {
          const element = document.getElementById(county);
          if (element) {
            element.style.fill = colorMap[key];
          }
        })
      })
    })
});

/* map toggle menu */
const rtCountiesButton = document.querySelector('.rtNav .countiesButton');
const rtStatesButton = document.querySelector('.rtNav .statesButton');
const rtTimelineButton = document.querySelector('.rtNav .timelineButton');
const rtAnimation = document.querySelector('.rtAnimation');

let rtSelectedButton = rtCountiesButton;

function updateSelectedButton(selectedButton) {
  rtSelectedButton.classList.remove('rtSelected');
  rtSelectedButton.classList.add('rtUnselected');
  rtSelectedButton = selectedButton;
  rtSelectedButton.classList.remove('rtUnselected');
  rtSelectedButton.classList.add('rtSelected');
}

updateSelectedButton(rtCountiesButton);

rtCountiesButton.addEventListener('click', function () {
  rtAnimation.style.left = '0';
  updateSelectedButton(rtCountiesButton);
});

rtStatesButton.addEventListener('click', function () {
  rtAnimation.style.left = '10rem';
  updateSelectedButton(rtStatesButton);
});

rtTimelineButton.addEventListener('click', function () {
  rtAnimation.style.left = '20rem';
  updateSelectedButton(rtTimelineButton);
});