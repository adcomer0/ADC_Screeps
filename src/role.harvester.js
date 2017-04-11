var roleHarvester = {

    runRoutine: function(creep) {
        if(creep.pos != Game.flags.Container1.pos){
            creep.moveTo(Game.flags.Container1);
            //exit;
        }
        
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
	        var room2 = 'W3N5';
            if (creep.room.name == room1){
	            var target = creep.pos.findClosestByRange(FIND_SOURCES, {
	                filter: function(object){
	                    return (object.id === 'b357077426772ba');
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
                if(creep.carry.energy > 0) {
                    var link = creep.pos.findInRange(FIND_STRUCTURES, 3, {
	                    filter: function(object){
	                        return object.structureType == STRUCTURE_LINK;
	                       }
	                });
	                if (link[0]) {
	                    creep.transfer(link[0],RESOURCE_ENERGY,creep.carry.energy);
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
	        var target = creep.pos.findInRange(FIND_STRUCTURES, 3, {
	            filter: function(object){
	                return object.structureType == STRUCTURE_LINK;
	            }
	        })
	        if (target[0]) {
	            if (creep.transfer(target[0],RESOURCE_ENERGY,creep.carryCapacity) == ERR_FULL) {
	                creep.drop(RESOURCE_ENERGY, creep.carryCapacity);
	            }
	        } else {
                creep.drop(RESOURCE_ENERGY, creep.carryCapacity);
	        }
	    }
    }
};

module.exports = roleHarvester;
