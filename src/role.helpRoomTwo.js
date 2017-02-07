var roleHelpRoomTwo = {

    runRoutine: function(creep) {
        var dest = 'W2N7'
        if (creep.room.name != dest){
            creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(dest)),{visualizePathStyle: {
                fill: 'transparent', 
                stroke: '#00f', 
                lineStyle: 'dashed', 
                strokeWidth: .15, 
                opacity: .1}});
        } else {
            creep.memory.role = 'builder';
        }
    }
};

module.exports = roleHelpRoomTwo;
