const events = {
  events: {},
  on: function (eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  },
  off: function(eventName, fn) {
    if (this.events[eventName]) {
      for (var i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      }
    }
  },
  emit: function (eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(function(fn) {
        fn(data);
      });
    }
  }
};

// function getFiles() {
//   const folder = 'images/';
//   const fs = require('fs');
//
//   fs.readdir(testFolder, (err, files) => {
//     files.forEach(file => {
//       console.log(file);
//     });
//   });
//
// }

const model = (function() {
  let _title = 'Iceland: Landscapes &amp; Textures';
  const SLIDER = document.querySelectorAll(".slide");
  const MOBILE_SIGNIFIER = 'Click or swipe left/right<BR/>Rotate to enlarge';
  const DESKTOP_SIGNIFIER = 'Click or arrow key to next';
  let _currentSlideIndex = 0;
  let _lastSlideIndex = 1;

  function _update() {
    SLIDER[_lastSlideIndex].className = "slide";
    SLIDER[_currentSlideIndex].className = "slide showing";
    _updateDOM();
  }

  function _nextSlide() {
    _lastSlideIndex = _currentSlideIndex;
    _currentSlideIndex = (_currentSlideIndex+1)%SLIDER.length;
    console.log(_currentSlideIndex);
    _update();
  }

  function _previousSlide() {
    _lastSlideIndex = _currentSlideIndex;
    _currentSlideIndex = (_currentSlideIndex+(SLIDER.length-1))%SLIDER.length;
    _update();
  }

  function _makeTitle() {
    document.getElementById("title").innerHTML = _title;
  }

  function _makeSignifier() {
    document.getElementById("mobile-signifier").innerHTML = MOBILE_SIGNIFIER;
    document.getElementById("desktop-signifier").innerHTML = DESKTOP_SIGNIFIER;
  }
  function _makeCounter() {
    let count = (_currentSlideIndex+1).toString();
    let total = SLIDER.length.toString();
    document.getElementById("counter").innerHTML = count + "/" + total;
  }
  function _updateDOM() {
    _makeTitle();
    _makeSignifier();
    _makeCounter();
  }

  return {
    nextSlide: _nextSlide,
    previousSlide: _previousSlide,
    update: _update,
  };
})();

const viewModelController = (function () {
  let _device = '';
  let _orientation = '';

  function _setDevice(device) {
    _device = device;
  }

  function _setOrientation(orientation) {
    _orientation= orientation;
    deviceAndOrientationInitials = _device + _orientation;
    events.emit('requestView', deviceAndOrientationInitials);
  }

  function _setCSS(cssFile){
    let link = document.getElementsByTagName("link").item(0);
    link.href = 'css/' + cssFile;
  }

  return {
    setDevice: _setDevice,
    setOrientation: _setOrientation,
    setCSS: _setCSS,
  };
})();

const viewModel = (function () {
  let _lookup = {
    'MP': 'MP.css',
    'ML': 'ML.css',
    'DP': 'DP.css',
    'DL': 'DL.css',
  };

  function _getCSS(deviceAndOrientationInitials) {
    events.emit('sendView', _lookup[deviceAndOrientationInitials]);
  }

  return {
    getCSS: _getCSS,
  };

})();

function emitDevice() {
  let device = "D";
  if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) device = "M";
  events.emit("detectDevice", device);
}

function emitOrientation() {
  let orientation = "L";
  if (window.innerHeight > window.innerWidth) {orientation = "P";}
  events.emit("detectOrientation", orientation);
}

function load() {
  emitDevice();
  emitOrientation();
  model.update();
}

function actualResizeHandler() {emitOrientation();}

var resizeTimeout;
function resizeThrottler() {
  // ignore resize events as long as an actualResizeHandler execution is in the queue
  if ( !resizeTimeout ) {
    resizeTimeout = setTimeout(function() {
      resizeTimeout = null;
      actualResizeHandler();

     // The actualResizeHandler will execute after duration of ms
   }, 200);
  }
}

// CONNECTORS
events.on("detectDevice", viewModelController.setDevice);
events.on("detectOrientation", viewModelController.setOrientation);
events.on("requestView", viewModel.getCSS);
events.on("sendView", viewModelController.setCSS);

// VIEW EVENTS
load();
window.addEventListener("orientationchange", emitOrientation);
window.addEventListener("resize", resizeThrottler);

document.onkeydown = function(e) {
  let key = e.keyCode || e.which;

  if (key === 39) {
    model.nextSlide();
  }
  else if (key === 37) {
    model.previousSlide();
  }
};
