"use strict";
exports.__esModule = true;
exports.HtmlSetPlugin = void 0;
var babel_types_1 = require("babel-types");
var call_expression_of_jquery_collection_1 = require("../../../model/matchers/call-expression-of-jquery-collection");
var return_self_1 = require("../../../model/return-types/return-self");
exports.HtmlSetPlugin = {
    returnType: new return_self_1.ReturnSelf(),
    matchesExpressionType: new call_expression_of_jquery_collection_1.CallExpressionOfjQueryCollection("html"),
    applicableWithArguments: function (args) { return args.length === 1; },
    replaceWith: function (element, _a) {
        var html = _a[0];
        var innerHTML = (0, babel_types_1.memberExpression)(element, (0, babel_types_1.identifier)("innerHTML"));
        return (0, babel_types_1.assignmentExpression)("=", innerHTML, html);
    }
};
