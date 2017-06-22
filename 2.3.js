var result = "";
var size = 8;

for (var line = 0; line < size; line++) {
    for (var column = 0; column < size; column++) {
        ((line + column) % 2 === 0) ? result += " ": result += "#";
    }
    result += "\n";
}

console.log(result);