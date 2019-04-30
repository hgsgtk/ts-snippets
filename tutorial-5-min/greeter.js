function greeter(person) {
    return "Hello, " + person.familyName + " " + person.givenName;
}
// 明示的なimplementsは不要
var user = { familyName: "Jane", givenName: "User" };
document.body.innerHTML = greeter(user);
