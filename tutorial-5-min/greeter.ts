class Student {
    fullName: string;
    constructor(public familyName: string, public middleInitial: string, public givenName: string) {
        this.fullName = familyName + " " + middleInitial + " " + givenName;
    }
}

interface Person {
    familyName: string;
    givenName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.familyName + " " + person.givenName;
}

let user = new Student("Jane", "M.", "User");

document.body.innerHTML = greeter(user);
