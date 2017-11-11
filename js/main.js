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
					  elem: 	 document.querySelector('.slide-wrapper-visible'),
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
					  height: 	 slideList[0].offsetHeight,
					  divWidth:  slideList[0].offsetWidth,
					  margin: 	 parseInt(window.getComputedStyle(slideList[0], null).marginLeft),
					  percentOfTotal: 100 / slideList.length,
					  get width() {
						  return this.divWidth + (2 * this.margin);
					  }
					  };
	
	// set track width, margin, translation
	slideTrack.style.width = slide.width * slideList.length + 'px';
	console.log(slideTrack.style.width);
	console.log(slide.percentOfTotal);
	console.log(1 == .99999999999.toFixed(2));
	//slideTrack.style.marginLeft = 0;
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
		numSlidesVisible;


	// pan slides on touch
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

	// enable buttons
	btnRight.addEventListener('click', carouselBtn, false);
	btnLeft.addEventListener('click', carouselBtn, false);

	function carouselBtn(e) {
		lastDelta = slideTrack.getAttribute("data-translateX");
		numSlidesVisible = Math.floor(gallery.visibleWidth / slide.width);
		percentage = 100 * numSlidesVisible / slideList.length;
		if (e.target.classList.contains("right")) {
			percentage = percentage * -1;
		}
		moveBy = percentage + parseFloat(lastDelta);
		var alignTest = lastDelta / slide.percentOfTotal;
		console.log(alignTest.toFixed(1));
		if ((alignTest.toFixed(1) % 1) === 0) {
			slideTrack.style.transform = `translateX(${moveBy}%)`;
			slideTrack.setAttribute('data-translateX', moveBy);
			console.log(moveBy);	
		} else {
			console.log(alignTest % 1);
			moveBy = moveBy - ((alignTest % 1) * slide.percentOfTotal);
			slideTrack.style.transform = `translateX(${moveBy}%)`;
			slideTrack.setAttribute('data-translateX', moveBy);
			console.log(moveBy);
		}
		
	}
	
})();
