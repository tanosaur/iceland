(function (document) {

  const prototype = {

    init: function () {
      this.currentSlide = 0;
      this.currentStory = 0;
      this.stories = document.querySelectorAll('.story');
      this.story = this.stories[this.currentStory].querySelectorAll('.slide');
      this.enableKeying();
    },

    _nextSlide: function(){
      this.story[this.currentSlide].className = 'slide';
    	this.currentSlide = (this.currentSlide+1)%this.story.length;
    	this.story[this.currentSlide].className = 'slide showing';
    },

    _previousSlide: function(){
      this.story[this.currentSlide].className = 'slide';
    	this.currentSlide = (this.currentSlide+(this.story.length-1))%this.story.length;
    	this.story[this.currentSlide].className = 'slide showing';
    },

    _getStory: function(){
      return this.story = this.stories[this.currentStory].querySelectorAll('.slide');
    },

    _upStory: function(){
      this.story[this.currentSlide].className = 'slide';
      this.currentStory = (this.currentStory+(this.stories.length-1))%this.stories.length;
      this._getStory()[this.currentSlide].className = 'slide showing';
    },

    _downStory: function(){
      this.story[this.currentSlide].className = 'slide';
      this.currentStory = (this.currentStory+1)%this.stories.length;
      this._getStory()[this.currentSlide].className = 'slide showing';
    },

    enableKeying: function() {
      document.onkeydown = (function(e) {
        key = e.keyCode || e.which;
        if (key === 39) {this._nextSlide()}
        else if (key === 37) {this._previousSlide()}
        else if (key === 38) {this._upStory()}
        else if (key === 40) {this._downStory()}
      }).bind(this);

    },

  };

  const slideshow = Object.create(prototype);
  document.addEventListener("DOMContentLoaded", slideshow.init());

})(document);
