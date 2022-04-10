"use strict";
exports.__esModule = true;
exports.PrevPlugin = void 0;
var babel_types_1 = require("babel-types");
var call_expression_of_jquery_collection_1 = require("../../../model/matchers/call-expression-of-jquery-collection");
var return_value_1 = require("../../../model/return-types/return-value");
var babel_1 = require("../../../util/babel");
exports.PrevPlugin = {
    returnType: new return_value_1.ReturnValue(),
    matchesExpressionType: new call_expression_of_jquery_collection_1.CallExpressionOfjQueryCollection("prev"),
    applicableWithArguments: function (args) { return args.length === 0 || args.length === 1; },
    replaceWith: function (element, _a, scope) {
        var selector = _a[0];
        var flatMapId = scope.generateUidIdentifier("element");
        var prev = (0, babel_types_1.memberExpression)(flatMapId, (0, babel_types_1.identifier)("previousElementSibling"));
        var map = (0, babel_1.mapNodeList)(element, (0, babel_types_1.arrowFunctionExpression)([flatMapId], prev));
        if (selector) {
            var matches = (0, babel_types_1.memberExpression)(flatMapId, (0, babel_types_1.identifier)("matches"));
            var matchesCall = (0, babel_types_1.callExpression)(matches, [selector]);
            var filterLambda = (0, babel_types_1.arrowFunctionExpression)([flatMapId], matchesCall);
            return (0, babel_types_1.callExpression)((0, babel_types_1.memberExpression)(map, (0, babel_types_1.identifier)("filter")), [filterLambda]);
        }
        else {
            return map;
        }
    }
};
