// This function removes the missiles from the scene once they reach a certain distance along the z-axis

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
