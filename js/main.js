(function() {
	var slide,
		slideList,
		slideTrack,
		gallery,
		btnLeft,
		btnRight;

	// initialize variables
	slideList 		= document.getElementsByClassName('slide');
	slideTrack 		= document.querySelector('.slide-container');
	btnLeft 		= document.querySelector('.left');
	btnRight 		= document.querySelector('.right');

	gallery 		= {
					  elem: 	 document.querySelector('.slide-wrapper-visible'),
					  get width() {
						return this.elem.offsetWidth;
					  }
					  };

	slide 			= {
					  height: 	 slideList[0].offsetHeight,
					  divWidth:  slideList[0].offsetWidth,
					  margin: 	 parseInt(window.getComputedStyle(slideList[0], null).marginLeft),
					  get width() {
						  return this.divWidth + (2 * this.margin);
					  }
					  };
	

	// set track width
	slideTrack.style.width = slide.width * slideList.length + 'px';
	console.log(slideTrack.style.width);

	// create slide manager for touch events
	// in English: can recognize pan and swipe events on slide track
	var sliderManager = new Hammer.Manager(slideTrack, {
	recognizers: [
		[Hammer.Pan,{ threshold:0 }],
		[Hammer.Swipe,{ direction: Hammer.DIRECTION_HORIZONTAL }],
	]
	});

	// pan slides on touch
	var lastDelta,
		percentage,
		moveBy;

	slideTrack.style.marginLeft = 0;
	slideTrack.setAttribute('data-translateX', "0");

	sliderManager.on('panmove', function(e) {
		lastDelta = slideTrack.getAttribute("data-translateX");
		console.log(lastDelta);
		percentage = 100 * e.deltaX / (slide.width * slideList.length);
		console.log(percentage);
		moveBy = percentage + parseFloat(lastDelta);
		console.log(moveBy);
		slideTrack.style.transform = `translateX(${moveBy}%)`;
		sliderManager.on('panend', function(e) {
			slideTrack.setAttribute('data-translateX', moveBy);
		});
	});


	
})();
