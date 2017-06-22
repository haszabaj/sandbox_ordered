function Tiger() {
    this.energy = 100;
    this.direction = randomElement(directionNames);
};

Tiger.prototype.act = function(view) {
    var space = view.find(" ");
    if (this.energy > 200 && space) {
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