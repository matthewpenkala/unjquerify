"use strict";
exports.__esModule = true;
exports.AddClassPlugin = void 0;
var babel_types_1 = require("babel-types");
var call_expression_of_jquery_collection_1 = require("../../model/matchers/call-expression-of-jquery-collection");
var return_self_1 = require("../../model/return-types/return-self");
var babel_1 = require("../../util/babel");
exports.AddClassPlugin = {
    returnType: new return_self_1.ReturnSelf(),
    matchesExpressionType: new call_expression_of_jquery_collection_1.CallExpressionOfjQueryCollection("addClass"),
    applicableWithArguments: function (args) { return args.length === 1; },
    replaceWith: (function (element, _a) {
        var arg = _a[0];
        var classListAdd = (0, babel_1.nestedMemberExpressions)(element, ["classList", "add"]);
        if ((0, babel_types_1.isStringLiteral)(arg)) {
            var classes = arg.value.split(" ");
            return (0, babel_types_1.callExpression)(classListAdd, classes.map(function (name) { return (0, babel_types_1.stringLiteral)(name); }));
        }
        else {
            var split = (0, babel_types_1.memberExpression)(arg, (0, babel_types_1.identifier)("split"));
            var callSplit = (0, babel_types_1.callExpression)(split, [(0, babel_types_1.stringLiteral)(" ")]);
            return (0, babel_types_1.callExpression)(classListAdd, [(0, babel_types_1.spreadElement)(callSplit)]);
        }
    })
};
