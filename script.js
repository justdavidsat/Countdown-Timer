document.addEventListener("DOMContentLoaded", function() {
    let countdown;
    let timerDisplay = document.getElementById("timer");
    let endTime;
    let isRunning = false;
    
    function displayTime(seconds) {
    let sign = seconds < 0 ? "-" : ""; // Add this line
    let absSeconds = Math.abs(seconds); // Use absolute value
    
    let minutes = Math.floor(absSeconds / 60);
    let remainderSeconds = absSeconds % 60;
    let display = `${sign}${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    
    timerDisplay.textContent = display;
    document.title = display;
  }
  
    function timer(seconds) {
      clearInterval(countdown);
      isRunning = true;
      endTime = Date.now() + seconds * 1000;
      displayTime(seconds);
      
      countdown = setInterval(() => {
        let secondsLeft = Math.round((endTime - Date.now()) / 1000);
        
        if (secondsLeft < 0) {
          displayTime(secondsLeft);
          timerDisplay.style.color = "red";
          return;
        }
        
        displayTime(secondsLeft);
        timerDisplay.style.color = "green";
      }, 1000);
    }
    
    function stopTimer() {
      clearInterval(countdown);
      isRunning = false;
      timerDisplay.style.color = "black";
    }
    
    function resetTimer() {
      clearInterval(countdown);
      isRunning = false;
      timerDisplay.style.color = "black";
      displayTime(0);
    }
    
    function handleKeydown(e) {
      if (e.keyCode === 32) {
        if (isRunning) {
          stopTimer();
        } else {
          let inputTime = parseInt(prompt("Enter the time duration in minutes:"));
          if (!isNaN(inputTime)) {
            timer(inputTime * 60);
          }
        }
      }
      
      if (e.keyCode === 82) {
        resetTimer();
      }
    }
    
    document.addEventListener("keydown", handleKeydown);
  });
  