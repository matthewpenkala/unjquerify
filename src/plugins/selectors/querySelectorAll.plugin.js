"use strict";
exports.__esModule = true;
exports.QuerySelectorAllPlugin = void 0;
var babel_types_1 = require("babel-types");
var call_expression_of_jquery_global_1 = require("../../model/matchers/call-expression-of-jquery-global");
var return_value_1 = require("../../model/return-types/return-value");
exports.QuerySelectorAllPlugin = {
    returnType: new return_value_1.ReturnValue(),
    matchesExpressionType: new call_expression_of_jquery_global_1.CallExpressionOfjQueryGlobal(),
    applicableWithArguments: function (args) { return args.length === 1; },
    replaceWith: function (element, _a) {
        var arg = _a[0];
        var document = (0, babel_types_1.identifier)("document");
        var querySelectorAll = (0, babel_types_1.memberExpression)(document, (0, babel_types_1.identifier)("querySelectorAll"));
        return (0, babel_types_1.callExpression)(querySelectorAll, [arg]);
    }
};
