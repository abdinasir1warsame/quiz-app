const quizData = [
  {
    question: 'How many players are there in a standard soccer team?',
    options: ['11', '10', '9', '12'],
    answer: '11',
  },
  {
    question: 'What is the main color of the basketball used in NBA games?',
    options: ['Orange', 'Blue', 'White', 'Green'],
    answer: 'Orange',
  },
  {
    question:
      'In which sport do players try to hit a ball over a net using rackets?',
    options: ['Tennis', 'Basketball', 'Soccer', 'Golf'],
    answer: 'Tennis',
  },
  {
    question: 'Which sport is known for the Super Bowl?',
    options: ['Basketball', 'Baseball', 'American Football', 'Soccer'],
    answer: 'American Football',
  },
  {
    question:
      'What do you call it when a bowler knocks down all 10 pins in bowling?',
    options: ['Strike', 'Spare', 'Hit', 'Run'],
    answer: 'Strike',
  },
  {
    question: 'In which sport is the term "hole-in-one" used?',
    options: ['Golf', 'Tennis', 'Soccer', 'Basketball'],
    answer: 'Golf',
  },
  {
    question: 'Which country is known for sumo wrestling?',
    options: ['Japan', 'China', 'Brazil', 'USA'],
    answer: 'Japan',
  },
  {
    question:
      'What is the name of the trophy awarded to the winners of the FIFA World Cup?',
    options: [
      'World Cup Trophy',
      'Golden Globe',
      'Champions Trophy',
      'World Trophy',
    ],
    answer: 'World Cup Trophy',
  },
  {
    question: 'In which sport do players score goals?',
    options: ['Football', 'Tennis', 'Golf', 'Cricket'],
    answer: 'Football',
  },
  {
    question: 'How many points is a touchdown worth in American football?',
    options: ['3 points', '6 points', '1 point', '4 points'],
    answer: '6 points',
  },
  {
    question: 'Which sport is played at Wimbledon?',
    options: ['Football', 'Cricket', 'Tennis', 'Basketball'],
    answer: 'Tennis',
  },
  {
    question: "What sport is known as 'The Beautiful Game'?",
    options: ['Rugby', 'Basketball', 'Football', 'Baseball'],
    answer: 'Football',
  },
  {
    question: 'What shape is a baseball field?',
    options: ['Square', 'Circle', 'Diamond', 'Rectangle'],
    answer: 'Diamond',
  },
  {
    question:
      'In basketball, what is it called when a player scores three baskets in a row?',
    options: ['Hat-trick', 'Triple Play', 'Three-peat', 'Triple Score'],
    answer: 'Hat-trick',
  },
  {
    question: 'Which piece of equipment is used to hit the ball in golf?',
    options: ['Bat', 'Racket', 'Club', 'Stick'],
    answer: 'Club',
  },
  {
    question: "In which sport would you find a 'wicketkeeper'?",
    options: ['Cricket', 'Football', 'Basketball', 'Hockey'],
    answer: 'Cricket',
  },
  {
    question: "Which sport is known for the term 'Home Run'?",
    options: ['Football', 'Basketball', 'Baseball', 'Golf'],
    answer: 'Baseball',
  },
  {
    question:
      'What color card does a soccer referee show to send a player off the field?',
    options: ['Red', 'Green', 'Yellow', 'Blue'],
    answer: 'Red',
  },
  {
    question: 'What is the main object hit back and forth in badminton?',
    options: ['Ball', 'Frisbee', 'Shuttlecock', 'Balloon'],
    answer: 'Shuttlecock',
  },
  {
    question: 'In which sport do players use a net to catch the ball?',
    options: ['Volleyball', 'Lacrosse', 'Basketball', 'Tennis'],
    answer: 'Lacrosse',
  },
];
let currentQuestionIndex = 0;
let score = 0;
let countdown;
let selectedQuestions = [];

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to start the quiz
function startQuiz() {
  shuffleArray(quizData); // Shuffle the quiz data
  selectedQuestions = quizData.slice(0, 8); // Select the first 8 questions
  loadQuestion();
  initializeButtonToggle();
}

