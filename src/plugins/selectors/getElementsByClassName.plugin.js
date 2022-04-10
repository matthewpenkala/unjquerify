"use strict";
exports.__esModule = true;
exports.GetElementsByClassNamePlugin = void 0;
var babel_types_1 = require("babel-types");
var call_expression_of_jquery_global_1 = require("../../model/matchers/call-expression-of-jquery-global");
var return_value_1 = require("../../model/return-types/return-value");
exports.GetElementsByClassNamePlugin = {
    returnType: new return_value_1.ReturnValue(),
    matchesExpressionType: new call_expression_of_jquery_global_1.CallExpressionOfjQueryGlobal(),
    applicableWithArguments: function (args) {
        if (args.length !== 0)
            return false;
        var arg = args[0];
        if (!(0, babel_types_1.isStringLiteral)(arg))
            return false;
        var literal = arg.value;
        if (!/^\.[a-zA-Z0-9]+$/.test(literal))
            return false;
        return true;
    },
    replaceWith: function (element, args) {
        var arg = args[0];
        var cssClass = arg.value.slice(1);
        var newLiteral = (0, babel_types_1.stringLiteral)(cssClass);
        var document = (0, babel_types_1.identifier)("document");
        var querySelectorAll = (0, babel_types_1.memberExpression)(document, (0, babel_types_1.identifier)("getElementsByClassName"));
        return (0, babel_types_1.callExpression)(querySelectorAll, [newLiteral]);
    }
};
