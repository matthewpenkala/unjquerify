"use strict";
exports.__esModule = true;
exports.FindPlugin = void 0;
var babel_types_1 = require("babel-types");
var call_expression_of_jquery_collection_1 = require("../../../model/matchers/call-expression-of-jquery-collection");
var return_value_1 = require("../../../model/return-types/return-value");
var collectors_1 = require("../../../util/collectors");
exports.FindPlugin = {
    returnType: new return_value_1.ReturnValue(),
    matchesExpressionType: new call_expression_of_jquery_collection_1.CallExpressionOfjQueryCollection("find"),
    applicableWithArguments: function (args) { return args.length === 1; },
    replaceWith: function (element, _a, scope) {
        var selector = _a[0];
        var map = (0, collectors_1.arrayCollector)(element, "map", scope.generateUidIdentifier("element"), function (e) {
            var querySelectorAll = (0, babel_types_1.memberExpression)(e, (0, babel_types_1.identifier)("querySelectorAll"));
            return (0, babel_types_1.callExpression)(querySelectorAll, [selector]);
        });
        var concat = (0, babel_types_1.memberExpression)((0, babel_types_1.arrayExpression)(), (0, babel_types_1.identifier)("concat"));
        return (0, babel_types_1.callExpression)(concat, [(0, babel_types_1.spreadElement)(map)]);
    }
};
