const MODES = ['FULL', 'SHORT', 'DATE_FULL', 'DATE_SHORT'];

const getRandomNumber = max => {
  return Math.floor(Math.random() * max);
};

const normaliseTime = value => (value < 10 ? `0${value}` : value);
const normaliseDay = value => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[value];
};

const getRandomColor = () => {
  return `rgb(${getRandomNumber(255)}, ${getRandomNumber(
    255
  )}, ${getRandomNumber(255)})`;
};

class Clock {
  constructor(mp = document.querySelector('body')) {
    this.mp = mp;
    this.currentMode = 0;
  }

  init() {
    this.setMode();
    this.render();
    this.renderClock();
    this.handleEvents();
    this.setColors();
    this.startInterval();
  }

  render() {
    this.container = document.createElement('div');
    this.container.classList.add('clock');
    this.contant = document.createElement('h1');
    this.contant.classList.add('clock__contant');
    this.container.appendChild(this.contant);
    this.mp.appendChild(this.container);
  }

  handleEvents() {
    this.container.addEventListener('click', () => this.switchMode());
  }

  switchMode() {
    this.stopInterval();
    this.nextMode();
    this.setMode();
    this.setColors();
    this.renderClock();
    this.startInterval();
  }

  nextMode() {
    this.currentMode =
      this.currentMode + 1 < MODES.length ? this.currentMode + 1 : 0;
    this.modeName = MODES[this.currentMode];
  }

  setMode() {
    this.modeName = MODES[this.currentMode];
  }

  getCurrentDate() {
    const now = new Date();
    return now;
  }

  setColors() {
    const color = getRandomColor();

    this.contant.style.color = color;
    this.container.style.backgroundColor = color;
  }

  renderClock() {
    switch (this.modeName) {
      case MODES[0]:
        this.contant.innerHTML = this.getFull();
        break;
      case MODES[1]:
        this.contant.innerHTML = this.getShort();
        break;
      case MODES[2]:
        this.contant.innerHTML = this.getDateFull();
        break;
      default:
        this.contant.innerHTML = this.getFull();
    }
  }

  startInterval() {
    if (this.currentMode < 2) {
      this.interval = setInterval(() => this.renderClock(), 800);
    }
  }

  stopInterval() {
    clearInterval(this.interval);
  }

  getFull() {
    const cd = this.getCurrentDate();
    const h = normaliseTime(cd.getHours());
    const m = normaliseTime(cd.getMinutes());
    const s = normaliseTime(cd.getSeconds());

    return `${h}:${m}:${s}`;
  }

  getShort() {
    const cd = this.getCurrentDate();
    const h = normaliseTime(cd.getHours());
    const m = normaliseTime(cd.getMinutes());

    return `${h}:${m}`;
  }

  getDateFull() {
    const cd = this.getCurrentDate();
    const day = normaliseDay(cd.getDay());
    const date = normaliseTime(cd.getDate());
    const y = normaliseTime(cd.getFullYear());

    return `${date}/${day}/${y}`;
  }
}
