/* image grayscale effect */

currentIndex = 1;

const images = document.querySelectorAll('.collage img');
images.forEach(image => {
  image.addEventListener('mouseover', () => {
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
  }, false);
  image.addEventListener('mouseout', () => {
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

const phrases = [
  '',
  ' CS student @ Georgia Tech.',
  ' road tripper.',
  ' horn player.',
  ' photographer.',
  ' rower.'
];

function setupInitialState() {
  fx.setText(phrases[1], 100, 30);
  images.forEach(image => {
    if (image.classList.contains('csstudent')) {
      image.classList.remove('gray');
    } else {
      image.classList.add('gray');
    }
  })
}

window.addEventListener('load', setupInitialState);