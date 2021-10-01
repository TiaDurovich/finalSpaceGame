// This function is responsible for generating the missile.gltf object in the scene

function Missile(scene, x, z) {
	
	var modelLoader = new THREE.GLTFLoader()
	this.model;

	modelLoader.load
		( 
			"../../assets/models/missile/missile.gltf", 
			(function(obj)
			{
				this.model = obj.scene;

				// Rotation, positioning & scaling of the missile.gltf object
				this.model.rotation.x = -Math.PI/2;

				this.model.position.set(x, -0.05, z);
				this.model.scale.set(0.005,0.005,0.005);

				scene.add(this.model);
			}).bind(this)
		)
	
	// Velocity of missile across the z-axis (3D) at a constant speed 
	// The velocity must be faster than that of the plane & camera so that the missile can reach the enemy before the plane
	this.update = function() {
		this.model.position.z -= 2.1;
	}

	// Upon "destroying"/coming into contact with an enemy object, the missile will be removed from the scene
	this.destroy = function() {
		scene.remove(this.model);
	}
}

