

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$main = $('#main');

	
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

		var $nav = $('#nav');

		if ($nav.length > 0) {

				$main
					.scrollex({
						mode: 'top',
						enter: function() {
							$nav.addClass('alt');
						},
						leave: function() {
							$nav.removeClass('alt');
						},
					});

				var $nav_a = $nav.find('a');

				$nav_a
					.scrolly({
						speed: 1000,
						offset: function() { return $nav.height(); }
					})
					.on('click', function() {

						var $this = $(this);

							if ($this.attr('href').charAt(0) != '#')
								return;

							$nav_a
								.removeClass('active')
								.removeClass('active-locked');

							$this
								.addClass('active')
								.addClass('active-locked');

					})
					.each(function() {

						var	$this = $(this),
							id = $this.attr('href'),
							$section = $(id);

							if ($section.length < 1)
								return;

							$section.scrollex({
								mode: 'middle',
								initialize: function() {

										if (browser.canUse('transition'))
											$section.addClass('inactive');

								},
								enter: function() {

										$section.removeClass('inactive');

										if ($nav_a.filter('.active-locked').length == 0) {

											$nav_a.removeClass('active');
											$this.addClass('active');

										}

										else if ($this.hasClass('active-locked'))
											$this.removeClass('active-locked');

								}
							});

					});

		}

		$('.scrolly').scrolly({
			speed: 1000
		});

})(jQuery);