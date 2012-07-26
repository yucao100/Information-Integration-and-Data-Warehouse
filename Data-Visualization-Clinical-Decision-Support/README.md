Data Visualization for Clinical Decision Support
================================================

`Readme v0.1 - 07-24-2012`

Contents
--------

* I. Project Description
* II. Requirements
* III. Installation and Usage
* IV. Files Manifest
* V. Bugs and Unfinished Features
* VI. Acknowledgments

I. Project Description
----------------------

The goal of the Data Visualization for Clinical Decision Support project is to be an effective, efficient, and intuitive way to present various biomedical data. The way we chose to do this was to create a web application that can be used on desktop or mobile platforms. This software is intended to allow doctors and therapists to more easily make decisions regarding their patients, based on these visualizations.

II. Requirements
----------------

This web app requires a web browser compatible with HTML5 and JavaScript to run, and can take a while to load. It also requires PHP to be set up on the server it runs on. PHP is only used for the jqueryFileTree connector. If you can't use PHP, the app can be made to work using one of the other connectors, as long as you make modifications to the connector similar to the ones I made to the PHP connector.

III. Installation and Usage
---------------------------

These instructions will get the app ready on a localhost so you can modify and update the project. To deploy it to an actual webserver, follow whatever steps are required by that webserver.

To get the files, go to https://github.com/yucao100/Information-Integration-and-Data-Warehouse and click on "Downloads" to download them in a .zip or .tar.gz file, or use the 'git clone' command in the git shell. You will need to extract or clone the files to the root directory of your web server. The github repository includes other projects, but this readme file deals only with the Data Visualization project. All the files associated with this project are located in the 'Data-Visualization-Clinical-Decision-Support' subfolder. On my setup for example, I would type `git clone git@github.com:yucao100/Information-Integration-and-Data-Warehouse.git C:\wamp\www` in the git shell. This allows me to access the web app by typing "http://localhost/Data-Visualization-Clinical-Decision-Support/" into my browser.

When you open the web app, you are presented with 5 panels, each containing a visualization of a different kind of data. The first looks like a stick figure and visualizes motion recorded with the Kinect. The Kinect tracks 20 points on a person, together making up a skeleton. Each of these 20 points has a series of x, y, and z coordinates that track its position through time. Our visualization renders a sphere for each point, and renders a number of lines connecting them to look like a stick figure. As the points change position, the lines follow them, and the stick figure performs the movements recorded by the Kinect.

The second, showing a beating heart, visualizes heart rate data captured with ECG. Each ECG data file consists of a series of beats per minute (BPM) values. The model of a heart beats faster or slower depending on the loaded data, and the actual BPM values are also displayed.

