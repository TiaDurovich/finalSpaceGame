// This function generates a 3D sphere (leveraged from Three.js) of a specific radius and colour to act as the coin in the game
// This file is linked to placeCoins.js, containing a function that randomly places the objects created here

function Coin(scene, x, z) {

	const radius = 0.2;
	const geometry = new THREE.SphereGeometry( radius, 16, 16 );
	const material = new THREE.MeshBasicMaterial( { color: 0xfbb000 } );
	this.model = new THREE.Mesh( geometry, material );	
	this.model.position.set(x, 0, z);
	
	// Adding the coin objects to the scene
	scene.add(this.model);

	this.destroy = function() {
		scene.remove(this.model);
	}
}

