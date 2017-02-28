var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var MyTowers = require('TowerController');
var roleTowerHarvester = require('role.towerHarvester');
var roleClaimer = require('role.claimer');
var roleHelpRoomTwo = require('role.helpRoomTwo');
var roleMiner = require('role.miner');

var MyRoom = {
    room:Room,

    Initialize:function(roomName) {
        this.room = Game.rooms[roomName];
        if (!this.room) {
            throw 'Room ${roomName} not found';
        }
    },
    
    creepManagement:function() {
        for (let name in Game.creeps) {
            let creep = Game.creeps[name];
            try {
                switch (creep.memory['role']) {
                    case 'harvester':
                        roleHarvester.runRoutine(creep);
                        break;
                    case 'upgrader':
                        roleUpgrader.runRoutine(creep);
                        break;
                    case 'builder':
                        roleBuilder.runRoutine(creep);
                        break;
                    case 'repairer':
                        roleRepairer.runRoutine(creep);
                        break;
                    case 'towerHarvester':
                        roleTowerHarvester.runRoutine(creep);
                        break;
                    case 'claimer':
                        roleClaimer.runRoutine(creep);
                        break;
                    case 'helpRoomTwo':
                        roleHelpRoomTwo.runRoutine(creep);
                        break;
                    case 'miner':
                        roleMiner.runRoutine(creep);
                        break;
                    default:
                        break;
                }
            }
            catch (e) {
                console.log('creep ' + creep.name + ' errored out. Error: ' + e);
            }
        }
    },
    
    runRoutine:function() {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    
        console.log('Room "'+this.room.name+'" has '+this.room.energyAvailable+' energy');

        /*
        ext = 5, econ = 1
        ext = 10, econ = 2
        ext = 20, econ = 3
        ext = 30, econ = 4
        ext = 40, econ = 5
        ext = 50, econ = 6
        ext = 60, econ = 7
        ext > 60, econ = 8
        */
        if (this.room.name == 'W1N7') {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room.name == 'W1N7');
        console.log('Harvesters: ' + harvesters.length);
        if(harvesters.length < 4) {
            /*
                work: 1, carry: 2, move: 2
            */
            if (harvesters.length < 2) {
                var newName = Game.spawns['ADC_Awesome1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester', harvesting: true});
                console.log('Spawning new harvester: ' + newName);
            } else {
                var newName = Game.spawns['ADC_Awesome1'].createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'harvester', harvesting: true});
                console.log('Spawning new harvester: ' + newName);
            }
        }
        else {
            var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room.name == 'W1N7');
            console.log('Upgraders: ' + upgraders.length);
            if(upgraders.length < 4) {
                /*
                    move: economy * 2, work: economy, carry: economy 
                */
                var newName = Game.spawns['ADC_Awesome1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'upgrader', harvesting: true});
                console.log('Spawning new upgrader: ' + newName);
            }
            else {
                /*
                    move: economy/2 * 2, work: economy/2, carry: economy/2 
                */
                var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer' && creep.room.name == 'W1N7');
                console.log('Repairers: ' + repairers.length);

                if(repairers.length < 4) {
                    var newName = Game.spawns['ADC_Awesome1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'repairer', harvesting: true});
                    console.log('Spawning new repairer: ' + newName);
                }
                else {
                
                    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.room.name == 'W1N7');
                    console.log('Builders: ' + builders.length);
                
                    if(builders.length < 4) {
                        var newName = Game.spawns['ADC_Awesome1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'builder', harvesting: true});
                        console.log('Spawning new builder: ' + newName);
                    } else {
                        var towerHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'towerHarvester' && creep.room.name == 'W1N7');
                        console.log('TowerHarvesters: ' + towerHarvesters.length);
                        if (towerHarvesters.length < 4) {
                            var newName = Game.spawns['ADC_Awesome1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'towerHarvester', harvesting: true});
                            console.log('Spawning new TowerHarvesters: ' + newName);
                        }
                        /*else {
                            var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer' && creep.room.name == 'W1N7');
                            console.log('Claimers: ' + claimers.length);
                            if (claimers.length < 4) {
                                var newName = Game.spawns['ADC_Awesome1'].createCreep([CLAIM,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'claimer'});
                                console.log('Spawning new Claimer: ' + newName);
                            }
                        }*/
                        else {
                            var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner' && creep.room.name == 'W1N7');
                            console.log('Miners: ' + miners.length);
                            if (miners.length < 4) {
                                var newName = Game.spawns['ADC_Awesome1'].createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'miner'});
                                console.log('Spawning new Miner: ' + newName);
                            }
                        }
                    }
                }
            }
        }
        }
        if (this.room.name == 'W2N7') {
            var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room.name == 'W2N7');
            console.log('W2N7 Harvesters: ' + harvesters.length);
            if(harvesters.length < 4) {
                /*
                    work: 1, carry: 2, move: 2
                */
                if (harvesters.length < 2) {
                    var newName = Game.spawns['ADC_Awesome2'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester', harvesting: true});
                    console.log('W2N7 Spawning new harvester: ' + newName);
                } else {
                    var newName = Game.spawns['ADC_Awesome2'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'harvester', harvesting: true});
                    console.log('W2N7 Spawning new harvester: ' + newName);
                }
            }
            else {
                var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room.name == 'W2N7');
                console.log('W2N7 Upgraders: ' + upgraders.length);
                if(upgraders.length < 4) {
                    /*
                        move: economy * 2, work: economy, carry: economy 
                    */
                    var newName = Game.spawns['ADC_Awesome2'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'upgrader', harvesting: true});
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var MyTowers = require('TowerController');
var roleTowerHarvester = require('role.towerHarvester');
var roleClaimer = require('role.claimer');
var roleHelpRoomTwo = require('role.helpRoomTwo');
var roleMiner = require('role.miner');

