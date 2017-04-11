var roleAttacker = {

    runRoutine: function(creep) {
	    var dest = 'W1N0';
	    var dest2 = 'W1N1';
        if (creep.room.name != dest && creep.room.name != dest2) {
            creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(dest)),{visualizePathStyle: {
                fill: 'transparent', 
                stroke: '#fff', 
                lineStyle: 'dashed', 
                strokeWidth: .15, 
                opacity: .1}});
        } else if (creep.room.name == dest) {
            var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker')
            if (attackers.length < 0) {
                creep.moveTo(Game.flags.Flag7);
            }
            else {
                creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(dest2)),{visualizePathStyle: {
                    fill: 'transparent', 
                    stroke: '#fff', 
                    lineStyle: 'dashed', 
                    strokeWidth: .15, 
                    opacity: .1}});
            }
        } else if (creep.room.name == dest2) {
            if (creep.hits < creep.hitsMax) {
                creep.heal(creep);
            }
            var hostileTower = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES,{
                filter:function(object){
                    return (object.structureType == STRUCTURE_TOWER)
                }
            })
            if (hostileTower){
                if (creep.attack(hostileTower) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(hostileTower,{visualizePathStyle: {
                        fill: 'transparent', 
                        stroke: '#fff', 
                        lineStyle: 'dashed', 
                        strokeWidth: .15, 
                        opacity: .1}});
                }
            } else {
                var hostile = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
                if (hostile){
                    if (creep.attack(hostile) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(hostile,{visualizePathStyle: {
                            fill: 'transparent', 
                            stroke: '#fff', 
                            lineStyle: 'dashed', 
                            strokeWidth: .15, 
                            opacity: .1}});
                    }
                } else {
                    var hostileSpawn = creep.pos.findClosestByPath(FIND_HOSTILE_SPAWNS);
                    if (hostileSpawn){
                        if (creep.attack(hostileSpawn) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(hostileSpawn,{visualizePathStyle: {
                                fill: 'transparent', 
                                stroke: '#fff', 
                                lineStyle: 'dashed', 
                                strokeWidth: .15, 
                                opacity: .1}});
                        }
                    } else {
                        var hostileStructures = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES);
                        if (hostileStructures){
                            if (creep.attack(hostileStructures) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(hostileStructures,{visualizePathStyle: {
                                    fill: 'transparent', 
                                    stroke: '#fff', 
                                    lineStyle: 'dashed', 
                                    strokeWidth: .15, 
                                    opacity: .1}});
                            }
                        } else {
                            creep.moveTo(Game.flags.Flag6)
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleAttacker;
