"use strict";
exports.__esModule = true;
exports.arrayCollector = exports.firstOfArray = void 0;
var babel_types_1 = require("babel-types");
/**
 * a => a[0]
 */
function firstOfArray(node) {
    return (0, babel_types_1.memberExpression)(node, (0, babel_types_1.numericLiteral)(0), true);
}
exports.firstOfArray = firstOfArray;
/**
 * a => a.<method>(_element => wrapper(_element))
 */
function arrayCollector(array, method, parameter, body) {
    var forEachMember = (0, babel_types_1.memberExpression)(array, (0, babel_types_1.identifier)(method));
    var fn = (0, babel_types_1.arrowFunctionExpression)([parameter], body(parameter));
    return (0, babel_types_1.callExpression)(forEachMember, [fn]);
}
exports.arrayCollector = arrayCollector;
