let currentSlideIndex = 1;
let totalNumberOfSlides = document.querySelectorAll(".slide").length;

let slide = {
  //currentSlideIndex
  imgsrc: "",
};

let signifier = {
  mobile: false,
  noOfSwipes: 0,
  mobileSignifier: "Click or swipe left/right<BR/>Rotate to enlarge",
  desktopSignifier: "Click or arrow key to next",
};

let counter = {
  //currentSlideIndex: 0,
  totalSlides: 0,
};

let title = {
  mostSlides: "Iceland: Textures &amp; Landscapes",
  secondLastSlide: "I have looked in temples, churches and mosques...",
  lastSlide: "I have walked through rivers, valleys and streams...",
  forwards: true,
  //currentSlideIndex: 0;
};


function setTitle(currentSlideIndex) {
  if (currentSlideIndex == (totalNumberOfSlides-1)) {
    document.getElementById("title").innerHTML = title.secondLastSlide;
  } else if (currentSlideIndex == (totalNumberOfSlides)) {
    document.getElementById("title").innerHTML = title.LastSlide;
  } else {
    document.getElementById("title").innerHTML = title.mostSlides;
  }
}

function setSignifier() {
  if (signifier.mobile == false) {
    document.getElementById("signifier").innerHTML = signifier.desktopSignifier;
  } else {
    if (noOfSwipes == 3) {
      hideMobileSignifier();
    } else {
      document.getElementById("signifier").innerHTML = signifier.mobileSignifier;
    }
  }
}

const load = (function(){
  setTitle(currentSlideIndex);
  setSignifier();
  showSlide(currentSlideIndex);
})();

load();
