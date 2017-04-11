var MyLinks = {
    runRoutine: function(link){
        if (link.id != 'ddd26cb48a45ecc'){
            var target = Game.getObjectById('ddd26cb48a45ecc');
            //if (target.energy < )
            link.transferEnergy(target,link.energy-target.energy);
        }
    }
};

module.exports = MyLinks;
