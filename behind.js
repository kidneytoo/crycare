var date;
var time;
var duration;
var number = 1;
var color;

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
	if(color==0) {
		row.style.backgroundColor = "lightblue";
	}
	else if(color==1) {
		row.style.backgroundColor = "orange";
	}
	else {
		row.style.backgroundColor = "red";
	}
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
	if(hr<3){
		color = 0;
	}
	else if(hr<5){
		color = 1;
	}
	else {
		color = 2;
	}
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
<<<<<<< HEAD

function clearTable() {
	var tab = document.getElementById("historyTab");
	tab.innerHTML = "";
	number = 1;
}
=======
>>>>>>> f8066c85b0da30ecc96e419eae28c41ef1371154
