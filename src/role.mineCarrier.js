var roleMineCarrier = {

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
        if(!creep.memory.harvesting && _.sum(creep.carry) < 1) {
            creep.memory.harvesting = true;
            creep.say('harvesting');
	    }
	    else if (creep.memory.harvesting && _.sum(creep.carry) == creep.carryCapacity){
	        creep.memory.harvesting = false;
	        creep.say('dumping');
	    }
        
        if(creep.memory.harvesting) {
	        var room1 = 'W3N4';
            if (creep.room.name == room1){
	            var target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
	                filter: function(object){
	                    return (object.resourceType != RESOURCE_ENERGY && object.amount > 0);
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
	                target = Game.getObjectById('467a029fcc5fb3c');
                    if (_.sum(target.store) > 250) {
	                    if(creep.withdraw(target,RESOURCE_OXYGEN) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target,{visualizePathStyle: {
                                fill: 'transparent', 
                                stroke: '#fff', 
                                lineStyle: 'dashed', 
                                strokeWidth: .15, 
                                opacity: .1}});
                        }
	                }
	                else {
	                    creep.moveTo(Game.flags.Flag8)
	                }
	            }
            }
	    }
	    else {
            var storage = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    filter: function (object) {
                        return (object.structureType == STRUCTURE_TERMINAL);
                    }
                });
                if (storage) {
                    if (creep.transfer(storage, RESOURCE_OXYGEN) == ERR_NOT_IN_RANGE){
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
};

module.exports = roleMineCarrier;
