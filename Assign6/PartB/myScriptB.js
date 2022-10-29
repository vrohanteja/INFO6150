// Stores the status of the stopwatch
var started = false;
// Counter for seconds
var timer = 0;
var interval;
var minutes = 0;
var curTime;
var secsPerMin = 10.00;

function startToggle() {
    if (started == false) {
        started = true;
        disableStart();
        console.log("outer loop timer is ", timer);
        interval = setInterval(function () {
            timer = timer + 0.01;
            if (timer.toFixed(2) >= secsPerMin) {
                console.log("timer is ", timer);
                minutes = minutes + 1;
                timer = timer - secsPerMin;
            }
            curTime = minutes + ":" + timer.toFixed(2).replace( '.', ':');
            
            document.getElementById("cur_time").innerHTML = curTime;
        }, 10);
    }
}

function stop() {
    if (started == true) {
        started = false;
        enableStart();
        clearInterval(interval);
    }
}

function reset_time() {
    started = false;
    enableStart();
    clearInterval(interval);
    timer = 0.00;
    minutes = 0;
    document.getElementById("cur_time").innerHTML = timer;
}

// Can also use keys to control calculator. s to start, r to reset, anything else is not permitted and throws an error
document.addEventListener('keypress', function (event) {
    var key_val = event.key;
    if (key_val == 's') {
        startToggle();
    }
    else if (key_val == 'r') {
        reset_time();
    }
    else {
        alert("Please use the buttons, or type s to start, and r to reset");
    }
});


// Just using promise to show usage, start button is disabled after .1 second of pressing it, only reenabled after pressing stop or reset
function disableStart() {
    return new Promise(resolve => {
        setTimeout(() => {
          resolve(document.getElementById("startToggle").disabled = true) ;
        }, 100);
      });
}

function enableStart() {
    document.getElementById("startToggle").disabled = false;
}