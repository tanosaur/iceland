const SLIDER = document.querySelectorAll(".slide");
let _currentSlideIndex = SLIDER.length-1;
let _lastSlideIndex = 0;

function _shownewSlide() {
  SLIDER[_lastSlideIndex].className = "slide";
  SLIDER[_currentSlideIndex].className = "slide showing";
}

function _updateCounter() {
  let count = (_currentSlideIndex+1).toString();
  let total = SLIDER.length.toString();
  document.getElementById("counter").innerHTML = count + "/" + total;
}

function _incrementIndex() {
  _lastSlideIndex = _currentSlideIndex;
  _currentSlideIndex = (_currentSlideIndex+1)%SLIDER.length;
}

function _decrementIndex() {
  _lastSlideIndex = _currentSlideIndex;
  _currentSlideIndex = (_currentSlideIndex+(SLIDER.length-1))%SLIDER.length;
}

function _emitIndexChange(){
  _shownewSlide();
  _updateCounter();
}

function next() {
  _incrementIndex();
  _emitIndexChange();
  setTitleBasedOnIndex();
}

function previous() {
  _decrementIndex();
  _emitIndexChange();
}

(function enableClicking() {
  document.getElementById("slider").onclick = function(e) {
    next();
  };
})();

(function enableKeying() {
  document.addEventListener("keydown", nav, false);
  function nav(e) {
    let key = e.keyCode || e.which;
    if (key === 39) {
      next();
    } else if (key === 37) {
      previous();
    }
  }
})();

(function enableSwiping() {
  document.addEventListener("touchstart", handleTouchStart, false);
  document.addEventListener("touchmove", handleTouchMove, false);

  var xDown = null;
  var yDown = null;

  function handleTouchStart(e) {
      xDown = e.touches[0].clientX;
      yDown = e.touches[0].clientY;
  }

  function handleTouchMove(e) {
      if ( ! xDown || ! yDown ) {
          return;
      }

      var xUp = e.touches[0].clientX;
      var yUp = e.touches[0].clientY;

      var xDiff = xDown - xUp;
      var yDiff = yDown - yUp;

      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
          if ( xDiff > 0 ) {
              next();
          } else {
              previous();
          }
      }
      xDown = null;
      yDown = null;
  }
})();
