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