var MyRoom = {
    room:Room,

    Initialize:function(roomName) {
        this.room = Game.rooms[roomName];
        if (!this.room) {
            throw 'Room ${roomName} not found';
        }
    },
    
    creepManagement:function() {
        for (let name in Game.creeps) {
            let creep = Game.creeps[name];
            try {
                switch (creep.memory['role']) {
                    case 'harvester':
                        roleHarvester.runRoutine(creep);
                        break;
                    case 'upgrader':
                        roleUpgrader.runRoutine(creep);
                        break;
                    case 'builder':
                        roleBuilder.runRoutine(creep);
                        break;
                    case 'repairer':
                        roleRepairer.runRoutine(creep);
                        break;
                    case 'towerHarvester':
                        roleTowerHarvester.runRoutine(creep);
                        break;
                    case 'claimer':
                        roleClaimer.runRoutine(creep);
                        break;
                    case 'helpRoomTwo':
                        roleHelpRoomTwo.runRoutine(creep);
                        break;
                    case 'miner':
                        roleMiner.runRoutine(creep);
                        break;
                    default:
                        break;
                }
            }
            catch (e) {
                console.log('creep ' + creep.name + ' errored out. Error: ' + e);
            }
        }
    },
    
    runRoutine:function() {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    
        console.log('Room "'+this.room.name+'" has '+this.room.energyAvailable+' energy');

        /*
        ext = 5, econ = 1
        ext = 10, econ = 2
        ext = 20, econ = 3
        ext = 30, econ = 4
        ext = 40, econ = 5
        ext = 50, econ = 6
        ext = 60, econ = 7
        ext > 60, econ = 8
        */
        if (this.room.name == 'W1N7') {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room.name == 'W1N7');
        console.log('Harvesters: ' + harvesters.length);
        if(harvesters.length < 4) {
            /*
                work: 1, carry: 2, move: 2
            */
            if (harvesters.length < 2) {
                var newName = Game.spawns['ADC_Awesome1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester', harvesting: true});
                console.log('Spawning new harvester: ' + newName);
            } else {
                var newName = Game.spawns['ADC_Awesome1'].createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'harvester', harvesting: true});
                console.log('Spawning new harvester: ' + newName);
            }
        }
        else {
            var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room.name == 'W1N7');
            console.log('Upgraders: ' + upgraders.length);
            if(upgraders.length < 2) {
                /*
                    move: economy * 2, work: economy, carry: economy 
                */
                var newName = Game.spawns['ADC_Awesome1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'upgrader', harvesting: true});
                console.log('Spawning new upgrader: ' + newName);
            }
            else {
                /*
                    move: economy/2 * 2, work: economy/2, carry: economy/2 
                */
                var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer' && creep.room.name == 'W1N7');
                console.log('Repairers: ' + repairers.length);

                if(repairers.length < 3) {
                    var newName = Game.spawns['ADC_Awesome1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'repairer', harvesting: true});
                    console.log('Spawning new repairer: ' + newName);
                }
                else {
                
                    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.room.name == 'W1N7');
                    console.log('Builders: ' + builders.length);
                
                    if(builders.length < 2) {
                        var newName = Game.spawns['ADC_Awesome1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'builder', harvesting: true});
                        console.log('Spawning new builder: ' + newName);
                    } else {
                        var towerHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'towerHarvester' && creep.room.name == 'W1N7');
                        console.log('TowerHarvesters: ' + towerHarvesters.length);
                        if (towerHarvesters.length < 2) {
                            var newName = Game.spawns['ADC_Awesome1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'towerHarvester', harvesting: true});
                            console.log('Spawning new TowerHarvesters: ' + newName);
                        }
                        /*else {
                            var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer' && creep.room.name == 'W1N7');
                            console.log('Claimers: ' + claimers.length);
                            if (claimers.length < 4) {
                                var newName = Game.spawns['ADC_Awesome1'].createCreep([CLAIM,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'claimer'});
                                console.log('Spawning new Claimer: ' + newName);
                            }
                        }*/
                        else {
                            var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner' && creep.room.name == 'W1N7');
                            console.log('Miners: ' + miners.length);
                            if (miners.length < 4) {
                                var newName = Game.spawns['ADC_Awesome1'].createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'miner'});
                                console.log('Spawning new Miner: ' + newName);
                            }
                        }
                    }
                }
            }
        }
        }
        if (this.room.name == 'W2N7') {
            var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room.name == 'W2N7');
            console.log('W2N7 Harvesters: ' + harvesters.length);
            if(harvesters.length < 4) {
                /*
                    work: 1, carry: 2, move: 2
                */
                if (harvesters.length < 2) {
                    var newName = Game.spawns['ADC_Awesome2'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester', harvesting: true});
                    console.log('W2N7 Spawning new harvester: ' + newName);
                } else {
                    var newName = Game.spawns['ADC_Awesome2'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'harvester', harvesting: true});
                    console.log('W2N7 Spawning new harvester: ' + newName);
                }
            }
            else {
                var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room.name == 'W2N7');
                console.log('W2N7 Upgraders: ' + upgraders.length);
                if(upgraders.length < 3) {
                    /*
                        move: economy * 2, work: economy, carry: economy 
                    */
                    var newName = Game.spawns['ADC_Awesome2'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'upgrader', harvesting: true});
                    console.log('W2N7 Spawning new upgrader: ' + newName);
                }
                else {
                    /*
                        move: economy/2 * 2, work: economy/2, carry: economy/2 
                    */
                    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer' && creep.room.name == 'W2N7');
                    console.log('W2N7 Repairers: ' + repairers.length);

                    if(repairers.length < 3) {
                        var newName = Game.spawns['ADC_Awesome2'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'repairer', harvesting: true});
                        console.log('W2N7 Spawning new repairer: ' + newName);
                    }
                    else {
                    
                        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.room.name == 'W2N7');
                        console.log('W2N7 Builders: ' + builders.length);
                
                        if(builders.length < 4) {
                            var newName = Game.spawns['ADC_Awesome2'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'builder', harvesting: true});
                            console.log('W2N7 Spawning new builder: ' + newName);
                        } else {
                            var towerHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'towerHarvester' && creep.room.name == 'W2N7');
                            console.log('W2N7 TowerHarvesters: ' + towerHarvesters.length);
                            if (towerHarvesters.length < 4) {
                                var newName = Game.spawns['ADC_Awesome2'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'towerHarvester', harvesting: true});
                                console.log('W2N7 Spawning new TowerHarvesters: ' + newName);
                            }
                            /*
                            else {
                                var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer' && creep.room.name == 'W2N7');
                                console.log('Claimers: ' + claimers.length);
                                if (claimers.length < 4) {
                                    var newName = Game.spawns['ADC_Awesome2'].createCreep([CLAIM,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'claimer'});
                                    console.log('Spawning new Claimer: ' + newName);
                                }
                            }*/
                            else {
                                var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner' && creep.room.name == 'W2N7');
                                console.log('Miners: ' + miners.length);
                                if (miners.length < 4) {
                                    var newName = Game.spawns['ADC_Awesome1'].createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'miner'});
                                    console.log('Spawning new Miner: ' + newName);
                                }
                            }
                        }
                    }
                }
            }
        }
        
        var towers = this.room.find(FIND_MY_STRUCTURES, {
                filter: function(object){
                    return (object.structureType === STRUCTURE_TOWER);
                }
            });
            
        for (var tower in towers) {
            try {
                MyTowers.runRoutine(towers[tower]);
            }
            catch (e) {
                console.log(e);   
            }
        }
    }
};

module.exports = MyRoom;
