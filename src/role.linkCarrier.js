var roleLinkCarrier = {

    runRoutine: function(creep) {
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
	            var target = Game.getObjectById('ddd26cb48a45ecc');
	            //if(target.energy >= 400) {
	                if(creep.withdraw(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target,{visualizePathStyle: {
                            fill: 'transparent', 
                            stroke: '#fff', 
                            lineStyle: 'dashed', 
                            strokeWidth: .15, 
                            opacity: .1}});
                    }
	            //}        
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
            var storage = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: function (object) {
                    return (object.structureType == STRUCTURE_STORAGE);
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
        }
    }
};

module.exports = roleLinkCarrier;
