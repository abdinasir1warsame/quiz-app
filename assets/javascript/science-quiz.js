const quizData = [
  {
    question: 'What is the boiling point of water at sea level?',
    options: ['100°C', '90°C', '80°C', '120°C'],
    answer: '100°C',
  },
  {
    question: 'Which vitamin is primarily obtained from sunlight?',
    options: ['Vitamin C', 'Vitamin D', 'Vitamin A', 'Vitamin E'],
    answer: 'Vitamin D',
  },
  {
    question: "What is the primary gas found in the Earth's atmosphere?",
    options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
    answer: 'Nitrogen',
  },
  {
    question: 'What force pulls objects toward the center of the Earth?',
    options: ['Magnetism', 'Gravity', 'Friction', 'Inertia'],
    answer: 'Gravity',
  },
  {
    question: 'What is the hardest natural substance on Earth?',
    options: ['Gold', 'Iron', 'Diamond', 'Granite'],
    answer: 'Diamond',
  },
  {
    question: 'What is the process by which plants make their food?',
    options: ['Photosynthesis', 'Respiration', 'Fermentation', 'Osmosis'],
    answer: 'Photosynthesis',
  },
  {
    question: 'Which planet in our solar system has the most moons?',
    options: ['Earth', 'Jupiter', 'Mars', 'Saturn'],
    answer: 'Saturn',
  },
  {
    question: 'What is the name of the galaxy that contains our Solar System?',
    options: [
      'Andromeda Galaxy',
      'Milky Way Galaxy',
      'Whirlpool Galaxy',
      'Sombrero Galaxy',
    ],
    answer: 'Milky Way Galaxy',
  },
  {
    question: 'What is the basic unit of life?',
    options: ['Cell', 'Atom', 'Molecule', 'Organ'],
    answer: 'Cell',
  },
  {
    question: 'Which element is needed to make nuclear energy and weapons?',
    options: ['Iron', 'Uranium', 'Carbon', 'Hydrogen'],
    answer: 'Uranium',
  },
  {
    question: 'How many bones are in the human body?',
    options: ['206', '195', '210', '187'],
    answer: '206',
  },
  {
    question: 'What is the chemical symbol for gold?',
    options: ['Au', 'Ag', 'Gd', 'Go'],
    answer: 'Au',
  },
  {
    question: 'What type of animal is a dolphin?',
    options: ['Fish', 'Mammal', 'Bird', 'Reptile'],
    answer: 'Mammal',
  },
  {
    question: 'What is the largest organ in the human body?',
    options: ['Heart', 'Skin', 'Liver', 'Brain'],
    answer: 'Skin',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Mars', 'Venus', 'Jupiter', 'Mercury'],
    answer: 'Mars',
  },
  {
    question: 'What is the main component of the Sun?',
    options: ['Liquid Lava', 'Rock', 'Gas', 'Plasma'],
    answer: 'Plasma',
  },
  {
    question: 'What causes tides in the oceans?',
    options: ['Wind', 'Sun', 'Moon', "Earth's rotation"],
    answer: 'Moon',
  },
  {
    question: 'What is the smallest particle of an element?',
    options: ['Atom', 'Electron', 'Molecule', 'Compound'],
    answer: 'Atom',
  },
  {
    question: 'How many planets are in our solar system?',
    options: ['8', '9', '7', '10'],
    answer: '8',
  },
  {
    question: 'What gas do plants exhale?',
    options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Helium'],
    answer: 'Oxygen',
  },
  {
    question: "What is the most abundant gas in the Earth's atmosphere?",
    options: ['Oxygen', 'Hydrogen', 'Carbon Dioxide', 'Nitrogen'],
    answer: 'Nitrogen',
  },
  {
    question: 'What is the speed of light?',
    options: ['300,000 km/s', '150,000 km/s', '500,000 km/s', '100,000 km/s'],
    answer: '300,000 km/s',
  },
  {
    question: 'Who proposed the theory of relativity?',
    options: [
      'Isaac Newton',
      'Albert Einstein',
      'Stephen Hawking',
      'Nikola Tesla',
    ],
    answer: 'Albert Einstein',
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
  btnText.textContent = 'Submit Answer';

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

// Function to check the answer and apply styles
function checkAnswer() {
  const selectedOption = document.querySelector('.options-box .option.chosen');
  const submitButton = document.getElementById('submit-question');
  const btnText = document.querySelector('#submit-question .btn-text');

  if (selectedOption) {
    const selectedAnswer = selectedOption.textContent;
    const correctAnswer = selectedQuestions[currentQuestionIndex].answer;

    if (selectedAnswer === correctAnswer) {
      selectedOption.classList.add('correct');
      score++;
      updateScoreDisplay();
    } else {
      selectedOption.classList.add('wrong');
    }

    submitButton.classList.add('next-question');
    btnText.textContent = 'Next Question';

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
}

function initiateFireworks() {
  const container = document.getElementById('firework-container');
  const clappingSound = document.getElementById('clapping');
  const whistlingSound = document.getElementById('whistling');
  const fireworkSound = document.getElementById('fireworkSound');

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

    playSound(fireworkSound);
    setTimeout(() => playSound(clappingSound), 500);
    setTimeout(() => playSound(whistlingSound), 1000);
  }

  setInterval(createFirework, 2000);
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
                        <a href="./science-quiz.html" class="btn btn-try-again">Try Again</a>
                        <a href="./index.html" class="btn btn-homepage">Go to Homepage</a>
                    </div>
                </div>
            </div>
        </div>`;
}

// Start the quiz when the page loads
window.addEventListener('load', startQuiz);
