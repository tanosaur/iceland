# iceland

## Contraints

- Keep design same (how it looks and how it works; the UI/UX)
- Optimise for 'cleanest code' - subject to debate, arguably most readable and level of specificity/generalisation is apt for its purpose
- On mobile, there is one display for portrait and one for landscape. Swipe backwards/forwards to go through slider. In portrait, instructions hide after a few swipes.
- On desktop, there is one display for narrower 'portrait' and one for wider screens 'landscape'. Click or arrow key to navigate slider. Instructions appear/disappear upon hover over slider.
- At some point in future, would be cool to have a full-screen function for the slider.
- Maybe one day, it'd be fun to have some kind of Easter egg-type, 'find something out about the author' thing.

## Extended constraints

- Got to appear on the web
- Let's use HTML, CSS, Javascript (debate re using a web-building framework vs. hand-coded?)
- DOM elements have to be listed in index.html and/or inserted by JS, at this point, a much-of-muchness
- Would be ideal to have image files read dynamically rather than listing them out

## How did I go?

### A

- What it does (function.js), looks like (device.js) and how it handles resize (view.js) are abstracted. In each, there is a fork for mobile and landscape.
- I look at this and can't help but wonder why I couldn't go with CSS media queries. This handles its initial display as well as display per resize event.
- function.js is cute but not clean. It's readable to some extent - you can follow the code along well. However, some of its functions are not clearly. In particular, _hideMobileSignifierAfterSomeClicksOrSwipes(*counter*) is obscured at top level because it is embedded in _enableSwiping() and also in _enableClicking(). Without checking back at top-level code it would also be unclear as to why _hideMobileSignifierAfterSomeClicksOrSwipes(*counter*)  is in these two.
- *currentSlide* and *counter* are kind of global variables, presumably because it was easier and/or made more sense to have another variable *counter* just to know when to hide the mobile signifier
- There is explicit manipulation to the DOM elements. I suppose this is fine, there has to be some definite part that animates, moves the UI. 

Immediate thoughts:

- Would like to investigate/remember why CSS media queries did not seem a solution
- A pub-sub model could work e.g. _hideMobileSignifierAfterSomeClicksOrSwipes(*counter*) subscribes to *counter*. Could it be too much infrastructure/overkill to recreate the whole site via pub-sub? That is, so that every UI element has a controller that responds to a signal to then determine how it is displayed ('Ah, full screen? Do this. Ah, mobile? Do this. Ah, 3rd to last slide? Do this.'). The wiring of such a model is just as explicit as explicit coding otherwise, maybe just more... decoupled?

### B

Doesn't fool me. Just A in more casing!

### C

Alas, it appears I tried the pub-sub model. 

- I've a simple event emitter/subscriber function.
- On load, the model is primed, which also updates the DOM. Also, the device and its orientation is 'emitted'. This then sets the display via a viewModelController. The viewModelController tells a viewModel which CSS file to use: 'MP.css' for mobile portrait, 'ML.css' for mobile landscape, 'DP.css' for desktop portrait, 'DL.css' for desktop landscape. 
- Interesting, I am thinking I remember now that perhaps there was difficulty with CSS media queries in that they could change the display with size but then not also specifically by device, so for example, mobile portrait and desktop portrait would render the same. In my application, they're very different.
- I think the code is incomplete but the approach worked. For full-screen, I suppose there would just be another event listener for full-screen that triggers an emit to the viewModelController for yet another CSS file. It wouldn't be explicit that the full-screen is only an option for desktop devices, though need it be? Unless the event listener was created somehow after/following/within the device trigger. Interesting to note _hideMobileSignifierAfterSomeClicksOrSwipes(*counter*) hasn't been implemented yet for this code. I suspect the same issue. Or, to clarify: relation between model and viewModel.

My instinct is that A, B, C are little different. I am trying to say the same explicit things about how this software works, just in different disguises. C might look more general; the wiring tells the story. There may be some tangible benefit to C if the application begins to scale. However... I don't believe the application will scale. Famous last words, but at this point I don't see the addition of functions beyond full-screen and the potential Easter egg/about the author. So, YAGNI?

I'm more interested in clarifying the relations between functions and display well, or in an even better way to put it, to tell the story of the build as accurately as possible via the code. So for example: "Let's change the display depending on whether it's mobile or desktop and portrait or landscape. There may be some shared functions across all displays, like clicking to change pictures, the changing of pictures. There are also some unique things, like on mobile if you swipe a couple times the instructions hide because I want more simplicity on the page. Maybe I'll add a full-screen function for desktop one day."

## Things that could be true

- Investigate functional programming
- Maybe I need to learn/redo bottom-up 'smart object'-style programming - last big exposure was the GUI I wrote for my thesis, so, long time ago and different application

## Reflecting on what is 'clean code' or the marker

Perhaps, as long as it is easy to read, easy to extend or change, and maintain, this is ideal. I do believe there are several near-ideal solutions that exist, optimising for least moving parts yet most flexible/extensible.