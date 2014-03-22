/*=============
=   JQUERY    =
=============*/

var timer;

$('.delay-button').click(function(e){
	var $el = $(e.target);
	var state = $el.data('delay-state');

	var time = $el.data('delay-time');
	var delaySuccess = $el.data('delay-success');
	var delayDefault = $el.data('delay-default');
	if(!time) { time = 5000; $el.data('delay-time', time); }
	if(!delaySuccess) { success = "Undo?"; $el.data('delay-success', success); }
	if(!delayDefault) { delayDefault = $el.html(); $el.data('delay-default', delayDefault); }

	if(state == true) {
		//we are undoing
		$el.data('delay-state', false);
		setButton($el, delayDefault);
		clearTimeout(timer);
	} else {
		//we are starting
		$el.data('delay-state', true);
		setButton($el, delaySuccess);
		
		timer = setTimeout(function() {
			var state = $el.data('delay-state');
			if(state) {
				setButton($el, delayDefault);
				$el.data('delay-state', false);

				$el.trigger('delay-confirm');
			}
		}, time);
	}
});
function setButton(element, message) {
	$(element).html(message);
}

$(window).bind('beforeunload', function() {
    var x =leave();
    return x;
});

function leave(){
    $('.delay-button').trigger('delay-confirm');
}