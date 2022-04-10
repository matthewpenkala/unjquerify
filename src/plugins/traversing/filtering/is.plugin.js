"use strict";
exports.__esModule = true;
exports.IsPlugin = void 0;
var babel_types_1 = require("babel-types");
var call_expression_of_jquery_collection_1 = require("../../../model/matchers/call-expression-of-jquery-collection");
var return_value_1 = require("../../../model/return-types/return-value");
var collectors_1 = require("../../../util/collectors");
exports.IsPlugin = {
    returnType: new return_value_1.ReturnValue(),
    matchesExpressionType: new call_expression_of_jquery_collection_1.CallExpressionOfjQueryCollection("is"),
    applicableWithArguments: function (args) { return args.length === 1; },
    replaceWith: function (element, _a, scope) {
        var selector = _a[0];
        return (0, collectors_1.arrayCollector)(element, "some", scope.generateUidIdentifier("element"), function (e) {
            var matches = (0, babel_types_1.memberExpression)(e, (0, babel_types_1.identifier)("matches"));
            return (0, babel_types_1.callExpression)(matches, [selector]);
        });
    }
};
