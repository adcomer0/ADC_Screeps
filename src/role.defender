var roleDefender = {

    runRoutine: function(creep) {
	    var dest = 'W3N3'
        if (creep.room.name != dest) {
            creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(dest)),{visualizePathStyle: {
                fill: 'transparent', 
                stroke: '#fff', 
                lineStyle: 'dashed', 
                strokeWidth: .15, 
                opacity: .1}});
        } else {
            if (creep.hits < creep.hitsMax) {
                creep.heal(creep);
            }
            var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
            if (hostiles.length > 0){
                if(creep.attack(hostiles[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(hostiles[0]);
                }
            } else {
                creep.moveTo(Game.flags.Flag2)
            }
        }
    }
};

module.exports = roleDefender;
