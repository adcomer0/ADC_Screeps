//var MyBuild = require('buildComponent');
//var MyCreep = require('creepComponent');
//var MyFlag = require('flagComponent');
//var MyLink = require('linkComponent');
var MyRoom = require('roomComponent');
//var MyTower = require('towerComponent');

var RoomController = {
    runRoutine:function() {
        /*
        var myRoom = Object.create(MyRoom);
        myRoom.room = this.room;
        var roomMemory = myRoom.getRoomMememory;
        */
        var economy = this.room.controller.level;
        //this.buildRoutine();
        //this.creepRoutine();
        //this.flagRoutine();
        //this.linkRoutine();
        this.roomRoutine();
        //this.towerRoutine();
    },
    /*buildRoutine:function(){
        var myBuild = Object.create(MyBuild);
        myBuild.constructionSites = this.room.find(FIND_MY_CONSTRUCTION_SITES);
        myBuild.runRoutine();
    },
    creepRoutine:function(){
        var myCreep = Object.create(MyCreep);
        myCreep.creeps = this.room.find(FIND_MY_CREEPS);
        myCreep.runRoutine();
    },
    flagRoutine:function(){
        var myFlag = Object.create(MyFlag);
        myFlag.flags = this.room.find(FIND_FLAGS);
        myFlag.runRoutine();
    },
    linkRoutine:function(){
        var myLink = Object.create(MyLink);
        myLink.links = this.room.find(FIND_MY_STRUCTURES, {
            filter:function(){
                return (object.structureType == STRUCTURE_LINK);
            }
        })
        myLink.runRoutine();
    },*/
    roomRoutine:function(){
        var myRoom = Object.create(MyRoom);
        myRoom.room = this.room;
        myRoom.runRoutine();
    }/*,
    towerRoutine:function(){
        var myTower = Object.create(MyTower);
        myTower.towers = this.room.find(FIND_MY_STRUCTURES, {
            filter:function(){
                return (object.structureType == STRUCTURE_TOWER);
            }
        })
        myTower.runRoutine();
    }*/
}

module.exports = RoomController;
