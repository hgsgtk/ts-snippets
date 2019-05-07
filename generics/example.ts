// https://medium.freecodecamp.org/how-to-wrap-your-head-around-typescript-generics-8d243f7de78

// Example1: any
const wrapInObj = (myValue: any) => {
    return {
        value: myValue,
    }
}

const wrappedValue = wrapInObj(12345);

// split() is not function because the type is any.
wrappedValue.value.split();