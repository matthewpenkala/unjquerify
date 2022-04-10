"use strict";
exports.__esModule = true;
exports.arrayFrom = exports.flatMap = exports.map = exports.mapNodeList = exports.flatMapNodeList = exports.nestedMemberExpressions = void 0;
var babel_types_1 = require("babel-types");
function nestedMemberExpressions(object, properties) {
    var reducer = function (prev, current) { return (0, babel_types_1.memberExpression)(prev, (0, babel_types_1.identifier)(current)); };
    return properties.reduce(reducer, object);
}
exports.nestedMemberExpressions = nestedMemberExpressions;
function flatMapNodeList(nodeList, mapFn) {
    return flatMap(arrayFrom(nodeList), mapFn);
}
exports.flatMapNodeList = flatMapNodeList;
function mapNodeList(nodeList, mapFn) {
    return map(arrayFrom(nodeList), mapFn);
}
exports.mapNodeList = mapNodeList;
function map(array, mapFn) {
    var mapMember = (0, babel_types_1.memberExpression)(array, (0, babel_types_1.identifier)("map"));
    return (0, babel_types_1.callExpression)(mapMember, [mapFn]);
}
exports.map = map;
function flatMap(array, mapFn) {
    var mapCall = map(array, mapFn);
    var concat = (0, babel_types_1.memberExpression)((0, babel_types_1.arrayExpression)(), (0, babel_types_1.identifier)("concat"));
    return (0, babel_types_1.callExpression)(concat, [(0, babel_types_1.spreadElement)(mapCall)]);
}
exports.flatMap = flatMap;
function arrayFrom(nodeList) {
    return (0, babel_types_1.callExpression)((0, babel_types_1.memberExpression)((0, babel_types_1.identifier)("Array"), (0, babel_types_1.identifier)("from")), [nodeList]);
}
exports.arrayFrom = arrayFrom;
