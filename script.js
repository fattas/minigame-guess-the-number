// script.js
let secretNumber = Math.trunc(Math.random() * 50) + 1;
let score = 10;
let highscore = 0;

// Buat objek Audio untuk sound effect
const winSound = new Audio('fx/win-sound.mp3');
const loseSound = new Audio('fx/lose-sound.mp3');

const messageEl = document.querySelector('.message');
const scoreEl = document.querySelector('.score');
const highscoreEl = document.querySelector('.highscore');
const numberEl = document.querySelector('.number');
const guessEl = document.querySelector('.guess');

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(guessEl.value);

  if (!guess || guess < 1 || guess > 50) {
    messageEl.textContent = 'Masukan 1-50!';
    return;
  }

  const diff = Math.abs(secretNumber - guess);

  if (diff === 0) {
    // Menang
    document.body.style.backgroundColor = '#3acc17';
	messageEl.textContent = 'Kamu Menang!';
    numberEl.textContent = secretNumber;
    if (score > highscore) highscore = score;
    highscoreEl.textContent = highscore;
    openPopup('winPopup');
  } else {
    score--;
    scoreEl.textContent = score;

    if (score <= 0) {
      // Kalah
      document.body.style.backgroundColor = '#ff0000';
      messageEl.textContent = 'Kamu Kalah!';
      numberEl.textContent = secretNumber;
      openPopup('losePopup');
    } else {
      // Feedback
      messageEl.textContent =
        diff <= 1
          ? 'Hampir...🥶'
          : diff <= 3
          ? 'Sedikit Lagi...'
          : guess > secretNumber
          ? 'Terlalu Tinggi!'
          : 'Terlalu Rendah!';
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 10;
  secretNumber = Math.trunc(Math.random() * 50) + 1;
  scoreEl.textContent = score;
  numberEl.textContent = '?';
  messageEl.textContent = 'Mulai Bermain!';
  document.body.style.backgroundColor = '#222';
  guessEl.value = '';
});

function openPopup(id) {
  const popup = document.getElementById(id);
  popup.style.display = 'flex';

  // Mainkan sound effect sesuai popup yang muncul
  if (id === 'winPopup') {
    winSound.play();
  } else if (id === 'losePopup') {
    loseSound.play();
  }
}

function closePopup(id) {
  document.getElementById(id).style.display = 'none';
}

window.addEventListener('load', () => {
  // Interval untuk menampilkan angka acak pada splash screen
  let randomNumberInterval = setInterval(() => {
    document.querySelector('.random-number').textContent =
      Math.trunc(Math.random() * 100);
  }, 100);

  // Setelah 2 detik, hentikan interval dan lakukan efek fade-out
  setTimeout(() => {
    clearInterval(randomNumberInterval);
    const splashScreen = document.querySelector('.splash-screen');
    splashScreen.style.opacity = '0';
    setTimeout(() => {
      splashScreen.style.display = 'none';
      document.querySelector('.instructions').style.display = 'block';
    }, 500);
  }, 2000);
});
