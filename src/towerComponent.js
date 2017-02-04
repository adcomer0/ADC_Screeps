var towerMaxRange = 25;
var rampartMaxHP = 1000000;
var wallMaxHP = 1000000;
var roadRepairThreshold = 0.5;

var MyTower = {
   // functions on how towers should behave
   routine: [this.defendRoom,
           this.repairRoads,
           this.reinforceRamparts,
           this.reinforceWalls],
           
   runRoutine:function(){
        var actionResult = ERR_NOT_FOUND;
        var actionIndex = 0;
        while (!(actionResult == OK) && actionIndex < this.routine.length) {
            actionResult = this.routine[actionIndex].call(this);
            actionIndex++;
        }
        return actionResult;
   },
   
   defendRoom:function() {
       var hostiles = this.parentRoom.find(FIND_HOSTILE_CREEPS);
       //TODO: Target specific creeps by BodyParts, to prevent healers
       if (hostiles.length > 0) {
           var username = hostiles[0].owner.username;
           if (username !== 'Invader') {
               Game.notify('User ' + username + ' spotted in room ' + this.parentRoom.name, 1);
           }
           return this.tower.attack(hostiles[0]);
       }
       return ERR_NOT_FOUND;
   },
   
   repairRoads:function() {
       var roads = this.tower.pos.findInRange(FIND_STRUCTURES, towerMaxRange, {
           filter: function(object) {
               return (object.structureType == STRUCTURE_ROAD && object.hits / object.hitsMax < roadRepairThreshold);
            }
       });
       
       if (roads) {
           return this.tower.repair(roads[0]);
       }
       return ERR_NOT_FOUND;
   },
   
   reinforce:function(structureType, maxHP) {
       var target = this.tower.find(FIND_STRUCTURES, {
           filter:function(object){
               return (object.structureType == structureType && object.hits < maxHP);
           }
       });
       if (target) {
           if (this.tower.repair(target[0]) == OK){
               return true;
           }
       }
       return false;
   },
   
   reinforceRamparts:function() {
       return this.reinforce(STRUCTURE_RAMPART, rampartMaxHP);
   },
   
   reinforceWalls:function() {
       return this.reinforce(STRUCTURE_WALL, wallMaxHP)
   }
}

module.exports = MyTower;
