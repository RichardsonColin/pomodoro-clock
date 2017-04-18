$(document).ready(function() {

  // Sets the base time for the session and break.
  var setSessionTime = 1500;
  var setBreakTime = 300;
  var currentTime = setSessionTime;
  var tempTime = currentTime;
  var id = true;
  var sound = new Audio("https://www.soundjay.com/button/sounds/beep-05.mp3");
  var passActivity = "Break";
  var timeToggle = true;

  // Set session time and break digits.
  secToMin(setSessionTime, setBreakTime);

  //Sets the timer start time.
  $("#timer").text(secToTimeString(setSessionTime));

  // Changes the session and break time from time in seconds to time in minutes.
  function secToMin(sessionTimeInSec, breakTimeInSec) {
    var sessionTime = Math.floor(sessionTimeInSec / 60);
    var breakTime = Math.floor(breakTimeInSec / 60);

    document.getElementById("session_time").innerHTML = sessionTime;
    document.getElementById("break_time").innerHTML = breakTime;
  }

  function secToTimeString(second) {
    var hour = 0,
      minute = 0;

    hour = Math.floor(second / 3600);
    second = second - (3600 * hour);
    minute = Math.floor(second / 60);
    second = second - (60 * minute);

    return (hour > 0) ? n(hour) + ":" + n(minute) + ":" + n(second) : n(minute) + ":" + n(second);

    //function to add leading 0
    function n(n) {
      return n > 9 ? "" + n : "0" + n;
    }
  }

  // Set session start time
  //$("#timer").text(secToTimeString(currentSessionTime));

  // When clicked the session time and break time can be adjusted.
  // Decreases the session time by 1 minute until it reaches 1 minute left, which displays an alert.
  $(".time_down").click(function() {
    if (timeToggle) {
      if (this.click) {
        if ((setSessionTime / 60) > 1) {
          setSessionTime -= 60;
          currentTime = setSessionTime;
          document.getElementById("session_time").innerHTML = Math.floor((setSessionTime) / 60);
          $("#timer").text(secToTimeString(setSessionTime));
        } else {
          alert("1 minute is the lowest time");
        }
      }
    }
  });

  //Increases the session time by 1 minute until 60 minutes, which displays an alert.
  $(".time_up").click(function() {
    if (timeToggle) {
      if (this.click) {
        if ((setSessionTime / 60) < 60) {
          setSessionTime += 60;
          currentTime = setSessionTime;
          document.getElementById("session_time").innerHTML = Math.floor((setSessionTime) / 60);
          $("#timer").text(secToTimeString(setSessionTime));
        } else {
          alert("Take a break you filthy animal!");
        }
      }
    }
  });

  //Decreases the break time by 1 minute until it reaches 1 minute left, which displays an alert.
  $(".break_down").click(function() {
    if (timeToggle) {
      if (this.click) {
        if ((setBreakTime / 60) > 1) {
          setBreakTime -= 60;
          document.getElementById("break_time").innerHTML = Math.floor((setBreakTime) / 60);
        } else {
          alert("Now, now. It's ok to love yourself.");
        }
      }
    }
  });

  //Increases the break time by 1 minute until it reaches 15 minutes, which displays an alert.
  $(".break_up").click(function() {
    if (timeToggle) {
      if (this.click) {
        if ((setBreakTime / 60) < 15) {
          setBreakTime += 60;
          document.getElementById("break_time").innerHTML = Math.floor((setBreakTime) / 60);
        } else {
          alert("Woah, this isn't a holiday!");
        }
      }
    }
  });

  // Disable the session and break buttons.
  function disableButton() {
    $(".time_down, .time_up, .break_down, .break_up").off("click");
  }

  // Stars the timer using the play button.
  $(".start_btn").click(function() {
    if (id === true) {
      tempTime = currentTime
      id = setInterval(decrease, 1000);
      timeToggle = false;
    }
    // Conitnually decreases the displayed time using 'setInterval'.
    function decrease() {
      if (currentTime == 0) {
        sound.play();
        $(".current").text(passActivity);
        // Changes from session to break and back again.
        switch (passActivity) {
          case "Break":
            currentTime = setBreakTime;
            passActivity = "Session";
            break;
          case "Session":
            currentTime = setSessionTime;
            passActivity = "Break";
            break;
        }
        $("#timer").text(secToTimeString(currentTime))
      } else {
        //Reduces the displayed time by 1 second.
        currentTime--;
        $("#timer").text(secToTimeString(currentTime))
      }
      // Changes the colour of the time remaining.
      var timePercent = Math.floor((currentTime / setSessionTime) * 100);
      if (timePercent <= 10) {
        $("#timer").css("color", "red");
      } else if (timePercent <= 25) {
        $("#timer").css("color", "yellow");
      } else {
        $("#timer").css("color", "green");
      }
    }
  });

  // Pauses the displayed time using the pause button.
  $(".pause_btn").click(function() {
    clearInterval(id);
    id = true;
    tempTime = currentTime;
    $("#timer").text(secToTimeString(currentTime))
    timeToggle = true;
  });

  // Stops and resets the displayed time to the last desired session time using the stop button.
  $(".stop_btn").click(function() {
    clearInterval(id);
    currentTime = setSessionTime;
    $("#timer").text(secToTimeString(setSessionTime));
    $("#timer").css("color", "#000");
    id = true;
    timeToggle = true;
    $(".current").text("Session");
  });

  // Total interface reset to default values using the refresh button.
  $(".refresh_btn").click(function() {
    // Stops the timer counter and resets the session time and break time to their default times.
    clearInterval(id);
    setSessionTime = 1500;
    setBreakTime = 300;
    currentTime = setSessionTime;

    // Resets the time and break counters to their default times.
    document.getElementById("session_time").innerHTML = Math.floor((setSessionTime) / 60);
    document.getElementById("break_time").innerHTML = Math.floor((setBreakTime) / 60);

    // Resets the timer div.
    $("#timer").text(secToTimeString(setSessionTime));
    $("#timer").css("color", "#000");

    // Resets the counter id variable and "timeToggle" allows button input.
    id = true;
    timeToggle = true;
    $(".current").text("Session");

  });

});