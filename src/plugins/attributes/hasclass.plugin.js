"use strict";
exports.__esModule = true;
exports.HasClassPlugin = void 0;
var call_expression_of_jquery_collection_1 = require("../../model/matchers/call-expression-of-jquery-collection");
var babel_types_1 = require("babel-types");
var return_value_1 = require("../../model/return-types/return-value");
exports.HasClassPlugin = {
    returnType: new return_value_1.ReturnValue(),
    matchesExpressionType: new call_expression_of_jquery_collection_1.CallExpressionOfjQueryCollection("hasClass"),
    applicableWithArguments: function (args) { return args.length === 1; },
    replaceWith: function (element, _a) {
        var clz = _a[0];
        var classList = (0, babel_types_1.memberExpression)(element, (0, babel_types_1.identifier)("classList"));
        var contains = (0, babel_types_1.memberExpression)(classList, (0, babel_types_1.identifier)("contains"));
        return (0, babel_types_1.callExpression)(contains, [clz]);
    }
};
