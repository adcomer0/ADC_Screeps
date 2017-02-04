//var MyBuild = require('buildComponent');
var MyCreep = require('creepComponent');
//var MyFlag = require('flagComponent');
//var MyLink = require('linkComponent');
var MyRoom = require('roomComponent');
var MyTower = require('towerComponent');

var RoomController = {
    runRoutine:function() {
        this.myRoom = Object.create(MyRoom);
        this.myRoom.room = this.room;
        this.roomMemory = this.myRoom.getRoomMemory();
        
        //this.buildRoutine();
        this.creepRoutine();
        //this.flagRoutine();
        //this.linkRoutine();
        this.roomRoutine();
        this.towerRoutine();
    },
    /*buildRoutine:function(){
        var myBuild = Object.create(MyBuild);
        myBuild.constructionSites = this.roomMemory.constructionSites
        myBuild.runRoutine();
    },*/
    creepRoutine:function(){
        var roomCreeps = this.roomMemory.creeps;
        for (var index in roomCreeps) {
            var myCreep = Object.create(MyCreep);
            myCreep.creep = roomCreeps[index];
            myCreep.parentRoom = this.room;
            myCreep.runRoutine();
        }
    },/*
    flagRoutine:function(){
        var myFlag = Object.create(MyFlag);
        myFlag.flags = this.roomMemory.flags;
        myFlag.runRoutine();
    },
    linkRoutine:function(){
        var myLink = Object.create(MyLink);
        myLink.links = this.roomMemory.links;
        myLink.runRoutine();
    },*/
    roomRoutine:function(){
        this.myRoom.runRoutine();
    },
    towerRoutine:function(){
        var roomTowers = this.roomMemory.towers;
        for (var index in roomTowers) {
            var myTower = Object.create(MyTower);
            myTower.tower = roomTowers[index];
            myTower.parentRoom = this.room;
            myTower.runRoutine();
        }
    }
}

module.exports = RoomController;
