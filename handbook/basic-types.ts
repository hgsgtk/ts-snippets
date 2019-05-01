// Boolean
let isDone: boolean = false;

// Number
// As in JavaScript, all numbers in TypeScript are floating point values.
// In addition to hexadecimal and decimal literals,
// TypeScript also supports binary and octal literals introduced in ECMAScript 2015.
let decimal: number = 6;

// String
// Just like JavaScript, TypeScript also uses double quotes (") or single quotes (') to surround string data.
let color: string = "blue";
color = 'red';
// template strings by ``
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ fullName }.

I'll be ${ age + 1 } years old next month.`;

// Array
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];

// Tuple
let x: [string, number];
x = ["hello", 10];
// x = [10, "hello"]; // Error
console.log(x[0].substr(1)); // OK
// console.log(x[1].substr(1)); // Error
// @ts-ignore undefined の可能性
x[3] = "world"; // undefined なのでIDEの警告は出る
// @ts-ignore undefined の可能性
console.log(x[5].toString());

// Enum
// As in languages like C#, an enum is a way of giving more friendly names to sets of numeric values.
// By default, enums begin numbering their members starting at 0
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
// You can change this by manually setting the value of one of its members.
enum Color1 {Red = 1, Green, Blue}
let c1: Color1 = Color1.Green;
// even manually set all the values in the enum:
enum Color2 {Red = 1, Green = 2, Blue = 4}
let c2: Color2 = Color2.Green;
let colorName: string = Color1[2]; // get 'Green'

// Any
// These values may come from dynamic content, e.g. from the user or a 3rd party library.
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;
// The any type is a powerful way to work with existing JavaScript,
notSure.ifItExists(); // might exist at runtime
notSure.toFixed();
let prettySure: Object = 4;
// prettySure.toFixed(); // type 'Object' doesn't have property 'toFixed'
let notSureList: any[] = [1, true, "free"];
notSureList[1] = 100;

// Void
function warnUser(): void {
    console.log("This is my warning message.");
}
// Declaring variables of type void is not useful because you can only assign undefined or null to them:
let unusable: void = undefined;
unusable = null;

// Undefined
let u: undefined = undefined;

// Null
let n: null = null;

// Never
function error(message: string): never {
    throw new Error(message);
}
function fail(): never {
    return error("Something failed");
}

// Object
// object is a type that represents the non-primitive type
declare function create(o: object | null): void;

create({ prop: 0 });
create(null);
// create(42); // Error

// Type assertions
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
let strLength1: number = (someValue as string).length;
