function greeter(person: string) {
    return "Hello, " + person;
}

// greeter.ts:7:35 - error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.
// let user = [0, 1, 2];
let user = "Jane User";

document.body.innerHTML = greeter(user);