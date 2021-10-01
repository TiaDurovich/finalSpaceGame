// Entry point to all Javascript aspects of the game
// Contains SceneManager
// Regulates & handles the DOM


// Creating SceneManager
const canvas = document.getElementById("canvas");
const sceneManager = new SceneManager(canvas);

// Handles DOM events
bindEventListeners();

// Render Loop 
render();

// Alert that displays upon loading the webpage, gives instructions for users
window.alert("Hello! Fly through space whilst collecting coins and destroying the enemy ships. To move the spaceship use the 'W, S, A & D' keys. To shoot ammunition press the spacebar. Have fun!");


// Event listeners to "listen" for when the W, or S key is pushed, this handles the input and moves the scene (by resizing it) forward/backward depending on the users input
function bindEventListeners() {
	window.onresize = resizeCanvas;
	resizeCanvas();	

	window.onkeydown = handleKeyDown;
	window.onkeyup = handleKeyUp;

}

// Function to automatically fit the canvas (which renders 2D shaped) so that it fills 100% of the users screen
function resizeCanvas() {
	canvas.style.width  = '100%';
	canvas.style.height = '100%';
	
	canvas.width  = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
    
    sceneManager.onWindowResize();
}

//Below is code that processes the press and release of keys by the user on their keybord (handling user input)
// Function to manage the output when the user presses down on a relevant key 
function handleKeyDown(event) {
	var keyCode = event.which;
	sceneManager.handleInput(keyCode, true);
}
// Function to manage the output whtn the user release a relevant key
function handleKeyUp(event) {
	var keyCode = event.which;
	sceneManager.handleInput(keyCode, false);
}

// This rendering function tells the browser that we wish to perform an animation
// It requests that the browser calls a specific function to update an animation before the next repaint
//This method takes a callback as an argument to be undertaken before the repaint
function render() {

    requestAnimationFrame(render);
    sceneManager.update();
}




