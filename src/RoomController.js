var roleHarvester = require('role.harvester');
var roleHarvester2 = require('role.harvester2');
var roleHarvester3 = require('role.harvester3');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleCarrier = require('role.carrier');
var roleCarrier2 = require('role.carrier2');
var roleCarrier3 = require('role.carrier3');
var roleDefender = require('role.defender');
var roleAttacker = require('role.attacker');
var roleClaimer = require('role.claimer');
var roleLinkCarrier = require('role.linkCarrier');
var roleMiner = require('role.miner');
var roleMineCarrier = require('role.mineCarrier');
//var roleHelpRoomTwo = require('role.helpRoomTwo');
var MyTowers = require('TowerController');
var MyLinks = require('LinkController');


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
                    case 'harvester2':
                        roleHarvester2.runRoutine(creep);
                        break;
                    case 'harvester3':
                        roleHarvester3.runRoutine(creep);
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
                    case 'carrier':
                        roleCarrier.runRoutine(creep);
                        break;
                    case 'carrier2':
                        roleCarrier2.runRoutine(creep);
                        break;
                    case 'carrier3':
                        roleCarrier3.runRoutine(creep);
                        break;
                    case 'defender':
                        roleDefender.runRoutine(creep);
                        break;
                    case 'attacker':
                        roleAttacker.runRoutine(creep);
                        break;
                    case 'claimer':
                        roleClaimer.runRoutine(creep);
                        break;
                    case 'linkCarrier':
                        roleLinkCarrier.runRoutine(creep);
                        break;
                    //case 'helpRoomTwo':
                    //    roleHelpRoomTwo.runRoutine(creep);
                    //    break;
                    case 'miner':
                        roleMiner.runRoutine(creep);
                        break;
                    case 'mineCarrier':
                        roleMineCarrier.runRoutine(creep);
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
        if (this.room.name == 'W3N4') {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room.name == 'W3N4');
        console.log('Harvesters: ' + harvesters.length);
        if(harvesters.length < 1 || harvesters[0].ticksToLive < 25) {
            /*
                work: 1, carry: 2, move: 2
            */
            var newName = Game.spawns['ADC_W3N4_1'].createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, {role: 'harvester', harvesting: true});
            console.log('Spawning new harvester: ' + newName);
        } else {
            var harvesters2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester2' && creep.room.name == 'W3N4');
            console.log('Harvesters2: ' + harvesters2.length);
            
            if (harvesters2.length < 1 || harvesters2[0].ticksToLive < 70) {
                var newName = Game.spawns['ADC_W3N4_1'].createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, {role: 'harvester2', harvesting: true});
                console.log('Spawning new harvester2: ' + newName);
            } else {
                var linkCarriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'linkCarrier' && creep.room.name == 'W3N4');
                console.log('LinkCarriers: ' + linkCarriers.length);
                if(linkCarriers.length < 1 || linkCarriers[0].ticksToLive < 50) {
                    /*
                        work: 1, carry: 2, move: 2
                    */
                        var newName = Game.spawns['ADC_W3N4_1'].createCreep([CARRY,CARRY,MOVE,MOVE], undefined, {role: 'linkCarrier', harvesting: true});
                        console.log('Spawning new linkCarriers: ' + newName);
                } else {
                    var carriers2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier2' && creep.room.name == 'W3N4');
                    console.log('Carriers2: ' + carriers2.length);
                    if(carriers2.length < 1) {
                        /*
                            work: 1, carry: 2, move: 2
                        */
                            var newName = Game.spawns['ADC_W3N4_1'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'carrier2', harvesting: true});
                            console.log('Spawning new carrier2: ' + newName);
                    } else {
                        var carriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier' && creep.room.name == 'W3N4');
                        console.log('Carriers: ' + carriers.length);
                        if(carriers.length < 1) {
                            var newName = Game.spawns['ADC_W3N4_1'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'carrier', harvesting: true});
                            console.log('Spawning new carrier: ' + newName);
                        } else {
                            var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room.name == 'W3N4');
                            console.log('Upgraders: ' + upgraders.length);
                            if(upgraders.length < 3) {
                                /*
                                move: economy * 2, work: economy, carry: economy 
                                */
                                var newName = Game.spawns['ADC_W3N4_1'].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], undefined, {role: 'upgrader', harvesting: true});
                                console.log('Spawning new upgrader: ' + newName);
                            } else {
                                var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner' && creep.room.name == 'W3N4');
                                console.log('Miners: ' + miners.length);
                                if(miners.length < 1 || miners[0].ticksToLive < 70){
                                var newName = Game.spawns['ADC_W3N4_1'].createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, {role: 'miner', harvesting: true});
                                console.log('Spawning new miner: ' + newName);
                            } else {
                                var mineCarriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'mineCarrier' && creep.room.name == 'W3N4');
                                console.log('MineCarriers: ' + mineCarriers.length);
                                if(mineCarriers.length < 1){
                                var newName = Game.spawns['ADC_W3N4_1'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'mineCarrier', harvesting: true});
                                console.log('Spawning new mineCarrier: ' + newName);
                            } else {
                                /*
                                    move: economy/2 * 2, work: economy/2, carry: economy/2 
                                */
                                var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer' && creep.room.name == 'W3N4');
                                console.log('Repairers: ' + repairers.length);

                                if(repairers.length < 2) {
                                    var newName = Game.spawns['ADC_W3N4_1'].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY,CARRY], undefined, {role: 'repairer', harvesting: true});
                                    console.log('Spawning new repairer: ' + newName);
                                } else {
                                    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.room.name == 'W3N4');
                                    console.log('Builders: ' + builders.length);
                
                                    if(builders.length < 2) {
                                        var newName = Game.spawns['ADC_W3N4_1'].createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY,CARRY], undefined, {role: 'builder', harvesting: true});
                                        console.log('Spawning new builder: ' + newName);
                                    } else {
                                        var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
                                        console.log('Defenders: ' + defenders.length);
                    
                                        if (defenders.length < 1) {
                                            var newName = Game.spawns['ADC_W3N4_1'].createCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,HEAL], undefined, {role: 'defender'});
                                            console.log('Spawning new defender: ' + newName); 
                                        } else {
                                            var harvesters3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester3')
                                            console.log("Harvesters3: " + harvesters3.length);
                        
                                            if (harvesters3.length < 1) {
                                                var newName = Game.spawns['ADC_W3N4_1'].createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, {role: 'harvester3', harvesting: true});
                                                console.log('Spawning new harvester3: ' + newName);
                                            } else {
                                                var carriers3 = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier3')
                                                console.log("Carriers3: " + carriers3.length);
                        
                                                if (carriers3.length < 2) {
                                                    var newName = Game.spawns['ADC_W3N4_1'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'carrier3', harvesting: true});
                                                    console.log('Spawning new carrier3: ' + newName);
                                                } else {
                                                    var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker')
                                                    //console.log("Attackers: " + attackers.length);
                            
                                                    if (attackers.length < 0) {
                                                        var newName = Game.spawns['ADC_W3N4_1'].createCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,HEAL,HEAL], undefined, {role: 'attacker'});
                                                        console.log("Spawning new attacker: " + newName);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            }    
                            }
                    /*else {
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
                        }
                        else {
                            var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner' && creep.room.name == 'W1N7');
                            console.log('Miners: ' + miners.length);
                            if (miners.length < 4) {
                                var newName = Game.spawns['ADC_Awesome1'].createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'miner'});
                                console.log('Spawning new Miner: ' + newName);
                            }
                        }*/
                    }
                }
            }
        }}
        }
        /*if (this.room.name == 'W2N7') {
            var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room.name == 'W2N7');
            console.log('W2N7 Harvesters: ' + harvesters.length);
            if(harvesters.length < 4) {
                /*
                    work: 1, carry: 2, move: 2
                
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
                    
                    var newName = Game.spawns['ADC_Awesome2'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'upgrader', harvesting: true});
                    console.log('W2N7 Spawning new upgrader: ' + newName);
                }
                else {
                    /*
                        move: economy/2 * 2, work: economy/2, carry: economy/2 
                    
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
                            }
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
        }*/
        
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
        
        var links = this.room.find(FIND_MY_STRUCTURES, {
                filter: function(object){
                    return (object.structureType === STRUCTURE_LINK);
                }
            });
        
        for (var link in links) {
            try {
                MyLinks.runRoutine(links[link]);
            }
            catch (e) {
                console.log(e);   
            }
        }
    }
};

module.exports = MyRoom;
