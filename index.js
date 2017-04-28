var STATUS = "IDLE";
var currentStatus = +new Date();
window.localStorage.setItem('currentStatus', currentStatus);
window.localStorage.setItem('status', STATUS);

var timer = new Timer({
    tick: 1,
    ontick: function(sec) {
        console.log('interval', sec);
        $('.tick').text(getValue(Math.ceil((sec || 0) / 1000)));
    },
    onstart: function(sec) {
        console.log("sec on start", sec);
    },
    onend: function(sec) {
        $('.tick').text(getValue(Math.ceil((sec || 0) / 1000)));
        setTimeout(function() {
            $('.tick').text("STOP");
        }, 1000);
        setTimeout(function() {
            $('.tick').text(getValue(0));
        }, 2000);
    }
});
// timer.start(10);

function startTimer(value) {
    STATUS = 'RUNNING';
    $('.tick').text(getValue(value));
    timer.start(value);
}

function getValue(value) {
    var sec = value % 60;
    if (sec < 10) {
        sec = "0" + sec;
    }
    var minutes = Math.floor(value / 60);
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    return minutes + ":" + sec;
}

var house = localStorage.getItem('house');
var houseName = localStorage.getItem('h' + house) || "";
$('.house-name').text(houseName);

window.addEventListener("storage", function() {
    var status = localStorage.getItem('status');
    var value = localStorage.getItem('value');
    var house = localStorage.getItem('house');
    var houseName = localStorage.getItem('h' + house) || "";
    $('.house-name').text(houseName);
    if (status === 'start') {
        timer.stop();
        startTimer(value);
    } else if (status === 'setvalue') {
        timer.stop();
        // setTimeout(function() {
        $('.tick').text(getValue(value));
    } else if (status === 'stop') {
        timer.stop();
    } else if (status === 'reset') {
        timer.stop();
        $('.tick').text(getValue(value));
    }
    localStorage.setItem('status', "IDLE");
}, false);