var MyRoom = require("RoomController");

module.exports.loop = function () {
    for (var name in Game.rooms) {
        MyRoom.Initialize(name);
        MyRoom.runRoutine();
        MyRoom.creepManagement();
    }
}
