// Main: has access to DOM and contains SceneManager


// create SceneManager
const canvas = document.getElementById("canvas");
const sceneManager = new SceneManager(canvas);

// handle DOM events
bindEventListeners();

// Render Loop 
render();

window.alert("Hello! Fly through space whilst collecting coins and destroying the enemy ships. To move the spaceship use the 'W, S, A & D' keys. To shoot ammunition press the spacebar. Have fun!");


function bindEventListeners() {
	window.onresize = resizeCanvas;
	resizeCanvas();	

	window.onkeydown = handleKeyDown;
	window.onkeyup = handleKeyUp;

}

function resizeCanvas() {
	canvas.style.width  = '100%';
	canvas.style.height = '100%';
	
	canvas.width  = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
    
    sceneManager.onWindowResize();
}

function handleKeyDown(event) {
	var keyCode = event.which;
	sceneManager.handleInput(keyCode, true);
}

function handleKeyUp(event) {
	var keyCode = event.which;
	sceneManager.handleInput(keyCode, false);
}

function render() {

    requestAnimationFrame(render);
    sceneManager.update();
}