The third panel displays a head with several colored spots on it, and visualizes brain activity captured with EEG. This visualization is intended to be used with the [Emotiv EPOC neuroheadset](http://www.emotiv.com/store/hardware/epoc-bci/epoc-neuroheadset/), which records EEG data from 14 different points on the patient's head. Each point on the EPOC headset corresponds to a node on the 3D model of a head, and the color of each one varies according to the value of the EEG data. The color range is a rainbow, with low values being visualized as red and high values as blue. The data is loaded from files, one for each EPOC point, which contain the sequence of values for that node.

Note that the app could easily be changed to work with any other EEG headset. The number and location of nodes on the head model would require modification in eeg.html. Also, adjustments would need to be made to the number of data files in the /PatientData/ subfolders.

Next, an animated model visualizes fall detection and ADL detection captured by a smartphone app. The data for this visualization consists of a sequence of activity codes. When each code is loaded, the corresponding activity is animated and the model is shown performing that activity. Additionally, the kind of activity is displayed in text to avoid ambiguity.

Finally, we visualize walking speed with a model of a running figure. A single value for distance traveled and a single value for average walking speed are loaded and output in a textual format. The speed of the walking animation is then adjusted accordingly, so that it speeds up with higher average speed values and slows down for the opposite.

Each panel has a number of buttons along the side that let you adjust the view of that particular visualization. In order from top to bottom, they:
* Change the camera to a front view
* Change the camera to a left view
* Change the camera to a right view
* Change the camera to a rear view
* Revert the camera to its original position
* Enlarge the panel to take up the majority of the screen (click the button again to make it revert to its normal size)
* Zoom in the camera
* Zoom out the camera

In the upper right corner is the "Load" link. Clicking this opens a dialog that lets you select the patient data to visualize. To close this dialog, click "Load" again.

At the bottom of the page is a timeline slider, which shows what point in the sequence of data is currently being visualized in the five panels. The button above this slider pauses and unpauses the sequence of data. To visualize a specific point in the sequence, click the pause button and then click and drag the slider. You cannot move the slider unless it is paused.

To edit the files just edit the HTML, JavaScript, CSS, and PHP files in your favorite editor. All the data files are just normal .txt files so they are easy to modify as well.

The 3D models were created in [Blender](http://www.blender.org/) (a free 3D modeling program for Windows, Mac, and Linux) and exported using the Three.js plugin. There are lots of Blender tutorials online, and the ones I used while during development are listed in the Acknowledgments section. Instructions for installing the import/export plugin can be found [here](https://github.com/mrdoob/three.js/issues/143) or in its readme. If a model doesn't look right in Three.js after you export it, change the settings when you export it. Make sure "Flip YZ" is checked, or your model may end up on its side. If the model is too small in Three.js, change the "Scale" value when you export. Check "Colors" and/or "Materials" to carry the colors/materials you used in Blender over into Three.js. If the model is to be animated, be sure to check "Animation," otherwise leave it unchecked to make the file smaller.

IV. Files Manifest
------------------

### Web pages:
* index.html - The main file containing the app.
* kinect.html - Contains the Kinect data visualization panel.
* ecg.html - Contains the ECG data visualization panel.
* eeg.html - Contains the EEG data visualization panel.
* fall.html - Contains the Fall and ADL Detection data visualization panel.
* gait.html - Contains the Walking Speed data visualization panel.

### JavaScripts:
* jquery-1.7.2.min.js - jQuery API.
* jquery.scrollTo-1.4.2-min.js - jQuery plugin for jumping to part of a page.
* rainbowvis.js - RainbowVis, which provides the color gradient used in the EEG visualization panel.
* TrackballControlsCustom.js - Customized version of default Three.js camera controls to allow zoom buttons.
* /freqdec-fd-slider-4cd0633/ - Contains the FD-Slider used in the timeline.
* /jqueryFileTree/ - Contains the file tree that lets us pick which patient data to visualize.
* /mrdoob-three.js-46c0a84/ - Contains the Three.js library that makes all the 3D modeling possible.

### Stylesheets:
* styles.css - Stylesheet for our custom styles (some of the libraries have their own stylesheets in their subfolders).
* /1140_CssGrid_2/ - Contains the grid layout used to design the layout of the app.

### 3D Models:
* Heart.js - Heart used in the ECG panel.
* Lee-Perry-Smith.js - Head used in the EEG panel.
* PersonAnimTest.js - Walking person used in the Walking Speed panel.
* /fall_detection/ - Contains the animations for the Fall and ADL Detection panel (each animation is saved as a separate model).

### Other:
* /PatientData/ - Contains the (for now) dummy patient data to be visualized. Sorted into a separate folder for each patient, and further organized into separate folders for each exercise or recording session.
* /icons/ - Contains the image files used for the GUI buttons, both the PNGs in the app and the XCF (GIMP format) used to make them.
* README.md - This readme file.

V. Bugs and Unfinished Features
-------------------------------

* If you pause the timeline, drag the slider to a new position, and unpause it, the slider will snap to the location it was paused at. It should instead unpause from the new location you dragged it to.
* Sometimes the Kinect data doesn't load correctly the first time, and lines are drawn between incorrect nodes. Usually reloading the data set fixes the issue. This bug requires further investigation.
* The GUI buttons are probably too small for mobile use.
* The app needs to be tested with actual data.
* Security features need to be added to protect patients' data.
* Display the number of thecurrent frame of data above the timeline slider. For example, if the loaded data has 50 values, show which of the 50 is currently being visualized. It would be a simple numerical output of the current place in the various data arrays.
* Add buttons next to the timeline's pause button to speed up or slow down the timeline (adjust the variable animMultiplier in index.html).
* Some ADL animations from a list provided by Dr. Cao have not been created yet. These are as follows: Lying down on a bed, Rising from a lying position on a bed, Walking backwards, Stumbling, Limping, and Tripping over an object.
* The original plan was to have video as another visualization panel. I had planned to use Video.js (videojs.com) for this.
* The model used in the walking speed visualization ought to be redone so its running looks more natural.
* Most of the JS and CSS have not been minified yet.

VI. Acknowledgments
-------------------

Developed by Chris Lenk, under direction from Dr. Yu Cao at the University of Tennessee in Chattanooga during the summer of 2012.

This app uses the following frameworks and libraries:
* [WebGL](http://webgl.org/) - low-level 3D graphics API
* [Three.js](http://mrdoob.github.com/three.js/) - 3D library that makes working with WebGL a lot easier
* [jQuery](http://jquery.com/) - very useful JavaScript library
* [RainbowVis](http://github.com/anomal/RainbowVis-JS/) - library for color gradients, used in EEG visualization
* [jQuery File Tree](http://abeautifulsite.net/blog/2008/03/jquery-file-tree/) - jQuery plugin for file selection
* [FD-Slider](http://github.com/freqdec/fd-slider/) - HTML5 range element polyfill, used for the timeline slider
* [jQuery ScrollTo](http://flesler.blogspot.com/2007/10/jqueryscrollto.html) - jQuery plugin for scrolling to particular part of the page
* [1140 CSS Grid](http://cssgrid.net/) - Fluid grid layout

The following Three.js tutorials were used to learn the library, and some of my code is based off of them:
* [Getting Started With Three.js](http://aerotwist.com/tutorials/getting-started-with-three-js/) by Paul Lewis
* [Basics of Three.js](http://fhtr.org/BasicsOfThreeJS/) by Ilmari Heikkinen
* [Casting Shadows](http://learningthreejs.com/blog/2012/01/20/casting-shadows/) by Jerome Etienne
* [Window Resize for Your Demos](http://learningthreejs.com/blog/2011/08/30/window-resize-for-your-demos/) by Jerome Etienne
* [Three.js: Importing a Model](http://96methods.com/2012/02/three-js-importing-a-model/) by Graham Blake
* [Three.js + Blender 2.5 = FTW](http://kadrmasconcepts.com/blog/2011/06/06/three-js-blender-2-5-ftw/)
* [Three.js + Blender Part 2](http://kadrmasconcepts.com/blog/2011/06/08/three-js-blender-part-2/)
* [From Blender to Threefab. Exporting three.js morph animations](http://kadrmasconcepts.com/blog/2012/01/24/from-blender-to-threefab-exporting-three-js-morph-animations/)
* [Three.js - Animating Blender Models](http://catchvar.com/threejs-animating-blender-models/)
* The many examples at the [official Three.js site](http://mrdoob.github.com/three.js/)

The following Blender tutorials were used to learn basic 3D modeling and to create the models in the app:
* [Get Started With Blender](http://cgcookie.com/blender/get-started-with-blender/)
* [Blender 3D: Noob to Pro](http://en.wikibooks.org/wiki/Blender_3D:_Noob_to_Pro/)
* [Modelling a simple heart in Blender 2.54](http://liquidblue.com.br/2010/11/01/modelling-a-simple-heart-in-blender-2-54/) by Sergio Moura
* [Your First Animation in 30 plus 30 Minutes Part I](http://wiki.blender.org/index.php/Doc:2.6/Manual/Your_First_Animation/1.A_static_Gingerbread_Man/)
* [Blender Summer of Documentation Character Animation tutorial](http://wiki.blender.org/index.php/Doc:2.4/Tutorials/Animation/BSoD/Character_Animation/)

The app also uses the [head model released by Lee Perry-Smith](http://ir-ltd.net/infinite-3d-head-scan-released/).
