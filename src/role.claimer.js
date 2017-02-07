var roleClaimer = {

    runRoutine: function(creep) {
        var dest = 'W2N7'
        if (creep.room.name != dest){
            creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(dest)),{visualizePathStyle: {
                fill: 'transparent', 
                stroke: '#fff', 
                lineStyle: 'dashed', 
                strokeWidth: .15, 
                opacity: .1}});
        } else {
            var controller = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function (object) {
                    return object.structureType == STRUCTURE_CONTROLLER;
                }
            });
            if (creep.claimController(controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller,{visualizePathStyle: {
                    fill: 'transparent', 
                    stroke: '#fff', 
                    lineStyle: 'dashed', 
                    strokeWidth: .15, 
                    opacity: .1}});
            }
        }
    }
};

module.exports = roleClaimer;
