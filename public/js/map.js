$(document).ready( function () {
	var closed = false;
	var scrolled = false;

	$('#left').draggable();
	$('#right').draggable();

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
			$('#statspage').css('margin-top','100%');
			$('#scrollhere').text("view saved locations");
			$('#dragme').css('opacity','.99');
			$('#infome').css('opacity','.99');
			scrolled = false;
		}
	});
});