var roleMiner = {

    runRoutine: function(creep) {
        if(creep.pos != Game.flags.Container3.pos){
            creep.moveTo(Game.flags.Container3);
            //exit;
        }
        
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
	        var room2 = 'W3N5';
            if (creep.room.name == room1){
	            var target = creep.pos.findClosestByRange(FIND_MINERALS, {
	                filter: function(object){
	                    return (object.id === 'd2596164d952827');
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
                if(_.sum(creep.carry) > 0) {
                    var link = creep.pos.findInRange(FIND_STRUCTURES, 3, {
	                    filter: function(object){
	                        return object.structureType == STRUCTURE_LINK;
	                       }
	                });
	                if (link[0]) {
	                    creep.transfer(link[0],RESOURCE_OXYGEN,_.sum(creep.carry));
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
	            if (creep.transfer(target[0],RESOURCE_OXYGEN,_.sum(creep.carry)) == ERR_FULL) {
	                creep.drop(RESOURCE_OXYGEN, _.sum(creep.carry));
	            }
	        } else {
                creep.drop(RESOURCE_OXYGEN, _.sum(creep.carry));
	        }
	    }
    }
};

module.exports = roleMiner;
