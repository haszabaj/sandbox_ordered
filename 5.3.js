function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}


function groupBy(array, groupOf) {
    var groups = {};
    array.forEach(function(element) {
        var groupName = groupOf(element);

        if (!Array.isArray(groups[groupName])) {
            groups[groupName] = [];
        } 
        groups[groupName].push(element);
    })

    return groups;
}

var byCentury = groupBy(ancestry, function(person) {
    return Math.ceil(person.died / 100);
});

for (var century in byCentury) {
    var ages = byCentury[century].map(function(person) {
        return person.died - person.born;
    });
    console.log(century + ": " + average(ages));
}
