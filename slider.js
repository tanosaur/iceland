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
  setTitleBasedOnIndex(forwards = true);
}

function previous() {
  _decrementIndex();
  _emitIndexChange();
  setTitleBasedOnIndex(forwards = false);
}
