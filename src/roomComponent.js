var config = require('config');

var MyRoom = {
    runRoutine:function(){
        this.economy = this.room.controller.level;
        console.log('unimplemented MyRoom.runRoutine');
    },
    buildCreep:function(){
        
    },
    /*updateRoomMemory:function(){
        May need method to update room every so often due to building of new structures/creeps, etc.
    },*/
    setRoomMemory:function(){
        var roomMemory = Object.create(RoomMemory);
        
        roomMemory.spawns = this.room.find(FIND_MY_SPAWNS);
        roomMemory.extensions = this.room.find(FIND_MY_STRUCTURES, {filter:function(object){ return object.structureType == STRUCTURE_EXTENSION;}});
        roomMemory.towers = this.room.find(FIND_MY_STRUCTURES, {filter:function(object){ return object.structureType == STRUCTURE_TOWER;}});
        roomMemory.links = this.room.find(FIND_MY_STRUCTURES, {filter:function(object){ return object.structureType == STRUCTURE_LINK;}});
        roomMemory.sources = this.room.find(FIND_SOURCES);
        roomMemory.creeps = this.room.find(FIND_MY_CREEPS);
        roomMemory.constructionSites = this.room.find(FIND_MY_CONSTRUCTION_SITES);
        roomMemory.flags = this.room.find(FIND_FLAGS);
        
        if (!Memory.rooms){
            Memory.rooms = {};
        }
        Memory.rooms[this.room] = roomMemory;
        
        return roomMemory;
    },
    getRoomMemory:function(){
        if(!Memory.rooms[this.room]) {
            console.log('Creating new Memory for room: ' + this.room);
            // construct list of room objects
            
            return this.setRoomMemory();
        }
        else {
            return Memory.rooms[this.room];
        }
    }
}

var RoomMemory = {
    spawns: [],
    extensions: [],
    towers: [],
    links: [],
    sources: [],
    creeps: [],
    constructionSites: [],
    flags: []
}

module.exports = MyRoom
