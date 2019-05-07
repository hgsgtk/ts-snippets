"use strict";
// https://medium.freecodecamp.org/how-to-wrap-your-head-around-typescript-generics-8d243f7de78
exports.__esModule = true;
// Example1: any
var wrapInObj = function (myValue) {
    return {
        value: myValue
    };
};
var wrappedValue = wrapInObj(12345);
// optional but used, so programmer have to write carefully
// const friendsOfFriends =
//     props.user &&
//     props.user.friends &&
//     props.user.friends[0] &&
//     props.user.friends[0].friends;
// using any.
exports.idx = function (props, selector) {
    try {
        return selector(props);
    }
    catch (e) {
        return undefined;
    }
};
var props = {
    user: {
        name: "ipso",
        friends: [{
                name: "facto",
                friends: []
            }]
    }
};
var friendsOfFriends3 = exports.idx(props, function (_) { return _.user.noBueno; });
// using generics
exports.idx2 = function (props, selector) {
    try {
        return selector(props);
    }
    catch (e) {
        return undefined;
    }
};
//  Property 'noBueno' does not exist on type '{ name: string; friends: { name: string; friends: any[]; }[]; }'
// const friendsOfFriends4 = idx2(props, _ => _.user.noBueno)
// Example3 type inference and return type of a function
var foo = function (value) {
    return {
        input: value,
        time: Date.now(),
        characters: value.split("")
    };
};
