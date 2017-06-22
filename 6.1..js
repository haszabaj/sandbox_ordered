function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype.plus = function(that) {
    return new Vector((this.x + that.x), (this.y + that.y));
}

Vector.prototype.minus = function(that) {
    return new Vector((this.x - that.x), (this.y - that.y));
}

Object.defineProperty(Vector.prototype, "length", {
    get: function() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y))
    }
});