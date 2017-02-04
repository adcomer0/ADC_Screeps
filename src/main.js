var RoomController = require('roomController');

module.exports.loop = function () {
    if (!Memory.rooms) {
        Memory.rooms = {}
    }
    
    
    // For each user controlled room, 
    for (var index in Game.rooms) {
        try {
            var myRoom = Object.create(RoomController, {room:Game.rooms[index]});
            myRoom.runRoutine();
        }
        catch (e) {
            console.log('room: ' + Game.rooms[index].name + ' encountered a problem. Error: ' + e );
        }
    }
}
