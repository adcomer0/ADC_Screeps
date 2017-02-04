//var benchmark = require('benchmark');
var RoomController = require('roomController');
//var unitTest = require('unitTest);

module.exports.loop = function () {
    //benchmark.runBenchmarks();
    //unitTest.runUnitTests();
    
    if (!Memory.rooms) {
        Memory.rooms = {}
    }
    for (var index in Game.rooms) {
        try {
            var roomControl = Object.create(RoomController);
            roomControl.room = Game.rooms[index];
            roomControl.runRoutine();
        }
        catch (e) {
            console.log('Room: ' + Game.rooms[index].name + ' Error: ' + e);
        }
    }
}