// Function to load the current question and options
function loadQuestion() {
  const questionData = selectedQuestions[currentQuestionIndex];
  document.getElementById('question').textContent = questionData.question;
  const options = document.querySelectorAll('.options-box .option');

  questionData.options.forEach((option, index) => {
    options[index].textContent = option;
  });

  resetSubmitButton();
  startTimer(); // Start the timer for the new question
}

// Function to start or reset the timer
function startTimer() {
  const timerElement = document.getElementById('timer');
  let seconds = 30;
  timerElement.textContent = seconds;

  clearInterval(countdown);
  countdown = setInterval(() => {
    seconds--;
    timerElement.textContent = seconds;
    if (seconds === 10) {
      playSound('countdownSound'); // Play countdown sound for last 4 seconds
    }
    if (seconds <= 0) {
      clearInterval(countdown);
      renderTimeOutSection(); // Render the timeout section when time runs out
    }
  }, 1000);
}

// Function to reset the submit button to its initial state
function resetSubmitButton() {
  const submitButton = document.getElementById('submit-question');
  const btnText = document.querySelector('#submit-question .btn-text');
  submitButton.classList.remove('ready', 'next-question');
  const footer = document.querySelector('.footer');
  btnText.textContent = 'Submit Answer';
  footer.classList.remove('next-question');
  submitButton.removeEventListener('click', moveToNextQuestion);
  submitButton.addEventListener('click', onSubmitClick);
}

// Function to handle submit button click
function onSubmitClick() {
  const submitButton = document.getElementById('submit-question');
  if (submitButton.classList.contains('ready')) {
    checkAnswer();
    clearInterval(countdown);
  }
}

// Function to play sound by given ID
function playSound(soundId) {
  const sound = document.getElementById(soundId);
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }
}

// Function to check the answer and apply styles
function checkAnswer() {
  const selectedOption = document.querySelector('.options-box .option.chosen');
  const submitButton = document.getElementById('submit-question');
  const btnText = document.querySelector('#submit-question .btn-text');
  const footer = document.querySelector('.footer');

  if (selectedOption) {
    const selectedAnswer = selectedOption.textContent;
    const correctAnswer = selectedQuestions[currentQuestionIndex].answer;

    if (selectedAnswer === correctAnswer) {
      selectedOption.classList.add('correct');
      score++;
      updateScoreDisplay();
      playSound('correctAnswerSound');
    } else {
      selectedOption.classList.add('wrong');
      playSound('wrongAnswerSound');
    }

    const countdownSound = document.getElementById('countdownSound');
    if (countdownSound) {
      countdownSound.pause();
      countdownSound.currentTime = 0;
    }

    submitButton.classList.add('next-question');
    btnText.textContent = 'Next Question';
    footer.classList.add('next-question');

    submitButton.removeEventListener('click', onSubmitClick);
    submitButton.addEventListener('click', moveToNextQuestion);
  }
}

