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
// wrappedValue.value.split();

// Example2
// ? means this parameter is optional.
// https://basarat.gitbooks.io/typescript/content/docs/types/functions.html#optional-parameters
type User = {
    user?: {
        name: string,
        friends?: Array<User>,
    }
}
// optional but used, so programmer have to write carefully
// const friendsOfFriends =
//     props.user &&
//     props.user.friends &&
//     props.user.friends[0] &&
//     props.user.friends[0].friends;

// using any.
export const idx = (
    props: any,
    selector: (props: any) => any
) => {
    try {
        return selector(props);
    } catch (e) {
        return undefined;
    }
};
const props = {
    user: {
        name: "ipso",
        friends: [{
            name: "facto",
            friends: []
        }]
    }
}
const friendsOfFriends3 = idx(props, _ => _.user.noBueno)

// using generics
export const idx2 = <T extends {}, U>(
    props: T,
    selector: (props: T) => U | undefined
) => {
    try {
        return selector(props);
    } catch (e) {
        return undefined;
    }
};
//  Property 'noBueno' does not exist on type '{ name: string; friends: { name: string; friends: any[]; }[]; }'
// const friendsOfFriends4 = idx2(props, _ => _.user.noBueno)

// Example3 type inference and return type of a function
const foo = (value: string) => {
    return {
        input: value,
        time: Date.now(),
        characters: value.split("")
    }
}
// using native type
type FeeOutput = {
    input: string;
    time: number;
    characters: Array<string>;
}
// using generics
type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any;
// ... is rest parameters
// See also https://dev.to/sagar/three-dots---in-javascript-26ci
// `T extends (...args: any[]) => any` means T is a generic function type that takes any number of any arguments
// and produces a value.
// `R ? R : any` is used conditional types which is added in TypeScript 2.8
// (now TypeScript 3.4.5)
// By using `infer`, we can reuse the captured type.
// It's called Type inference in Conditional types.
// マッチした際にその部分に推論される型をRにキャプチャする
// See also https://qiita.com/Quramy/items/b45711789605ef9f96de
type FooOutput = ReturnType<typeof foo>;
