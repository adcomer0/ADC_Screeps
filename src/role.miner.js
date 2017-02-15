var roleMiner = {

    runRoutine: function(creep) {
        if(!creep.memory.harvesting && 0 == _.sum(creep.carry)) {
            creep.memory.harvesting = true;
            creep.say('mining');
	    }
	    else if (creep.memory.harvesting && creep.carryCapacity == _.sum(creep.carry)){
	        creep.memory.harvesting = false;
	        creep.say('dumping');
	    }
        
        if(creep.memory.harvesting) {
	        var target;
	        if (creep.memory.depositId) {
	            target = Game.getObjectById(creep.memory.depositId);
	        } else {
	            var targets = creep.room.find(FIND_MINERALS);
	            target = targets[0];
	            creep.memory.depositId = target.id;
	            creep.memory.mineralType = target.mineralType;
	        }
	        
            if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target,{visualizePathStyle: {
                    fill: 'transparent', 
                    stroke: '#ff0', 
                    lineStyle: 'dashed', 
                    strokeWidth: .15, 
                    opacity: .1}});
            }
	    }
	    else {
            if (creep.room.terminal) {
                if (creep.transfer(creep.room.terminal, creep.memory.mineralType) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.terminal,{visualizePathStyle: {
                    fill: 'transparent', 
                    stroke: '#ff0', 
                    lineStyle: 'dashed', 
                    strokeWidth: .15, 
                    opacity: .1}});
                }
            } else if (creep.room.storage) {
                if (creep.transfer(creep.room.storage, creep.memory.mineralType) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage,{visualizePathStyle: {
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

module.exports = roleMiner;
