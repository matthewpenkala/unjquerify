"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.buildChain = void 0;
var babel_types_1 = require("babel-types");
function chainToMemberList(expr, acc) {
    if (acc === void 0) { acc = []; }
    var callee = expr.callee;
    if ((0, babel_types_1.isMemberExpression)(callee)) {
        if (!(0, babel_types_1.isIdentifier)(callee.property))
            throw Error("Expected property in " + callee.property);
        var newLink = { methodName: callee.property.name, arguments: expr.arguments };
        if ((0, babel_types_1.isCallExpression)(callee.object))
            return chainToMemberList(callee.object, __spreadArray([newLink], acc, true));
        return __spreadArray([newLink], acc, true);
    }
    else
        return acc;
}
function getLeftMost(expr) {
    var callee = expr.callee;
    if ((0, babel_types_1.isMemberExpression)(callee)) {
        if ((0, babel_types_1.isCallExpression)(callee.object)) {
            return getLeftMost(callee.object);
        }
        else if ((0, babel_types_1.isIdentifier)(callee.object)) {
            return callee.object;
        }
        else {
            return expr;
        }
    }
    else
        return expr;
}
function buildChain(expr) {
    return {
        leftmost: getLeftMost(expr),
        links: chainToMemberList(expr)
    };
}
exports.buildChain = buildChain;
