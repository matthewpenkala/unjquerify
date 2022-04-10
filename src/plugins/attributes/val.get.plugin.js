"use strict";
exports.__esModule = true;
exports.ValGetPlugin = void 0;
var call_expression_of_jquery_collection_1 = require("../../model/matchers/call-expression-of-jquery-collection");
var babel_types_1 = require("babel-types");
var collectors_1 = require("../../util/collectors");
var return_value_1 = require("../../model/return-types/return-value");
exports.ValGetPlugin = {
    returnType: new return_value_1.ReturnValue(),
    matchesExpressionType: new call_expression_of_jquery_collection_1.CallExpressionOfjQueryCollection("val"),
    applicableWithArguments: function (args) { return args.length === 0; },
    replaceWith: function (element) {
        return (0, babel_types_1.memberExpression)((0, collectors_1.firstOfArray)(element), (0, babel_types_1.identifier)("value"));
    }
};
