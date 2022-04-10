"use strict";
exports.__esModule = true;
exports.TextSetPlugin = void 0;
var babel_types_1 = require("babel-types");
var call_expression_of_jquery_collection_1 = require("../../../model/matchers/call-expression-of-jquery-collection");
var return_self_1 = require("../../../model/return-types/return-self");
exports.TextSetPlugin = {
    returnType: new return_self_1.ReturnSelf(),
    matchesExpressionType: new call_expression_of_jquery_collection_1.CallExpressionOfjQueryCollection("text"),
    applicableWithArguments: function (args) { return args.length === 1; },
    replaceWith: function (element, _a) {
        var text = _a[0];
        var textContent = (0, babel_types_1.memberExpression)(element, (0, babel_types_1.identifier)("textContent"));
        return (0, babel_types_1.assignmentExpression)("=", textContent, text);
    }
};
