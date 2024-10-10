document.addEventListener('DOMContentLoaded', ()=> {
const time = document.querySelector(".time");

if (time) {
  const daysElem = time.querySelector(".days");
  const hoursElem = time.querySelector(".hours");
  const minsElem = time.querySelector(".mins");
  const secsElem = time.querySelector(".secs");

  let timeLeft = {
    days: 2,
    hours: 6,
    mins: 5,
    secs: 30,
  };

  let intervalId = setInterval(() => {
    displayTime();
  }, 1000);

  function displayTime() {
    // Update the displayed time
    daysElem.textContent = String(timeLeft.days).padStart(2, "0");
    hoursElem.textContent = String(timeLeft.hours).padStart(2, "0");
    minsElem.textContent = String(timeLeft.mins).padStart(2, "0");
    secsElem.textContent = String(timeLeft.secs).padStart(2, "0");

    if (timeLeft.secs > 0) {
      timeLeft.secs--;
    } else {
      if (timeLeft.mins > 0) {
        timeLeft.mins--;
        timeLeft.secs = 59;
      } else {
        if (timeLeft.hours > 0) {
          timeLeft.hours--;
          timeLeft.mins = 59;
          timeLeft.secs = 59;
        } else {
          if (timeLeft.days > 0) {
            timeLeft.days--;
            timeLeft.hours = 23;
            timeLeft.mins = 59;
            timeLeft.secs = 59;
          } else {
            clearInterval(intervalId);
          }
        }
      }
    }
  }
}
});
