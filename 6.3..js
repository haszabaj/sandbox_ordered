function logFive(sequence) {
 +    for (var i = 0; i < 5; i++) {
 +        if (sequence.next()) {
 +            console.log(sequence.current());
 +        }
 +    }
 +}
 +
 +function ArraySeq(array) {
 +    this.pos = -1;
 +    this.array = array;
 +}
 +
 +ArraySeq.prototype.hasNext = function() {
 +    if (this.pos < this.array.length - 1) {
 +        return true;
 +    } 
 +};
 +
 +ArraySeq.prototype.next = function() {
 +    if (ArraySeq.prototype.hasNext) {
 +        this.pos++;
 +        return true;
 +    }
 +};
 +
 +
 +ArraySeq.prototype.current = function() {
 +    return this.array[this.pos];
 +};
 +
 +
 +function RangeSeq(from, to) {
 +    this.pos = from - 1;
 +    this.to = to;
 +}
 +
 +
 +RangeSeq.prototype.hasNext = function() {
 +    if (this.pos < this.to) {
 +        return true;
 +    } 
 +};
 +
 +
 +RangeSeq.prototype.next = function() {
 +    if (RangeSeq.prototype.hasNext) {
 +        this.pos++;
 +        return true;
 +    }
 +};
 +
 +RangeSeq.prototype.current = function() {
 +    return this.pos;
 +};
