var MyTowers = {
    runRoutine: function(tower){
        //defend room
        var maxRange = 25;
        var hostiles = tower.room.find(FIND_HOSTILE_CREEPS);
        var myCreeps = tower.room.find(FIND_MY_CREEPS, {
            filter: function(object){
                return object.hits < object.hitsMax;
            }
        });
        if (hostiles.length > 0) {
            var username = hostiles[0].owner.username;
            if (username !== 'Invader') {
                Game.notify('User ' + username + ' spotted in room ' + tower.room.name, 1);
            }
            tower.attack(hostiles[0]);
        } else if(myCreeps.length > 0) {
            tower.heal(myCreeps[0]);
        }
        else if (tower.energy > tower.energyCapacity/2) {
            //ReinforceRamparts
            var ramparts = tower.pos.findInRange(FIND_STRUCTURES, maxRange, {
                filter: function(object){
                        return (object.structureType === STRUCTURE_RAMPART && object.hits < object.hitsMax/2)
                    }
            });
            if (ramparts.length > 0) {
               tower.repair(ramparts[0]); 
            }
            else {
                //reinforceWalls
                var walls = tower.pos.findInRange(FIND_STRUCTURES, maxRange, {
                    filter: function(object){
                        return (object.structureType === STRUCTURE_WALL && object.hits < 100000)
                    }
                });
                if (walls.length > 0) {
                    tower.repair(walls[0]);
                }
                else {
                    //repairRoads
                    var roads = tower.pos.findInRange(FIND_STRUCTURES, maxRange, {
                        filter: function(object){
                        return (object.structureType === STRUCTURE_ROAD && object.hits < object.hitsMax/3)
                    }
                    });
                    if (roads.length > 0) {
                        tower.repair(roads[0]);
                    }
                }
            }
        }
    }
};

module.exports = MyTowers;
