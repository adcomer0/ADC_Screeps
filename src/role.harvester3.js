var roleHarvester3 = {

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
        
        if(!creep.memory.harvesting && creep.carry.energy < 1) {
            creep.memory.harvesting = true;
            creep.say('harvesting');
	    }
	    else if (creep.memory.harvesting && creep.carry.energy == creep.carryCapacity){
	        creep.memory.harvesting = false;
	        creep.say('dumping');
	    }
        
        if(creep.memory.harvesting) {
	        var room1 = 'W3N3';
	        var room2 = 'W3N5';
            if (creep.room.name == room1){
	            var target = creep.pos.findClosestByRange(FIND_SOURCES, {
	                filter: function(object){
	                    return (object.id === '20cc07742d0761d');
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
            creep.drop(RESOURCE_ENERGY, creep.carryCapacity);
	    }
    }
    }
};

module.exports = roleHarvester3;
