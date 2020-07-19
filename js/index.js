var workInt = document.getElementById('work-int');
var restInt = document.getElementById('rest-int');
var roundNumber = document.getElementById('round-number');
var labelElement = document.getElementById('label');
var timerElement = document.getElementById('timer');
var roundsElement = document.getElementById('rounds');
var submitElement = document.getElementById('submit');
var rounds;
var config;
function timer(interval, label) {
  labelElement.textContent = label;
  var timerId = setInterval(tick, 1000);
  function tick() {
    if (interval == 0) {
      timerElement.textContent = interval; // won't display 0 otherwise
      clearInterval(timerId);
      if (label == 'Get Ready!') {
        timer(config.work.interval, config.work.label);
      }
      else if (label == 'Go!') {
        timer(config.rest.interval, config.rest.label);
      }
      else if (label == 'Rest!' && rounds > 1) {
        rounds--;
        roundsElement.textContent = rounds;
        timer(config.work.interval, config.work.label);
      }
      else {
        labelElement.textContent = 'Finished!';
        roundsElement.textContent = 0; // won't display 0 otherwise
      }
    }
    else {
      timerElement.textContent = interval;
      interval--;
    }
  }
}
submitElement.addEventListener('click', function(event) {
  // keeps form from submitting
  event.preventDefault();
  // set user-defined intervals and rounds
  config = {
    prep: {interval: 3, label: 'Get Ready!'},
    work: {interval: workInt.value, label: 'Go!'},
    rest: {interval: restInt.value, label: 'Rest!'}
  };
  // sets initial values of interval and rounds
  timerElement.textContent = config.prep.interval;
  rounds = roundNumber.value;
  roundsElement.textContent = rounds;
  // kicks off timer
  timer(config.prep.interval, config.prep.label);
});
