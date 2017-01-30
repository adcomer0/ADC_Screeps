var sourcePriority = require('sourcePriority');

var roleBuilder = {

    //dest:ConstructionSite,
    //target:Source,

    runRoutine: function(creep) {

	    if(creep.memory.building && creep.carry.energy < 1) {
            creep.memory.building = false;
            creep.say('harvesting');
            /*var sources = creep.room.find(FIND_SOURCES);
	        
	        let switchSource = _.random(0, 4) == 0;
	        if (sourcePriority.runRoutine(sources[1]) > sourcePriority.runRoutine(sources[0])) {
	            if (switchSource) {
	                this.target = sources[0];
	            } else {
	                this.target = sources[1];
	            }
	        } else {
	            if (switchSource) {
	                this.target = sources[1];
	            } else {
	                this.target = sources[0];
	            }
	        }*/
	    }
	    else if (!creep.memory.building && creep.carry.energy == creep.carryCapacity){
	        creep.memory.building = true;
	        creep.say('building');
	        /*var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
	        try {
	            this.dest = creep.pos.findClosestByRange(targets);
	        }
	        catch (e) {
	            console.log(e);
	        }*/
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
	        /*var sources = creep.room.find(FIND_SOURCES);
	        var target;
	        let switchSource = _.random(0, 4) == 0;
	        if (sourcePriority.runRoutine(sources[1]) > sourcePriority.runRoutine(sources[0])) {
	            if (switchSource) {
	                target = sources[0];
	            } else {
	                target = sources[1];
	            }
	        } else {
	            if (switchSource) {
	                target = sources[1];
	            } else {
	                target = sources[0];
	            }
	        }*/
	        
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
