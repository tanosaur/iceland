# iceland

## Contraints

- Keep design same (how it looks and how it works; the UI/UX)
- Optimise for 'cleanest code' - subject to debate, arguably most readable and apt for its scale and purpose
- On mobile, there is one display for portrait and one for landscape. Swipe backwards/forwards to go through slider. In portrait, instructions hide after a few swipes. [PIC]
- On desktop, there is one display for narrower 'portrait' screens and one for wider 'landscape' screens. Click or arrow key to navigate slider. Title transitions to instructions upon hover over slider. [PIC][PIC]
- At some point in future, would be cool to have a full-screen function for the slider.
- Maybe one day, it'd be fun to have some kind of Easter egg-type, 'find something out about the author'-type thing.
- Let's use vanilla HTML/CSS/JavaScript.

## Some background info

- Can read here for my UI/UX process
- We use the term 'signifier' to mean the instruction that pops up indicating how to use the slider. It is from Don Norman's Design of Everyday Things. Technically, the counter is a signifier too, indicating to the user there is more than one image on the page; there is a slider.

## Schema

[Elements and actions]
[Next and prev]
[Mobile and desktop]

We could eliminate some of these by delegating to the DOM. The DOM could be: slider, title, mobile-signifier, desktop-signifier, counter. In this case, we wouldn't have to set separate signifiers. The DOM could also be: bounding-box-for-desktop, bounding-box-for-mobile, etc. This means we wouldn't have to restructure the DOM for a view in desktop. The specificity has to exist somewhere, therefore, this decision may be much of a muchness. Here, we have chosen to continue keeping the DOM as clutter-free as possible. This encourages manipulating the DOM via JS, which may prove simpler and more sustainable for future iterations.

## Proposal, 24 May

This proposed solution contains no explicit frameworks e.g. MVC, publish-subscribe, revealing module pattern. It does strive to follow an abstraction in the simplest way. The thought is that this code is then easily reviewed and structured into frameworks as necessary. 

### Calls

To load files via server-side code or insert them explicitly?

*Insert them explicitly* This refers to the image files for the slider. While having code dynamically look up and load files is a cool idea, KISS - I'm not likely to change my slider order or content much.

Writing a pub-sub type emitter or explicitly linking together functions?

*Insert them explicitly* We have a pseudo-emitter  in there for when the index changes. It then tells the relevant elements to change based on the index. I figure it's the same as any other type of emitter right now because there is no privacy/model structure to the code. Eventually, an emitter has to know where and how to link.

To pass variables around or create global variables?

*Hm* I already know the answer to this one. My response to this is - yes, we can get to it when we consider relevant frameworks. Taking a step back, I wonder what kind of security or good practice is needed for a program of this scale and purpose. Is it apt to have all out in the open, when no other programs are expected to interface? What does minimalism vs. good practice mean? You tell me.

To change views by CSS media queries or use alternate CSS files?

*CSS media queries for now* Here we've the approach of delegating as much as possible to CSS media queries and wherever we can't, we do via JS. I'm on the fence if this is a good approach. I'm influenced by someone and perhaps something I've read that using multiple CSS files is shameful. On the other hand, I see its benefits. The view change per device/orientation is explicit as read from the JS file. I've experimented by adding the desktop full-screen function, which can be initiated by pressing 'Enter' and closed by hitting 'Escape'. This is a view change that is inaccessible by CSS media queries because it is a user option on the same browser size. There are now CSS changes made via JS. If we were to add many other view changes, I propose it'd be cleaner and more consistent to create separate CSS files called in the JS. I'm uncertain whether it would perform adversely or be more error-prone. 

To use 'if' statements or not...

*Yes, a few* An emitter was trialled so that 'if desktop or mobile' and 'if portrait or landscape' was removed. This simply passed the if statement on to another part of the code. 

### Options, going forward

#### Revealing module pattern or similar
It'd be worth trying to abstract a slider and/or index object from other parts of the program.

#### Functional programming approach
We could write functions within an object, call a method to perform a method on all methods in object. Potentially perform the same operations on a mobile object and desktop object. I can see a very streamlined build this way especially if the view is written as separate CSS files than in media queries. On the other hand, it could just be some organisational sugar. I'd like to try organising the code in a different way anyway. I've an interest in learning functional programming approaches.

## Alternatives

### MVC

### Other wild styles

## Personal reflection

Feel free to go ahead read my two reflections this week.

