var workInt = document.getElementById('work-int');
var restInt = document.getElementById('rest-int');
var roundNumber = document.getElementById('round-number');
var labelElement = document.getElementById('label');
var timerElement = document.getElementById('timer');
var roundsElement = document.getElementById('rounds');
var submitElement = document.getElementById('submit');
var config;
var beep = document.getElementById('beep');

function timer(interval, rounds, label) {
  labelElement.textContent = label;
  var timerId = setInterval(tick, 1000);
  function tick() {
    timerElement.textContent = interval;
    if(interval < 4 && interval > 0) {
      beep.play();
    }
    interval--;
    if(interval < 0) {
      clearInterval(timerId);
      if(label == 'Rest!') {
        rounds--;
        roundsElement.textContent = rounds;
      }
      if(rounds > 0) {
        if(label == 'Get Ready!' || label == 'Rest!') {
          timer(config.work.interval, rounds, config.work.label);
        }
        else if(label == 'Go!') {
          timer(config.rest.interval, rounds, config.rest.label);
        }
      } else {
        labelElement.textContent = 'Finished!';
      }
    }
  }
}

submitElement.addEventListener('click', function(event) {
  // keep the form from submitting
  event.preventDefault();
  // set user-defined intervals and rounds
  config = {
    rounds: roundNumber.value,
    prep: {interval: 5, label: 'Get Ready!'},
    work: {interval: workInt.value, label: 'Go!'},
    rest: {interval: restInt.value, label: 'Rest!'}
  };
  // set initial values of interval and rounds
  timerElement.textContent = config.prep.interval;
  roundsElement.textContent = config.rounds;
  // kick off timer
  timer(config.prep.interval, config.rounds, config.prep.label);
});
