/*When using a Visualizer object, you need to supply the following methods:
loadData()
customAnim()
addObjs()
addLights()
*/

//x,y,z are for the camera's default position
function Visualizer (x, y, z) {
	
    /*var camera;
    var scene;
    var canvas;
    var renderer;
    var camCntrl;
    //Dimensions
    var width;
    var height;
    //Remember initial values for camera when resizing
    var origHeight;
    var tanFOV;*/
    //Camera variables
    this.view_angle = 45;
    //var aspect;
    this.near = 1;
    this.far = 10000;
    this.camX = x;
    this.camY = y;
    this.camZ = z;

    //var head;
    this.clock = new THREE.Clock();
    while (!this.clock) {}
    	alert(this.clock);

    //Keys
    this.ROT = 90;
    this.ZOOM = 88;
    this.PAN = 67;

    this.BLENDERSCALE = 7;
    this.FPS = 12;
    this.halt = false; //True stops the animation
    this.animOffset = 0; //Starting morphTarget in the animation
    this.duration = 1667; //in ms
    this.keyframes = 40;
    this.interpolation = this.duration / this.keyframes;
    this.lastKeyframe = 0;
    this.currentKeyframe = 0;

    this.speed = 1000;

    //Initializes the scene
    this.init = function() {
        //Set up the canvas to render on
        this.canvas = document.getElementById("container3D");

        //Create and start the renderer and add it to the canvas
        this.renderer = new THREE.WebGLRenderer( {antialias: true} );
        this.setCanvasSize(); //renderer.setSize(width, height);
        this.renderer.shadowMapEnabled = true; //Turn on shadows
        this.renderer.shadowMapSoft = true; //Anti-aliasing
        this.canvas.appendChild(this.renderer.domElement);
        
        //Create camera and scene
        this.scene = new THREE.Scene();
        this.aspect = this.width / this.height;
        this.addCamera();

        this.tanFOV = Math.tan( ( ( Math.PI / 180 ) * this.camera.fov / 2 ) ); //save it for resizing
        //alert (height);
        this.origHeight = this.height;

        //Disable text cursor on the canvas
        this.canvas.onselectstart = function() {
            return false;
        }

        //Add stuff to the scene
        this.addObjs(this.scene);
        this.addLights(this.scene);
        
        //Draw it
        this.renderer.setClearColorHex(0x000000, 1.0);
        this.renderer.clear(); //Sets the background color
        this.renderer.render(this.scene, this.camera);

        //Set up the keyboard handler
        document.addEventListener("keydown", this.handleKey, false);

        //Set up canvas resizing
        //window.addEventListener('resize', canvasResize, false);
        
        //Load the text files containing eeg values data
        this.loadData();

        //kickstart animation
        this.animate();
    }

    //Updates the canvas size on window resize
    //Uses solution from WestLangley: https://github.com/mrdoob/three.js/issues/1406#issuecomment-4207064
    //And here: http://learningthreejs.com/data/THREEx/docs/THREEx.WindowResize.html
    this.canvasResize = function() {
        if (this.canvas) {
            //width = window.innerWidth / 3; //Keep these the same as above when the variables width and height are declared
            //height = window.innerHeight / 3;


            this.setCanvasSize();

            //Adjust the camera so objects look the same when resizing
            this.camera.aspect = this.width / this.height;
            //camera.fov = ( 360 / Math.PI ) * Math.atan( tanFOV * ( width / origHeight ) );
            this.camera.updateProjectionMatrix();

            //renderer.setSize(width, height);
            //resetCam();

        }
    }

    this.setCanvasSize = function() {
        this.width = this.canvas.clientWidth;
        this.height = this.canvas.clientHeight;
        this.renderer.setSize(this.width, this.height);
    }

    this.handleKey = function(e) {
        if (e.keyCode == 32) { //Spacebar
            this.resetCam();
        } else if (e.keyCode == 38 && this.speed < 5000) { //Up Arrow
            this.speed += 100; //Speed up
        } else if (e.keyCode == 40 && this.speed > 0) { //Down Arrow
            this.speed -= 100; //Slow down
        } else if (e.keyCode == 49) { //Number 1 - sets camera to show left side
            this.resetCam();
            this.camera.position.set(55,0,0);
        } else if (e.keyCode == 50) { //Number 2 - sets camera to show front
            this.resetCam();
            this.camera.position.set(0,0,55);
        } else if (e.keyCode == 51) { //Number 3 - sets camera to show right side
            this.resetCam();
            this.camera.position.set(-55,0,0);
        } else if (e.keyCode == 52) { //Number 4 - sets camera to show back
            this.resetCam();
            this.camera.position.set(0,0,-55);
        }
    }

    //Puts the camera back at the starting position, rotation, etc
    this.resetCam = function(e) {
        this.scene.remove(this.camera);
        addCamera();
    }

    this.addCamera = function() {
        this.camera = new THREE.PerspectiveCamera( this.view_angle, this.aspect, this.near, this.far );
        this.scene.add(this.camera);
        //Move camera from its default position of (0,0,0)
        this.camera.position.set(this.camX, this.camY, this.camZ);

        //Controls to move the camera
        this.camCntrl = new THREE.TrackballControls(this.camera, this.renderer.domElement);
        this.camCntrl.keys = [this.ROT, this.ZOOM, this.PAN]; //rotate, zoom, pan

        //Reset the camera when spacebar pressed
        //document.addEventListener("keydown", handleKey, false);
    }

    //Animation Loop
    this.animate = function() {
        var time = this.clock.getElapsedTime();

        this.customAnim(time);

        this.canvasResize();

        //Update the view
        this.camCntrl.update();
        this.camera.lookAt(this.scene.position);
        this.renderer.render(this.scene, this.camera);

        if (!this.halt) {
            window.requestAnimationFrame(this.animate, this.renderer.domElement);
        }
    }


}