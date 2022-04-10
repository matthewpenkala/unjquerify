"use strict";
exports.__esModule = true;
exports.ValSetPlugin = void 0;
var return_self_1 = require("../../model/return-types/return-self");
var call_expression_of_jquery_collection_1 = require("../../model/matchers/call-expression-of-jquery-collection");
var babel_types_1 = require("babel-types");
exports.ValSetPlugin = {
    returnType: new return_self_1.ReturnSelf(),
    matchesExpressionType: new call_expression_of_jquery_collection_1.CallExpressionOfjQueryCollection("val"),
    applicableWithArguments: function (args) { return args.length === 1; },
    replaceWith: function (element, _a) {
        var newValue = _a[0];
        var valueProperty = (0, babel_types_1.memberExpression)(element, (0, babel_types_1.identifier)("value"));
        return (0, babel_types_1.assignmentExpression)("=", valueProperty, newValue);
    }
};
