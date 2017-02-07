var roleTowerHarvester = {

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
	        var room1 = 'W1N7';
	        var room2 = 'W2N7';
            if (creep.room.name == room1){
	            var target = creep.pos.findClosestByRange(FIND_SOURCES, {
	                filter: function(object){
	                    return (object.id === 'ba3c0774d80c3a8');
	                }
	            });
	        
                if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target,{visualizePathStyle: {
                        fill: 'transparent', 
                        stroke: '#fff', 
                        lineStyle: 'dashed', 
                        strokeWidth: .15, 
                        opacity: .1}});
                }
            }
            if (creep.room.name == room2){
                var target = creep.pos.findClosestByRange(FIND_SOURCES, {
	                filter: function(object){
	                    return (object.id === '147e0774762a341');
	                }
	            });
	        
                if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target,{visualizePathStyle: {
                        fill: 'transparent', 
                        stroke: '#fff', 
                        lineStyle: 'dashed', 
                        strokeWidth: .15, 
                        opacity: .1}});
                }
            }
	    }
	    else {
            var structures = creep.room.find(FIND_STRUCTURES, {
                filter: function (object) {
                    return object.structureType === STRUCTURE_TOWER && object.energy < object.energyCapacity;
                }
            });
            if(structures.length > 0) {
                if (creep.transfer(structures[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(structures[0],{visualizePathStyle: {
                        fill: 'transparent', 
                        stroke: '#fff', 
                        lineStyle: 'dashed', 
                        strokeWidth: .15, 
                        opacity: .1}});
	            }
            } else {
                var extensionToBuild = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
                    filter: function(object){
                        return (object.structureType === STRUCTURE_EXTENSION);
                    }
                });
                if (extensionToBuild) {
                    if(creep.build(extensionToBuild) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(extensionToBuild,{visualizePathStyle: {
                                fill: 'transparent', 
                                stroke: '#fff', 
                                lineStyle: 'dashed', 
                                strokeWidth: .15, 
                                opacity: .1}});
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
                            creep.moveTo(dest,{visualizePathStyle: {
                                fill: 'transparent', 
                                stroke: '#fff', 
                                lineStyle: 'dashed', 
                                strokeWidth: .15, 
                                opacity: .1}});
                        }
                    } else {
                        var structures = creep.room.find(FIND_MY_STRUCTURES, {
                            filter: function (object) {
                                return object.energy < object.energyCapacity;
                            }
                        });
                        if (creep.transfer(structures[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(structures[0],{visualizePathStyle: {
                                fill: 'transparent', 
                                stroke: '#fff', 
                                lineStyle: 'dashed', 
                                strokeWidth: .15, 
                                opacity: .1}});
	                    }
                    }
	            }
            }
	    }
    }
};

module.exports = roleTowerHarvester;
