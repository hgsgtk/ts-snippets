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