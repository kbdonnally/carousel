(function() {
	var slide,
		slideList,
		slideTrack,
		gallery,
		btnLeft,
		btnRight;

	slideList 		= document.getElementsByClassName('slide');
	slideTrack 		= document.querySelector('.slide-container');
	btnLeft 		= document.querySelector('.left');
	btnRight 		= document.querySelector('.right');
	gallery 		= {
					  elem: 	 		document.querySelector('.slide-wrapper-visible'),
					  get width() {
										return this.elem.offsetWidth;
					  },
					  get padding() {
					  					return parseInt(window.getComputedStyle(this.elem, null).paddingLeft);
					  },
					  get visibleWidth() {
					  					return this.width - (2 * this.padding);
					  }
					  };
	slide 			= {
					  height: 	 		slideList[0].offsetHeight,
					  divWidth:  		slideList[0].offsetWidth,
					  margin: 	 		parseInt(window.getComputedStyle(slideList[0], null).marginLeft),
					  percentOfTotal: 	100 / slideList.length,
					  get width() {
						  				return this.divWidth + (2 * this.margin);
					  }
					  };
	
	// set track width, margin, translation
	slideTrack.style.width = slide.width * slideList.length + 'px';
	console.log(slide.percentOfTotal);
	slideTrack.setAttribute('data-translateX', "0");

	// recognize pan and swipe events on slide track
	var sliderManager = new Hammer.Manager(slideTrack, {
	recognizers: [
		[Hammer.Pan,{ threshold:0 }],
		[Hammer.Swipe,{ direction: Hammer.DIRECTION_HORIZONTAL }],
	]
	});

	var lastDelta,
		percentage,
		moveBy,
		numSlidesVisible,
		alignTest;

	// set max translation
	var maxTranslateX = -100 + (((gallery.elem.offsetWidth - (2 * gallery.padding)) / slideTrack.offsetWidth) * 100);
	console.log(maxTranslateX);

	// pan slides on touch
	sliderManager.on('panright panleft panend pancancel', function(e) {
		console.log(e.type);
		lastDelta = slideTrack.getAttribute("data-translateX");
		if (e.type === 'panleft') {
			btnLeft.classList.remove('hide-btn');
		}
		if (e.type === 'panright') {
			btnRight.classList.remove('hide-btn');
		}
		percentage = 100 * e.deltaX / (slide.width * slideList.length);
		moveBy = percentage + parseFloat(lastDelta);
		slideTrack.style.transform = `translateX(${moveBy}%)`;

		sliderManager.on('panend', function(e) {
			slideTrack.setAttribute('data-translateX', moveBy);
			if (parseFloat(moveBy) >= 0) {
				btnLeft.classList.add('hide-btn');
				slideTrack.style.transform = `translateX(0)`;
				slideTrack.setAttribute('data-translateX', 0);
			} else if (parseFloat(moveBy) <= maxTranslateX) {
				btnRight.classList.add('hide-btn');
				slideTrack.style.transform = `translateX(${maxTranslateX}%)`;
				slideTrack.setAttribute('data-translateX', maxTranslateX);
			}
		});
	});

	// hide nav if active slide on load is 1st/last in collection
	if (slideTrack.getAttribute("data-translateX") >= 0) {
		btnLeft.classList.add("hide-btn");
	}
	if (slideTrack.getAttribute("data-translateX") <= maxTranslateX) {
		btnRight.classList.add("hide-btn");
	}

	// enable button nav
	btnRight.addEventListener('click', carouselBtn, false);
	btnLeft.addEventListener('click', carouselBtn, false);

	function carouselBtn(e) {
		var maxTranslateX = -100 + (((gallery.elem.offsetWidth - (2 * gallery.padding)) / slideTrack.offsetWidth) * 100);
		lastDelta = slideTrack.getAttribute("data-translateX");
		numSlidesVisible = Math.floor(gallery.visibleWidth / slide.width);
		percentage = 100 * numSlidesVisible / slideList.length;
		if (e.target.classList.contains("right")) {
			percentage = percentage * -1;
		}
		moveBy = percentage + parseFloat(lastDelta);
		alignTest = lastDelta / slide.percentOfTotal;

		console.log(maxTranslateX - lastDelta);
		console.log(maxTranslateX - moveBy);
		console.log(moveBy.toFixed(1));
		// how to move content
		if (Math.abs((maxTranslateX - lastDelta)) < slide.percentOfTotal && (maxTranslateX - lastDelta) < 0) {
			slideTrack.style.transform = `translateX(${maxTranslateX}%)`;
			slideTrack.setAttribute('data-translateX', maxTranslateX);
		} else if (moveBy.toFixed(1) == 0) {
			slideTrack.style.transform = `translateX(0)`;
			slideTrack.setAttribute('data-translateX', 0);
		} else if ((alignTest.toFixed(1) % 1) === 0) {
			slideTrack.style.transform = `translateX(${moveBy}%)`;
			slideTrack.setAttribute('data-translateX', moveBy);	
		} else {
			moveBy = moveBy - ((alignTest % 1) * slide.percentOfTotal);
			slideTrack.style.transform = `translateX(${moveBy}%)`;
			slideTrack.setAttribute('data-translateX', moveBy);
		}
		// show/hide buttons
		if (slideTrack.getAttribute("data-translateX") < 0) {
			btnLeft.classList.remove("hide-btn");
		} else if (slideTrack.getAttribute("data-translateX") >= 0) {
			btnLeft.classList.add("hide-btn");
		}

		if (slideTrack.getAttribute("data-translateX") <= maxTranslateX) {
			btnRight.classList.add("hide-btn");
		} else if (slideTrack.getAttribute("data-translateX") > maxTranslateX) {
			btnRight.classList.remove("hide-btn");
		}
	}
})();
