$(document).ready( function () {
	var closed = false;
	var scrolled = false;

	$('#dragme').draggable();
	$('#infome').draggable();

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

	$('#scrollhere').click( function(){
		if( !scrolled ){
			$('#statspage').css('margin-top','0px');
			$('#scrollhere').text("go back to map");
			$('#dragme').css('opacity','0');
			$('#infome').css('opacity','0');
			scrolled = true;
		}
		else {
			$('#statspage').css('margin-top','50%');
			$('#scrollhere').text("click here for more information");
			$('#dragme').css('opacity','1');
			$('#infome').css('opacity','1');
			scrolled = false;
		}
	});
});