// https://medium.freecodecamp.org/how-to-wrap-your-head-around-typescript-generics-8d243f7de78

// Example1: any
const wrapInObj = <T>(myValue: T) => {
    return {
        value: myValue,
    }
}

const wrappedValue = wrapInObj(12345);

// Property 'split' does not exist on type 'number'.
// the compiler gives a helpful warning than using any type.
wrappedValue.value.split();