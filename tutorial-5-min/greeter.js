var Student = /** @class */ (function () {
    function Student(familyName, middleInitial, givenName) {
        this.familyName = familyName;
        this.middleInitial = middleInitial;
        this.givenName = givenName;
        this.fullName = familyName + " " + middleInitial + " " + givenName;
    }
    return Student;
}());
function greeter(person) {
    return "Hello, " + person.familyName + " " + person.givenName;
}
var user = new Student("Jane", "M.", "User");
document.body.innerHTML = greeter(user);
