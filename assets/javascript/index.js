function toggleCategoryAndPlayButton(categoryId) {
  const category = document.getElementById(categoryId);
  category.addEventListener('click', function () {
    categories.forEach(function (otherCategoryId) {
      if (otherCategoryId !== categoryId) {
        document.getElementById(otherCategoryId).classList.remove('chosen');
      }
    });

    this.classList.toggle('chosen');

    const playButton = document.getElementById('playButton');
    if (this.classList.contains('chosen')) {
      playButton.classList.remove('not-ready');
      playButton.classList.add('ready');
      document.getElementById('button').href = determineLink(categoryId);
    } else {
      playButton.classList.remove('ready');
      playButton.classList.add('not-ready');
      document.getElementById('button').href = '';
    }
  });
}
function determineLink(categoryId) {
  switch (categoryId) {
    case 'category-science':
      return './science-quiz.html';
    case 'category-math':
      return './maths-quiz.html';
    case 'category-history':
      return './history-quiz.html';
    case 'category-geography':
      return './geography-quiz.html';
    case 'category-sports':
      return './sports-quiz.html';
    default:
      return '';
  }
}
const categories = [
  'category-science',
  'category-math',
  'category-history',
  'category-geography',
  'category-sports',
];
categories.forEach(toggleCategoryAndPlayButton);
