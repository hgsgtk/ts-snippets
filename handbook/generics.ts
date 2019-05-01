// Generics
// A major part of software engineering is building components
// that not only have well-defined and consistent APIs, but are also reusable.
//
// one of the main tools in the toolbox for creating reusable components is generics
// https://www.typescriptlang.org/docs/handbook/generics.html

// No Generics example
function identityN(arg: number): number {
    return arg;
}

function identityA(arg: any): any {
    return arg;
}

// This T allows us to capture the type the user provides (e.g. number),
// so that we can use that information later.
// we can now see the same type is used for the argument and the return type.
function identityG<T>(arg: T): T {
    // console.log(arg.length); // T doesn't have property length
    return arg;
}
let output = identityG<string>("myString"); // type of output will be string.
// we didn’t have to explicitly pass the type in the angle brackets
// the compiler just looked at the value "myString", and set T to its type.
let output1 = identityG("myString"); // as same automatically by argument type.

function loggingIdentity<T>(arg: T[]): T[] {
    console.log(arg.length); // Array has a .length.
    return arg;
}

let myIdentity: <T>(arg: T) => T = identityG;
let myIdentityU: <U>(arg: U) => U = identityG;
let myIdentityO: {<T>(arg: T): T} = identityG;

interface GenericsIdentityFn {
    <T>(arg: T): T;
}
let myIdentityI: GenericsIdentityFn = identityG;

interface GenericsIdentityFnT<T> {
    (arg: T): T;
}
let myIdentityT: GenericsIdentityFnT<number> = identityG;

// Generic Class
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y };
let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function(x, y) { return x + y };

// Generic Constraints
interface Lengthwise {
    length: number;
}

function loggingIdentityGC<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
// loggingIdentityGC(3) // 3 is not assignable
loggingIdentityGC({length: 10, value: 3});

// Using Type Parameters in Generic Constraints
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key]
}
let x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, "a");
// getProperty(x, "m"); // m is not assignable

function create<T>(c: {new(): T; }): T {
    return new c();
}
class BeeKeeper {
    hasMask: boolean;
}
class ZooKeeper {
    nametag: string;
}
class Animal {
    numLegs: number;
}
class Bee extends Animal {
    keeper: BeeKeeper;
}
class Lion extends Animal {
    keeper: ZooKeeper;
}
function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
}
createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;
