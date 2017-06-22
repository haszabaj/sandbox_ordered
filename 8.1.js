function MultiplicatorUnitFailure(message) {
    this.message = message;
    this.stack(new Error()).stack;
}

MultiplicatorUnitFailure.prototype = Object.create(Error.prototype);
MultiplicatorUnitFailure.prototype.name = "MultiplicationFailure";

function primitiveMultiply(a, b) {
    if (Math.random() < 0.5) {
        return a * b;
    } else {
        throw new MultiplicatorUnitFailure();
    }
}

function reliableMultiply(a, b) {
    try {
        return primitiveMultiply(a, b);
    } catch (error) {
        if (error.name == "MultiplicationFailure") {
            console.log("Multiplication Failure")
        } else {
            throw (e)
        }
    }
}


console.log(reliableMultiply(8, 8));
// → 64