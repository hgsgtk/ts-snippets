interface Person {
    familyName: string;
    givenName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.familyName + " " + person.givenName;
}

// 明示的なimplementsは不要
let user = { familyName: "Jane", givenName: "User" };

document.body.innerHTML = greeter(user);
