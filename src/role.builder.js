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
            var room1 = 'W1N7';
	        var room2 = 'W2N7';
            if (creep.room.name == room1){
                var extensionToBuild = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
                    filter: function(object){
                        return (object.structureType === STRUCTURE_EXTENSION);
                    }
                });
                if (extensionToBuild) {
                    if(creep.build(extensionToBuild) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(extensionToBuild,{visualizePathStyle: {
                                fill: 'transparent', 
                                stroke: '#00f', 
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
                                stroke: '#00f', 
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
                                stroke: '#00f', 
                                lineStyle: 'dashed', 
                                strokeWidth: .15, 
                                opacity: .1}});
	                    }
                    }
	            }
            }
            if (creep.room.name == room2){
                var extensionToBuild = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
                    filter: function(object){
                        return (object.structureType === STRUCTURE_EXTENSION);
                    }
                });
                if (extensionToBuild) {
                    if(creep.build(extensionToBuild) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(extensionToBuild,{visualizePathStyle: {
                                fill: 'transparent', 
                                stroke: '#00f', 
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
                                stroke: '#00f', 
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
                        if (structures.length > 0) {
                            if (creep.transfer(structures[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                                creep.moveTo(structures[0],{visualizePathStyle: {
                                    fill: 'transparent', 
                                    stroke: '#00f', 
                                    lineStyle: 'dashed', 
                                    strokeWidth: .15, 
                                    opacity: .1}});
	                        }
                        } else {
                            var structuresToRepair = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                                filter: function(object){
                                    return ((object.structureType == STRUCTURE_ROAD || object.structureType == STRUCTURE_RAMPART || object.structureType == STRUCTURE_WALL) && object.hits < object.hitsMax/3);
                                }
                            });
                            if(structuresToRepair) {
                                if (creep.repair(structuresToRepair) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(structuresToRepair,{visualizePathStyle: {
                                        fill: 'transparent', 
                                        stroke: '#f00', 
                                        lineStyle: 'dashed', 
                                        strokeWidth: .15, 
                                        opacity: .1}});
                                    }
                            }
                        }
                    }
	            }
            }
	    }
	    else {
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
                        stroke: '#00f', 
                        lineStyle: 'dashed', 
                        strokeWidth: .15, 
                        opacity: .1}});
                }
            }
            if (creep.room.name == room2){
                var target;
	            if (creep.room.storage.store.energy > 10000) {
	                if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
	                    creep.moveTo(creep.room.storage,{visualizePathStyle: {
                            fill: 'transparent', 
                            stroke: '#fff', 
                            lineStyle: 'dashed', 
                            strokeWidth: .15, 
                            opacity: .1}});
	                }
	            } else {
	                target = creep.pos.findClosestByRange(FIND_SOURCES, {
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
	    }
	}
};

module.exports = roleBuilder;
