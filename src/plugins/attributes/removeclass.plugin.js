"use strict";
exports.__esModule = true;
exports.RemoveClassPlugin = void 0;
var return_self_1 = require("../../model/return-types/return-self");
var call_expression_of_jquery_collection_1 = require("../../model/matchers/call-expression-of-jquery-collection");
var babel_types_1 = require("babel-types");
exports.RemoveClassPlugin = {
    returnType: new return_self_1.ReturnSelf(),
    matchesExpressionType: new call_expression_of_jquery_collection_1.CallExpressionOfjQueryCollection("removeClass"),
    applicableWithArguments: function (args) { return args.length === 0 || args.length === 1; },
    replaceWith: function (element, _a, scope) {
        var classes = _a[0];
        var classList = (0, babel_types_1.memberExpression)(element, (0, babel_types_1.identifier)("classList"));
        var remove = (0, babel_types_1.memberExpression)(classList, (0, babel_types_1.identifier)("remove"));
        if (classes === undefined) {
            var lambdaParam = scope.generateUidIdentifier("clz");
            var forEach = (0, babel_types_1.memberExpression)(classList, (0, babel_types_1.identifier)("forEach"));
            var lambda = (0, babel_types_1.arrowFunctionExpression)([lambdaParam], (0, babel_types_1.callExpression)(remove, [lambdaParam]));
            return (0, babel_types_1.callExpression)(forEach, [lambda]);
        }
        else {
            if ((0, babel_types_1.isStringLiteral)(classes)) {
                var classLiteral = classes;
                var split = classLiteral.value.split(" ");
                return (0, babel_types_1.callExpression)(remove, split.map(function (s) { return (0, babel_types_1.stringLiteral)(s); }));
            }
            else {
                var split = (0, babel_types_1.memberExpression)(classes, (0, babel_types_1.identifier)("split"));
                var splitCall = (0, babel_types_1.callExpression)(split, [(0, babel_types_1.stringLiteral)(" ")]);
                return (0, babel_types_1.callExpression)(remove, [(0, babel_types_1.spreadElement)(splitCall)]);
            }
        }
    }
};
