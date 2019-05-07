// https://medium.freecodecamp.org/how-to-wrap-your-head-around-typescript-generics-8d243f7de78
// Example1: any
var wrapInObj = function (myValue) {
    return {
        value: myValue
    };
};
var wrappedValue = wrapInObj(12345);
wrappedValue.value.split();
