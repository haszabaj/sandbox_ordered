function reverseArray(array) {
    var newArray = [];
    for (i = 0; i < array.length; i++) {
        newArray.unshift(array[i]);
    }
    return newArray;
}

function reverseArrayInPlace(array) {
    var max = Math.floor(array.length / 2);
    for (i = 0; i < max; i++) {
        array[i] = array[array.length - 1 - i];
    }
    return array;
}