      // this is to track time (hours, minutes, and seconds)
      let [seconds, minutes, hours] = [0, 0, 0];
      let displayTime = document.getElementById("displayTime");
      // timer varible to store the interval ID
      let timer = null;
// function is to update the stop watch and display
      function stopwatch() {
        seconds++;
        // if seconds reach 60 it reset to 0 and increment minutes
        if (seconds == 60) {
          seconds = 0;
          minutes++;
          if (minutes == 60) {
            minutes = 0;
            hours++;
          }
        }
        // format to alwasys two digits
        let h = hours < 10 ? "0" + hours : hours;  
        let m = minutes < 10 ? "0" + minutes : minutes;         
        let s = seconds < 10 ? "0" + seconds : seconds;   

        displayTime.innerHTML = h + ":" + m + ":" + s;             
      }
// if the timer is running it has to clear first so the interval doesn't duplicate
      function watchStart() {
        if (timer !== null) {
          clearInterval(timer);
        }
        // start the stopwatch and update every second
        timer = setInterval(stopwatch, 1000);
      }

      function watchStop() {
        clearInterval(timer);
      }

      function watchReset() {
        clearInterval(timer);
        // this is to reset the time variables
        [seconds, minutes, hours] = [0, 0, 0];
        displayTime.innerHTML = "00:00:00";
      }
