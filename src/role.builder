var roleBuilder = {
    runRoutine: function(creep) {

	    if(creep.memory.building && creep.carry.energy < 1) {
            creep.memory.building = false;
            creep.say('harvesting');
	    }
	    else if (!creep.memory.building && creep.carry.energy == creep.carryCapacity){
	        creep.memory.building = true;
	        creep.say('building');
	    }

	    if(creep.memory.building) {
            var extensionToBuild = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
                filter: function(object){
                    return (object.structureType === STRUCTURE_EXTENSION);
                }
            });
            if (extensionToBuild) {
                if(creep.build(extensionToBuild) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(extensionToBuild);
                    }
            } else {
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                var dest;
	            try {
	                dest = creep.pos.findClosestByRange(targets);
	            }
	            catch (e) {
	                console.log(e);
	            }
            
                if(dest) {
                    if(creep.build(dest) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(dest);
                    }
                }
	        }
	    }
	    else {
	        var target = creep.pos.findClosestByRange(FIND_SOURCES, {
	            filter: function(object){
	                return (object.id === 'ba3c0774d80c3a8');
	            }
	        });
	        
            if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
	    }
	}
};

module.exports = roleBuilder;
