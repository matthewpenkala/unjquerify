"use strict";
exports.__esModule = true;
exports.ContentsPlugin = void 0;
var babel_types_1 = require("babel-types");
var call_expression_of_jquery_collection_1 = require("../../../model/matchers/call-expression-of-jquery-collection");
var return_value_1 = require("../../../model/return-types/return-value");
var babel_1 = require("../../../util/babel");
exports.ContentsPlugin = {
    returnType: new return_value_1.ReturnValue(),
    matchesExpressionType: new call_expression_of_jquery_collection_1.CallExpressionOfjQueryCollection("contents"),
    applicableWithArguments: function (args) { return args.length === 0; },
    replaceWith: function (element, _a, scope) {
        var selector = _a[0];
        var param = scope.generateUidIdentifier("parent");
        var childNodes = (0, babel_types_1.memberExpression)(param, (0, babel_types_1.identifier)("childNodes"));
        return (0, babel_1.flatMapNodeList)(element, (0, babel_types_1.arrowFunctionExpression)([param], childNodes));
    }
};
