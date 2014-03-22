var el = document.querySelector('#action-button');
el.addEventListener('delay-confirmed', function() { displayMessage('Your action has been confirmed!'); }, false);
el.addEventListener('delay-undone', function() { displayMessage('Your action has been undone :('); }, false);
el.addEventListener('delay-started', function() { displayMessage('Your action has been started.'); }, false);

function slideDown(elem) {
	elem.style.maxHeight = '1000px';
	// We're using a timer to set opacity = 0 because setting max-height = 0 doesn't (completely) hide the element.
	elem.style.opacity   = '1';
}

function displayMessage(message) {
	//$('#report').append('<p>Your action is complete!</p>');
	var el = document.createElement("p");
	el.innerHTML = message;
	//$(el).appendTo("#report").hide().slideDown('slow');
	var report = document.querySelector("#report");
	report.appendChild(el);
	//animate(report.lastChild, "height", "px", 0, 14, 1000)
	setTimeout(function() { slideDown(report.lastChild)}, 1);
}