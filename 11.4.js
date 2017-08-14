specialForms["set"] = function(args, env) {
    if (args.length != 2 || args[0].type != "word") {
        throw new SyntaxError("Argument for set too short or not a word");
    }
    var varName = args[0].name;
    var value = evaluate(args[1], env);

    for (var scope = env; scope; scope = Object.getPrototypeOf(scope)) {
        if (Object.prototype.hasOwnProperty.call(scope, varName)) {
            scope[varName] = value;
            return value;
        }
    }
    throw new ReferenceError("Setting undefined variable " + varName);
};