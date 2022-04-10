"use strict";
exports.__esModule = true;
exports.IndexPlugin = void 0;
var babel_types_1 = require("babel-types");
var call_expression_of_jquery_collection_1 = require("../../../model/matchers/call-expression-of-jquery-collection");
var collectors_1 = require("../../../util/collectors");
var return_value_1 = require("../../../model/return-types/return-value");
var babel_1 = require("../../../util/babel");
exports.IndexPlugin = {
    returnType: new return_value_1.ReturnValue(),
    matchesExpressionType: new call_expression_of_jquery_collection_1.CallExpressionOfjQueryCollection("index"),
    applicableWithArguments: function (args) { return args.length === 0 || args.length === 1; },
    replaceWith: function (element, _a, scope) {
        var selector = _a[0];
        if (selector) {
            var array = (0, babel_1.arrayFrom)(element);
            if ((0, babel_types_1.isStringLiteral)(selector)) {
                var findIndex = (0, babel_types_1.memberExpression)(array, (0, babel_types_1.identifier)("findIndex"));
                var param = scope.generateUidIdentifier("element");
                var matches = (0, babel_types_1.memberExpression)(param, (0, babel_types_1.identifier)("matches"));
                var matchesCall = (0, babel_types_1.callExpression)(matches, [selector]);
                var lambda = (0, babel_types_1.arrowFunctionExpression)([param], matchesCall);
                return (0, babel_types_1.callExpression)(findIndex, [lambda]);
            }
            else {
                var indexOf = (0, babel_types_1.memberExpression)(array, (0, babel_types_1.identifier)("indexOf"));
                return (0, babel_types_1.callExpression)(indexOf, [(0, collectors_1.firstOfArray)(selector)]);
            }
        }
        else {
            var first = (0, collectors_1.firstOfArray)(element);
            var parent_1 = (0, babel_types_1.memberExpression)(first, (0, babel_types_1.identifier)("parentNode"));
            var parentChildren = (0, babel_types_1.memberExpression)(parent_1, (0, babel_types_1.identifier)("children"));
            var indexOf = (0, babel_types_1.memberExpression)((0, babel_1.arrayFrom)(parentChildren), (0, babel_types_1.identifier)("indexOf"));
            return (0, babel_types_1.callExpression)(indexOf, [first]);
        }
    }
};
