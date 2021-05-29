function main(workInterval, restInterval, numberOfRounds) {
  // grab the rest of the elements needed
  var prepInterval = 5;
  var prepLabel = 'Get Ready!';
  var workLabel = 'Go!';
  var restLabel = 'Rest!';
  var labelElement = document.getElementById('label');
  var beepElement = document.getElementById('beep');

  // set initial values of interval and rounds
  var timerElement = document.getElementById('timer');
  var roundsElement = document.getElementById('rounds');
  timerElement.textContent = prepInterval;
  roundsElement.textContent = numberOfRounds;

  function timer(interval, rounds, label) {
    labelElement.textContent = label;
    var timerId = setInterval(tick, 1000);
    function tick() {
      timerElement.textContent = interval;
      if(interval < 4 && interval > 0) {
        beepElement.play();
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
            timer(workInterval, rounds, workLabel);
          }
          else if(label == 'Go!') {
            timer(restInterval, rounds, restLabel);
          }
        } else {
          labelElement.textContent = 'Finished!';
        }
      }
    }
  }
  timer(prepInterval, numberOfRounds, prepLabel);
}

var submitElement = document.getElementById('submit');
submitElement.addEventListener('click', function(event) {
  // keep the form from submitting
  event.preventDefault();
  // grab work, rest and round elements
  var workInt = document.getElementById('work-int');
  var restInt = document.getElementById('rest-int');
  var roundNumber = document.getElementById('round-number');
  // kick off timer
  main(workInt.value, restInt.value, roundNumber.value);
});
