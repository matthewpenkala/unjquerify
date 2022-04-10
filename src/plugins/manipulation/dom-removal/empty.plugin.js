"use strict";
exports.__esModule = true;
exports.EmptyPlugin = void 0;
var babel_types_1 = require("babel-types");
var call_expression_of_jquery_collection_1 = require("../../../model/matchers/call-expression-of-jquery-collection");
var return_self_1 = require("../../../model/return-types/return-self");
exports.EmptyPlugin = {
    returnType: new return_self_1.ReturnSelf(),
    matchesExpressionType: new call_expression_of_jquery_collection_1.CallExpressionOfjQueryCollection("empty"),
    applicableWithArguments: function (args) { return args.length === 0; },
    replaceWith: function (element, _a) {
        var innerHTML = (0, babel_types_1.memberExpression)(element, (0, babel_types_1.identifier)("innerHTML"));
        return (0, babel_types_1.assignmentExpression)("=", innerHTML, (0, babel_types_1.stringLiteral)(""));
    }
};
