"use strict";
exports.__esModule = true;
exports.ToggleClassPlugin = void 0;
var return_self_1 = require("../../model/return-types/return-self");
var call_expression_of_jquery_collection_1 = require("../../model/matchers/call-expression-of-jquery-collection");
var babel_types_1 = require("babel-types");
exports.ToggleClassPlugin = {
    returnType: new return_self_1.ReturnSelf(),
    matchesExpressionType: new call_expression_of_jquery_collection_1.CallExpressionOfjQueryCollection("toggleClass"),
    applicableWithArguments: function (args) { return args.length === 1; },
    replaceWith: function (element, _a, scope) {
        var clz = _a[0];
        var classList = (0, babel_types_1.memberExpression)(element, (0, babel_types_1.identifier)("classList"));
        var toggle = (0, babel_types_1.memberExpression)(classList, (0, babel_types_1.identifier)("toggle"));
        return (0, babel_types_1.callExpression)(toggle, [clz]);
    }
};
