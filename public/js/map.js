$(document).ready( function () {
	var closed = false;

	$('#dragme').draggable();

	$('#collapse').click(function() {
		if (!closed ) {
			$('#dragme').css('height','52px');
			$('#dragme').css('width','52px');
			closed=true;
		}

		else {
			$('#dragme').css('height','auto');
			$('#dragme').css('width','auto');
			closed=false;
		}
	});
});