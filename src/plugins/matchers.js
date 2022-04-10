"use strict";
exports.__esModule = true;
exports.matchesCallExpressionOfjQueryCollection = exports.matchesCallExpressionOfjQueryGlobal = exports.matchesCallExpressionOfjQueryGlobalMember = void 0;
var jquery_heuristics_1 = require("../util/jquery-heuristics");
var babel_types_1 = require("babel-types");
// Shaped like $.a();
function matchesCallExpressionOfjQueryGlobalMember(expression) {
    if (!(0, babel_types_1.isCallExpression)(expression))
        return false;
    var callee = expression.callee;
    if (!(0, babel_types_1.isMemberExpression)(callee))
        return false;
    if (!(0, jquery_heuristics_1.isjQueryIdentifier)(callee.object))
        return false;
    return true;
}
exports.matchesCallExpressionOfjQueryGlobalMember = matchesCallExpressionOfjQueryGlobalMember;
// Shaped like $(...)
function matchesCallExpressionOfjQueryGlobal(expression) {
    if (!(0, babel_types_1.isCallExpression)(expression))
        return false;
    var callee = expression.callee;
    if (!(0, jquery_heuristics_1.isjQueryIdentifier)(callee))
        return false;
    return true;
}
exports.matchesCallExpressionOfjQueryGlobal = matchesCallExpressionOfjQueryGlobal;
// Shaped like $(...).a();
function matchesCallExpressionOfjQueryCollection(expression) {
    return (0, jquery_heuristics_1.isCallOnjQuery)(expression);
}
exports.matchesCallExpressionOfjQueryCollection = matchesCallExpressionOfjQueryCollection;
