$( document ).ready(() => {
	$('button')
		.animate({left: 300}, 2000)
		.animate({top: 200}, 1000)
		.fadeOut(222)
		.delay(2000)
		.queue(function(next) {
			$(this)
			.fadeIn(222)
			.html('Adeu!');
			next();
		})
});