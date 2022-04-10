"use strict";
exports.__esModule = true;
exports.CssGetPlugin = void 0;
var babel_types_1 = require("babel-types");
var call_expression_of_jquery_collection_1 = require("../../../model/matchers/call-expression-of-jquery-collection");
var collectors_1 = require("../../../util/collectors");
var return_value_1 = require("../../../model/return-types/return-value");
exports.CssGetPlugin = {
    returnType: new return_value_1.ReturnValue(),
    matchesExpressionType: new call_expression_of_jquery_collection_1.CallExpressionOfjQueryCollection("css"),
    applicableWithArguments: function (args) { return args.length === 1; },
    replaceWith: function (element, _a) {
        var property = _a[0];
        var computedStyle = (0, babel_types_1.callExpression)((0, babel_types_1.identifier)("getComputedStyle"), [(0, collectors_1.firstOfArray)(element)]);
        return (0, babel_types_1.memberExpression)(computedStyle, property, true);
    }
};
