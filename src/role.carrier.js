var roleCarrier = {

    runRoutine: function(creep) {
        var dest = 'W3N4'
            if (creep.room.name != dest) {
                creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(dest)),{visualizePathStyle: {
                    fill: 'transparent', 
                    stroke: '#fff', 
                    lineStyle: 'dashed', 
                    strokeWidth: .15, 
                    opacity: .1}});
            } else {
        if(!creep.memory.harvesting && creep.carry.energy < 1) {
            creep.memory.harvesting = true;
            creep.say('harvesting');
	    }
	    else if (creep.memory.harvesting && creep.carry.energy == creep.carryCapacity){
	        creep.memory.harvesting = false;
	        creep.say('dumping');
	    }
        
        if(creep.memory.harvesting) {
	        var room1 = 'W3N4';
	        var room2 = 'W2N7';
            if (creep.room.name == room1){
	            var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY, {
	                filter: function(object){
	                    return (object.amount > 200);
	                }
	            });
	            if (target){
	                if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target,{visualizePathStyle: {
                            fill: 'transparent', 
                            stroke: '#fff', 
                            lineStyle: 'dashed', 
                            strokeWidth: .15, 
                            opacity: .1}});
                    }
	            } else {
	                target = Game.getObjectById('5ebab65f7b8286d');
                    if (target.store.energy > 0) {
	                    if(creep.withdraw(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target,{visualizePathStyle: {
                                fill: 'transparent', 
                                stroke: '#fff', 
                                lineStyle: 'dashed', 
                                strokeWidth: .15, 
                                opacity: .1}});
                        }
	                } else {
                        target = Game.getObjectById('ee8531bdeb9ff6c');
                        if(creep.withdraw(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target,{visualizePathStyle: {
                                fill: 'transparent', 
                                stroke: '#fff', 
                                lineStyle: 'dashed', 
                                strokeWidth: .15, 
                                opacity: .1}});
                        }
                        
                        if(creep.withdraw(target,RESOURCE_ENERGY) == ERR_NOT_ENOUGH_ENERGY) {
                            creep.moveTo(Game.flags.Flag1);
                        }
                    }
	            }
            }
            if (creep.room.name == room2){
                var target = creep.pos.findClosestByRange(FIND_SOURCES, {
	                filter: function(object){
	                    return (object.id === '25020774762401f');
	                }
	            });
	        
                if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target,{visualizePathStyle: {
                        fill: 'transparent', 
                        stroke: '#ff0', 
                        lineStyle: 'dashed', 
                        strokeWidth: .15, 
                        opacity: .1}});
                }
            }
	    }
	    else {
            var structures = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: function (object) {
                    return ((object.structureType == STRUCTURE_EXTENSION || object.structureType == STRUCTURE_SPAWN) && object.energy < object.energyCapacity);
                }
            });
            if(structures){
                if (creep.transfer(structures, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(structures,{visualizePathStyle: {
                        fill: 'transparent', 
                        stroke: '#ff0', 
                        lineStyle: 'dashed', 
                        strokeWidth: .15, 
                        opacity: .1}});
	            }
            } else {
                var storage = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    filter: function (object) {
                        return (object.structureType == STRUCTURE_TOWER && object.energy < object.energyCapacity/3);
                    }
                });
                if (storage) {
                    if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(storage,{visualizePathStyle: {
                        fill: 'transparent', 
                        stroke: '#ff0', 
                        lineStyle: 'dashed', 
                        strokeWidth: .15, 
                        opacity: .1}});
                    }
                }
                else {
                    creep.moveTo(Game.flags.Flag1)
                }
            }
	    }
            }
    }
};

module.exports = roleCarrier;
