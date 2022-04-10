"use strict";
exports.__esModule = true;
exports.HeightGetPlugin = void 0;
var return_value_1 = require("../../model/return-types/return-value");
var call_expression_of_jquery_collection_1 = require("../../model/matchers/call-expression-of-jquery-collection");
var collectors_1 = require("../../util/collectors");
var babel_types_1 = require("babel-types");
exports.HeightGetPlugin = {
    returnType: new return_value_1.ReturnValue(),
    matchesExpressionType: new call_expression_of_jquery_collection_1.CallExpressionOfjQueryCollection("height"),
    applicableWithArguments: function (args) { return args.length === 0; },
    replaceWith: function (element) {
        return (0, babel_types_1.memberExpression)((0, collectors_1.firstOfArray)(element), (0, babel_types_1.identifier)("clientHeight"));
    }
};
