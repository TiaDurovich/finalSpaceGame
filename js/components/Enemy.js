// This function generates the object enemy.gltf within the scene
// This file is linked to placeEnemy.js, containing a function that randomly places the objects genertaed here

function Enemy(scene, x, z) {
	
	var modelLoader = new THREE.GLTFLoader()
	this.model;

	modelLoader.load
		( 
			"../../assets/models/enemy/enemy.gltf", 
			(function(obj)
			{
				this.model = obj.scene;

				// Rotation, size & positioning of the object
				this.model.rotation.y = -Math.PI / 2;
				this.model.rotation.x = Math.PI / 24;

				this.model.position.set(x, 0, z);
				this.model.scale.set(0.0018,0.0018,0.0018);

				scene.add(this.model);
			}).bind(this)
		)
	
	// If the enemy object gits hit by a missile, it is removed from the scene 
	this.destroy = function() {
		scene.remove(this.model);
	}
}

