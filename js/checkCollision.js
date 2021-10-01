// This function checks collisions in every frame between missile and enemy, enemy and place, and plane and coins
// The scoreboard is then changed accordingly

function checkCollision(thePlane, theCoins, theEnemies, theMissiles, score, health) {

    if (thePlane.model) {

        planeBB = new THREE.Box3().setFromObject(thePlane.model);

        // Handling collisions by determining intersection between two models using their positions and dimensions
        var i = theCoins.length;
        while (i--) {
            if (theCoins[i]) {
                coinBB = new THREE.Box3().setFromObject(theCoins[i].model);
                if (planeBB.intersectsBox(coinBB)) {
                    score += 1; // When the plane collides with a coin score is increased by 1
                    theCoins[i].destroy();
                    theCoins.splice(i, 1);
                    document.getElementById("scoreboard").innerHTML = "HEALTH: " + health + " &emsp; COINS: " + score; 
                } 
            }
        }

        var i = theEnemies.length;
        while (i--) {
            if (theEnemies[i]) {
                enemyBB = new THREE.Box3().setFromObject(theEnemies[i].model);

                if (planeBB.intersectsBox(enemyBB)) {
                    health -= 1; // When the plane collides with an enemy health is decrease by 1
                    theEnemies[i].destroy(); //Enemy is destroyed (removed from scene)
                    theEnemies.splice(i, 1);
                    document.getElementById("scoreboard").innerHTML = "HEALTH: " + health + " &emsp; COINS: " + score; 
                }
            }

            var j = theMissiles.length;
            while (j--) {
                if (theMissiles[j]) {
                    missileBB = new THREE.Box3().setFromObject(theMissiles[j].model);
                    if (missileBB.intersectsBox(enemyBB)) {
                        score += 2; // When a missile collides with an enemy score increase by 2
                        theEnemies[i].destroy(); // Enemy is destroyed (removed from scene)
                        theEnemies.splice(i, 1);
                        theMissiles[j].destroy(); // Missile is also destroyed (removed from scene)
                        theMissiles.splice(j, 1);
                        document.getElementById("scoreboard").innerHTML = "HEALTH: " + health + " &emsp; COINS: " + score; 
                    } 
                }
            }
        }
    }

    return [theCoins, theEnemies, theMissiles, score, health];

}
