// This function generates the skybox (3D world) that the game is set in

function Skybox(scene, height) {
	
	const textureLoader = new THREE.TextureLoader()
	
	// Particular size of the cube used, all other objects must be altered to fir these dimensions
	var geometry = new THREE.CubeGeometry(3000, 3000, 3000)

	var cubeMaterials = 
	[
		// Each of these mesh materials accounts for one of the walls of the 3D cube world
		// In my game the camera (users POV) is fixed, so you can only see the front texture/image, however, if the game was altered so the camera could move, the five other textures/images would be visible
		new THREE.MeshBasicMaterial({ map: textureLoader.load("../../assets/textures/lightBlueGalaxy/back.png"), side: THREE.DoubleSide }),
		new THREE.MeshBasicMaterial({ map: textureLoader.load("../../assets/textures/lightBlueGalaxy/front.png"), side: THREE.DoubleSide }),
		new THREE.MeshBasicMaterial({ map: textureLoader.load("../../assets/textures/lightBlueGalaxy/bot.png"), side: THREE.DoubleSide }),
		new THREE.MeshBasicMaterial({ map: textureLoader.load("../../assets/textures/lightBlueGalaxy/left.png"), side: THREE.DoubleSide }),
		new THREE.MeshBasicMaterial({ map: textureLoader.load("../../assets/textures/lightBlueGalaxy/right.png"), side: THREE.DoubleSide }),
		new THREE.MeshBasicMaterial({ map: textureLoader.load("../../assets/textures/lightBlueGalaxy/top.png"), side: THREE.DoubleSide }),
	]
	var material = new THREE.MeshFaceMaterial(cubeMaterials)

	var cube = new THREE.Mesh(geometry, material)

	// Positioning of the 3D cube world in the scene
	cube.rotation.x = Math.PI / 2;
	cube.position.z = -1490;

	// Adding the cube to the scene
	scene.add(cube)

}

