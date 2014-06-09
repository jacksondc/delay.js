window.addEventListener('load', function() {
	var timer;

	var delayButtons = document.querySelectorAll('.delay-button');

	for (var i = 0; i < delayButtons.length; i++)
	{
	    delayButtons[i].addEventListener('click', delayClicked, false);
	}

	function delayClicked(e) {
	    // On click
	    var el = e.target;
	    var state = el.dataset.delayState === "true";

		var time = parseInt(el.dataset.delayTime);
		var delaySuccess = el.dataset.delaySuccess;
		var delayDefault = el.dataset.delayDefault;
		if(!time || time === 0) { time = 5000; el.dataset.time = time; }
		if(!delaySuccess || delaySuccess === "") { success = "Undo"; el.dataset.delaySuccess = delaySuccess; }
		if(!delayDefault || delayDefault === "") { delayDefault = el.innerHTML; el.dataset.delayDefault = delayDefault; }

		if(state) {
			//we are undoing
			el.dataset.delayState = false;
			setButton(el, delayDefault);
			clearTimeout(timer);
			var delayUndoEvent = new CustomEvent("delay-undone");
			el.dispatchEvent(delayUndoEvent);
		} else {
			//we are starting
			el.dataset.delayState = true;
			setButton(el, delaySuccess);

			var delayStartEvent = new CustomEvent("delay-started");
			el.dispatchEvent(delayStartEvent);
			
			timer = setTimeout(function() {
				state = el.dataset.delayState;
				if(state) {
					setButton(el, delayDefault);
					el.dataset.delayState = false;

					var delayConfirmEvent = new CustomEvent("delay-confirmed");
					el.dispatchEvent(delayConfirmEvent);
				}
			}, time);
		}

	};

	function setButton(element, message) {
		element.innerHTML = message;
	}

	window.addEventListener('beforeunload', leave, false);

	function leave(){
	    var delayButtons = document.querySelectorAll('.delay-button');
		var delayConfirmEvent = new CustomEvent("delay-confirmed");
		for (var i = 0; i < delayButtons.length; i++)
		{
			if(delayButtons[i].dataset.delayState === "true") {
				console.log('state is true');
		    	delayButtons[i].dispatchEvent(delayConfirmEvent);
		    }
		}
	}
}, false);
