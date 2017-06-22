
function flatten(arr) {
    var result = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        var data = (Array.isArray(arr[i])) ? flatten(arr[i]) : [arr[i]];
        result = result.concat(data);
    }
    return result;
}