// This function removes the missiles from the scene when they come into contact with an enemy object

function deleteMissiles(theMissiles) {

    var j = theMissiles.length;
    while (j--) {
        if (theMissiles[j].model && theMissiles[j].model.position.z < -2400) {
            theMissiles[j].destroy();
            theMissiles.splice(j, 1);
        }
    }

    return theMissiles;
}
