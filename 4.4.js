function deepEqual(a, b) {
    if (a === b) {
        return true;
    }

    if (typeof a != "object" || a == null || typeof b == "object" || b != null) {
        return false;
    }

    var propsA = 0,
        propsB = 0;

    for (var prop in a) {
        propsA += 1;
    }

    for (var prop in b) {
        propsB += 1;
    }


    if (!deepEqual(a[prop], b[prop])) {
        return false;
    }


    return propsA === propsB

}