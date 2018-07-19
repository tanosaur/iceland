(function (document) {

  let currentStory = 0;
  let currentSlide = 0;

  let stories = document.querySelectorAll('.story');
  let story = stories[currentStory].querySelectorAll('.slide');

  function _getStory() {
    return story = stories[currentStory].querySelectorAll('.slide');
  }

  function _nextSlide () {
    story[currentSlide].className = 'slide';
  	currentSlide = (currentSlide+1)%story.length;
  	story[currentSlide].className = 'slide showing';
  };

  function _previousSlide(){
  	story[currentSlide].className = 'slide';
  	currentSlide = (currentSlide+(story.length-1))%story.length;
  	story[currentSlide].className = 'slide showing';
  };

  function _upStory(){
  	story[currentSlide].className = 'slide';
  	currentStory = (currentStory+(stories.length-1))%stories.length;
  	_getStory()[currentSlide].className = 'slide showing';
  };

  function _downStory(){
    story[currentSlide].className = 'slide';
  	currentStory = (currentStory+1)%stories.length;
  	_getStory()[currentSlide].className = 'slide showing';
  };

  function init () {
    document.onkeydown = function(e) {
      let key = e.keyCode || e.which; // why originally undeclared?

      if (key === 39) {
        _nextSlide()
      }
      else if (key === 37) {
        _previousSlide()
      }
      else if (key === 38) {
        _upStory()
      }
      else if (key === 40) {
        _downStory()
      };

    };
  };

  document.addEventListener( "DOMContentLoaded", init());

})(document);
