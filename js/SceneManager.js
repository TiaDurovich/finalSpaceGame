// The overall function of SceneManager is responsible for handling the Three.js side of the game

function SceneManager(canvas) {

    // Automatically fits the scene to the users screen
    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    }
    
    // Variables and constants for the initialisation of the scene upon loading the webpage
    const scene = buildScene();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    
    var keyMap = [];

    var thePlane, theSkybox, theCoins, theEnemies;
    const dynamicSubjects = createSceneSubjects(scene);
    var theMissiles = [];


    // Variable to add ambient lighting to the scene, a cool feature leveraged from Three.js
    var ambientLight = new THREE.AmbientLight('#ffffff', 1.5)
    scene.add(ambientLight)

    // Variables to show the initial values displayed on the scoreboard upon loading the webpage
    var score = 0;
    var health = 3;
    var gameEnded = false;


    function buildScene() {
        const scene = new THREE.Scene();
        return scene;
    }

    // Function that builds of the game renderer (generation of the 3D game)
    function buildRender({ width, height }) {
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); 

        renderer.setClearColor("#222222") 
        renderer.setSize(width, height);

        return renderer;
    }

    // Functioning of the camera, this is the viewers perspective on the game
    // Constants are used to set static camera settings/characteristics 
    function buildCamera({ width, height }) {
        const aspectRatio = width / height;
        const fieldOfView = 30;
        const nearPlane = 0.1;
        const farPlane = 3000; 
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        
        // Fixed positioning of the camera (users point of view) along the y-axis (this determines how high the users POV is)
        camera.position.y = 0.65;
        return camera;
    }


    // Initialisation of objects within the scene
    function createSceneSubjects(scene) {
        theSkybox = new Skybox(scene);
        thePlane = new Plane(scene);
        theCoins = placeCoins(scene);
        theEnemies = placeEnemies(scene);

        // Array to maintain the plane (whiich is dynamic/moving), this needs to be updated with each new frame!
        const dynSubjs = [ thePlane ];

        return dynSubjs;
    }

    // Translation of the camera along the z-axis (3D) in order to match the movement of the plane (they are set to the same constant speed (0.4) along the same axis)
    // Notice that the if else statement is used to ensure that the camera only moves at this constant speed when health is greater than 0, therefore when health reaches 0 (or a value less), the camera will stop moving
    this.update = function() {

        if (camera.position.z > -2400 && health > 0) {

            camera.position.z -= 0.4;

            for(let i=0; i<dynamicSubjects.length; i++)
                if (dynamicSubjects[i].model) {
                	dynamicSubjects[i].update();
                }


            [theCoins, theEnemies, theMissiles, score, health] = checkCollision(thePlane, theCoins, theEnemies, theMissiles, score, health);

            theMissiles = deleteMissiles(theMissiles);


            // Rendering of the scene and camera
            renderer.render(scene, camera);


            // Conditional to execute spacebar[32] input from the user to shoot missiles
            if (thePlane.model) {
                thePlane.handleInput(keyMap, camera);
                
                // The missiles are stored within this array
                if (keyMap[32]) {
                    const m = thePlane.launchMissile();
                    dynamicSubjects.push(m);
                    theMissiles.push(m);
                    keyMap[32] = false;
                }
            }


        }
        // This else if statement ensures that the correct title is displayed
        // If health is greater than 0, the game is over "GAME OVER"
        // If health is anything but greater than 0 (<0), the user lost the game "YOU LOST"
        else if (!gameEnded) {

            gameEnded = true;
            if (health > 0)
                document.getElementById("gameover").innerHTML = "GAME OVER"; 
            else
                document.getElementById("gameover").innerHTML = "YOU LOST"; 
        }
    }



    // Function that automatically fits the scene to the users screen
    this.onWindowResize = function() {
        const { width, height } = canvas;

        screenDimensions.width = width;
        screenDimensions.height = height;

        renderer.setSize(width, height);

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }

    // Handles the users input (when keys are pressed), and prompts the coded outputs
    this.handleInput = function(keyCode, isDown) {

        keyMap[keyCode] = isDown;
    }


}
