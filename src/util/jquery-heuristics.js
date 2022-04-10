"use strict";
exports.__esModule = true;
exports.isCallOnjQuery = exports.isjQueryInstance = exports.wrapInjQueryFunctionCall = exports.unWrapjQueryElement = exports.isjQueryIdentifier = exports.isjQueryKeyword = void 0;
var babel_types_1 = require("babel-types");
function isjQueryKeyword(keyword) {
    return keyword === "jQuery" || keyword === "$";
}
exports.isjQueryKeyword = isjQueryKeyword;
function isjQueryIdentifier(expr) {
    if (!(0, babel_types_1.isIdentifier)(expr))
        return false;
    return isjQueryKeyword(expr.name);
}
exports.isjQueryIdentifier = isjQueryIdentifier;
/**
 * Pulls out the first argument to a jQuery call expression.
 * If the node is not a jQuery call expression, returns false.
 * @param {Node} node
 * @returns {Node}
 */
function unWrapjQueryElement(node) {
    if (!(0, babel_types_1.isCallExpression)(node))
        return false;
    var callee = node.callee;
    var isJqueryCallee = isjQueryIdentifier(callee);
    if (!isJqueryCallee)
        return false;
    return node.arguments[0];
}
exports.unWrapjQueryElement = unWrapjQueryElement;
function wrapInjQueryFunctionCall(expression) {
    return (0, babel_types_1.callExpression)((0, babel_types_1.identifier)("$"), [expression]);
}
exports.wrapInjQueryFunctionCall = wrapInjQueryFunctionCall;
/**
 * Returns false if `node` cannot be statically determined to be a jQuery instance.
 * @param {Expression} node the node to check.
 */
function isjQueryInstance(node) {
    if (unWrapjQueryElement(node))
        return true;
    if ((0, babel_types_1.isIdentifier)(node))
        return true;
    // TODO this should probably contain some tree marking, but the approach is unclear for now.
    if (isCallOnjQuery(node))
        return true;
    return false;
}
exports.isjQueryInstance = isjQueryInstance;
/**
 * Returns true if the expression can be statically determined to be a method call on a jQuery instance
 * with a given name.
 */
function isCallOnjQuery(node, name) {
    if (!(0, babel_types_1.isCallExpression)(node))
        return false;
    var callee = node.callee;
    if (!(0, babel_types_1.isMemberExpression)(callee))
        return false;
    var obj = callee.object;
    if (!isjQueryInstance(obj))
        return false;
    var property = callee.property;
    if (!(0, babel_types_1.isIdentifier)(property))
        return false;
    if (name && property.name !== name)
        return false;
    if ((0, babel_types_1.isIdentifier)(obj) && (obj.name === "Array" || obj.name === "document"))
        return false;
    return true;
}
exports.isCallOnjQuery = isCallOnjQuery;
