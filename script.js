$(function() {
	var $window = $(window),
		$document = $(document),
		transitionSupported = typeof document.body.style.transitionProperty === 'string',
		scrollTime = 1; // scroll time in seconds

	$("a[href*=#]:not([href=#])").on("click", function(e) {
		var target,
			avail,
			scroll,
			deltaScroll;
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			target = $(this.hash);
			target = target.length ? target : $("[id=" + this.hash.slice(1) + "]");

			if (target.length) {
				avail = $document.height() - $window.height();

				if (avail > 0) {
					scroll = target.offset().top;
					if (scroll > avail) {
						scroll = avail;
					}
				} else {
					scroll = 0;
				}

				deltaScroll = $window.scrollTop() - scroll;
				if (!deltaScroll) {
					return;
				}

				e.preventDefault();
				if (transitionSupported) {
					$("html").css({
						"margin-top": deltaScroll + "px",
						"transition": scrollTime + "s ease-in-out"
					}).data("transitioning", scroll);
				} else {
					$("html, body").stop(true, true)
					.animate({
						scrollTop: scroll + 'px'
					}, scrollTime * 1000);
					return;
				}
			}
		}
	});
	if (transitionSupported) {
		$("html").on("transitionend webkitTransitionEnd msTransitionEnd oTransitionEnd", function(e) {
			var $this = $(this),
				scroll = $this.data("transitioning");
			if (e.target === e.currentTarget && scroll != null) {
				$this.removeAttr("style").data("transitioning", null);
				$("html, body").scrollTop(scroll);
			}
		});
	}
});