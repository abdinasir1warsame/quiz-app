// document.getElementById('playButton').addEventListener('click', function () {
//   this.classList.toggle('not-ready');
//   this.classList.toggle('ready');
//   if ('playButton' === 'ready') {
//     document.getElementByClassName('play-btn').style.width = '150px';
//   }
// });
document.getElementById('playButton').addEventListener('click', function () {
  this.classList.toggle('not-ready');
  this.classList.toggle('ready');
  if (this.classList.contains('ready')) {
    // Perform actions when the button is in the 'ready' state
    // Note: The button's width is already set in CSS, so no need to set it again here
  }
});
document
  .getElementByClassName('category-card')
  .addEventListener('click', function () {
    this.classList.toggle('category-card');
    this.classList.toggle('chosen');
  });

document.addEventListener('click', function (event) {
  if (event.target.matches('.category-science')) {
    switch (event.target.id) {
      case 'category-math':
        // Code for category-card1
        event.target.classList.toggle('chosen');
        break;
      case 'category-history':
        // Code for category-card2
        event.target.classList.toggle('chosen');
        break;
      // Add more cases for other IDs
      default:
        // Code for any other case or no-op
        break;
    }
  }
});
