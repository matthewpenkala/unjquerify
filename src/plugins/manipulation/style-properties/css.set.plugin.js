"use strict";
exports.__esModule = true;
exports.CssSetPlugin = void 0;
var babel_types_1 = require("babel-types");
var call_expression_of_jquery_collection_1 = require("../../../model/matchers/call-expression-of-jquery-collection");
var return_self_1 = require("../../../model/return-types/return-self");
exports.CssSetPlugin = {
    returnType: new return_self_1.ReturnSelf(),
    matchesExpressionType: new call_expression_of_jquery_collection_1.CallExpressionOfjQueryCollection("css"),
    applicableWithArguments: function (args) { return args.length === 2; },
    replaceWith: function (element, _a, scope) {
        var property = _a[0], value = _a[1];
        var setAttribute = (0, babel_types_1.memberExpression)(element, (0, babel_types_1.identifier)("setAttribute"));
        return (0, babel_types_1.callExpression)(setAttribute, [property, value]);
    }
};