// Function to move to the next question
function moveToNextQuestion() {
  resetOptionStyles();
  currentQuestionIndex++;

  if (currentQuestionIndex < selectedQuestions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
}

// Function to end the quiz
function endQuiz() {
  const mainSection = document.querySelector('main');
  mainSection.innerHTML = `
  <div id="firework-container"></div>
  <section id="quiz-completion">
    <div class="quiz-content">
      <h1 id="quiz-name"><span>Quiz Completed</span></h1>
      <p id="final-score">Your Score: <span>${score}/8</span></p>
      <p class="congrats-message">
        Wohoo!! Congratulations on completing the quiz. You have done great!
      </p>
      <p class="encouragement-message">
        Keep going and improve your mental strength and improve on your
        general knowledge by continuing with our amazing quiz.
      </p>
      <button class="quiz-button" onclick="location.href='index.html'">
        Return to Homepage
      </button>
    </div>
  </section>
  <audio
    id="clapping"
    src="./assets/audio/Applauding-and-cheering.mp3"
    preload="auto"
  ></audio>
  <audio
    id="whistling"
    src="./assets/audio/firework-show-short-64657.mp3"
    preload="auto"
  ></audio>
  <audio
    id="fireworkSound"
    src="./assets/audio/applause-2.mp3"
    preload="auto"
  ></audio>
</div>
    `;

  initiateFireworks();
  storeQuizScore(score);
}

function storeQuizScore(newScore) {
  let scores = JSON.parse(localStorage.getItem('quizScores')) || [];

  scores.unshift(newScore);

  scores = scores.slice(0, 10);

  localStorage.setItem('quizScores', JSON.stringify(scores));
}

let fireworksInitiated = false;

function initiateFireworks() {
  if (fireworksInitiated) return;
  fireworksInitiated = true;

  const container = document.getElementById('firework-container');
  const clappingSound = document.getElementById('clapping');
  const whistlingSound = document.getElementById('whistling');
  const fireworkSound = document.getElementById('fireworkSound');

  clappingSound.loop = false;
  whistlingSound.loop = false;
  fireworkSound.loop = false;

  function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
  }

  function createFirework() {
    const explosionSize = 100 + Math.random() * 100;
    const particleCount = 50 + Math.random() * 50;
    const explosionDuration = 1000 + Math.random() * 500;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      container.appendChild(particle);

      const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
      particle.style.backgroundColor = color;

      const startPosX = Math.random() * container.offsetWidth;
      const startPosY = Math.random() * container.offsetHeight;
      particle.style.left = `${startPosX}px`;
      particle.style.top = `${startPosY}px`;

      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * explosionSize;
      const y = Math.sin(angle) * explosionSize;

      setTimeout(() => {
        particle.style.opacity = 1;
        particle.style.transform = `translate(${x}px, ${y}px)`;
        particle.style.transition = `transform ${explosionDuration}ms, opacity ${
          explosionDuration / 2
        }ms`;
      }, 0);

      setTimeout(() => {
        container.removeChild(particle);
      }, explosionDuration);
    }
  }

  playSound(fireworkSound);
  setTimeout(() => playSound(clappingSound), 500);
  setTimeout(() => playSound(whistlingSound), 1000);

  createFirework();
}

// Function to reset the styles of all options
function resetOptionStyles() {
  const options = document.querySelectorAll('.options-box .option');
  options.forEach((option) => {
    option.classList.remove('correct', 'wrong', 'chosen');
  });
}

// Function for toggle behavior on options and submit button activation
function initializeButtonToggle() {
  const buttons = document.querySelectorAll('.options-box .option');
  const submitButton = document.getElementById('submit-question');

  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const currentButton = event.currentTarget;
      const isAlreadySelected = currentButton.classList.contains('chosen');

      buttons.forEach((btn) => btn.classList.remove('chosen'));

      if (!isAlreadySelected) {
        currentButton.classList.add('chosen');
        submitButton.classList.add('ready');
      } else {
        submitButton.classList.remove('ready');
      }
    });
  });

  submitButton.addEventListener('click', onSubmitClick);
}

// Function to update the score display
function updateScoreDisplay() {
  const scoreElement = document.getElementById('score');
  scoreElement.textContent = 'Score: ' + score;
}

// Function to render the timeout section
function renderTimeOutSection() {
  const mainSection = document.querySelector('main');
  mainSection.innerHTML = `
        <div class="timeout-section">
            <div class="timeOut-container">
                <div class="timeout-message">
                    <h1>Oops... Time's Up!</h1>
                    <p>Don't worry, you can try again or explore more.</p>
                    <div class="action-buttons">
                        <a href="./sport-quiz.html" class="btn btn-try-again">Try Again</a>
                        <a href="./index.html" class="btn btn-homepage">Go to Homepage</a>
                    </div>
                </div>
            </div>
        </div>`;
}

// Start the quiz when the page loads
window.addEventListener('load', startQuiz);
