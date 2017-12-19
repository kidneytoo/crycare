var date;
var time;
var duration;
var number = 1;

function getDate() {
	document.getElementById("demo").innerHTML = x;
}

var c = 0;
var min = 0;
var hr = 0;
var t;
var timer_is_on = 0;

function change(n) {
	return n > 9 ? "" + n: "0" + n;
}

function timedCount() {
    document.getElementById("txt").innerHTML = change(hr) + ":" + change(min) + ":" + change(c);
    c = c + 1;
    if(c % 100 == 0) {
    	c = 0;
    	min = min+1;
    }
    if(min % 60 == 0 && min!=0) {
    	min = 0;
    	hr = hr+1;
    }
    t = setTimeout(function(){ timedCount() }, 10);
}

function startCount() {
    if (!timer_is_on) {
        timer_is_on = 1;
        timedCount();
    }
}

function stopCount() {
    clearTimeout(t);
    timer_is_on = 0;
}

function cryingStart() {
	var x = Date();
	var y = x.split(" ");
	date = y[1]+","+y[2]+","+y[3];
	time = y[4];
	startCount();
}

function updateTable() {
	var table = document.getElementById("historyTab");
	var row = table.insertRow(number-1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	cell1.innerHTML = number;
	cell2.innerHTML = date;
	cell3.innerHTML = time;
	cell4.innerHTML = duration;
	number = number+1;
}

function changeToCry() {
	w3.toggleClass('.warningContainer','hide','show');
	cryingStart();
}

function changeToStop() {
	w3.toggleClass('.warningContainer','hide','show');
	stopCount();
	duration = change(hr) + ":" + change(min) + ":" + change(c);
	hr = 0;
	min = 0;
	c = 0;
	updateTable();
}

var socket = io();
socket.on('message', function(message) {
	if(message == 'startCrying') {
		changeToCry();
	} else if(message == 'stopCrying') {
		changeToStop();
	}
});
