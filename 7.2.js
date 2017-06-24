function Tiger() {
    this.energy = 100;
    this.direction = randomElement(directionNames);
};

Tiger.prototype.act = function(view) {
    var space = view.find(" ");
    var maxEnergyForTiger = 200;
    if (this.energy > maxEnergyForTiger && space) {
        return {
            type: "reproduce",
            direction: space
        };
    }
    var critter = view.find("O");
    if (critter) {
        return {
            type: "eat",
            direction: critter
        };
    }
    if (view.look(this.direction) != " ") {
        this.direction = view.find(" ") || "s";
    }
    return {
        type: "move",
        direction: this.direction
    };
}
