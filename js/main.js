(function() {
	var slide,
		slideList,
		slideTrack,
		gallery,
		btnLeft,
		btnRight;

	slideList = document.getElementsByClassName('slide');
	slideTrack = document.querySelector('.slide-container');
	console.log(slideTrack.offsetWidth);
	slide = {
		height: slideList[0].offsetHeight,
		divWidth:  slideList[0].offsetWidth,
		margin: parseInt(window.getComputedStyle(slideList[0], null).marginLeft),
		get width() {
			return this.divWidth + (2 * this.margin);
		}
	};
	slideTrack.style.width = slide.width * slideList.length + 'px';
	console.log(slideTrack.style.width);


})();


  /*<div class="slide-wrapper-parent">
        <!--a class="collection-link" href="http://localhost/collections/show/11" style="float:left;"><< Back to Collection</a-->
        <div class="slide-wrapper-visible" style="clear:both;"> <!-- border/padding/margin styles -->
            <button class="carousel-btn left">&laquo;</button>
            <button class="carousel-btn right">&raquo;</button>
            <div class="slide-wrapper-mask">
                <div class="slide-container">
                    <!-- current item -->
                    <div class="slide">Item 1</div>*/