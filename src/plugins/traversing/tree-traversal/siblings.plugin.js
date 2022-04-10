"use strict";
exports.__esModule = true;
exports.SiblingsPlugin = void 0;
var call_expression_of_jquery_collection_1 = require("../../../model/matchers/call-expression-of-jquery-collection");
var return_value_1 = require("../../../model/return-types/return-value");
var babel_1 = require("../../../util/babel");
var babeltemplate = require("@babel/template");
var babel_types_1 = require("babel-types");
var template = babeltemplate.expression("[...ELEMENT.parentNode.children].filter(PARAM => PARAM !== ELEMENT)");
var templateSelector = babeltemplate.expression("[...ELEMENT.parentNode.children].filter(PARAM => (PARAM !== ELEMENT)"
    + "&& PARAM.matches(SELECTOR))");
exports.SiblingsPlugin = {
    returnType: new return_value_1.ReturnValue(),
    matchesExpressionType: new call_expression_of_jquery_collection_1.CallExpressionOfjQueryCollection("siblings"),
    applicableWithArguments: function (args) { return args.length === 0 || args.length === 1; },
    replaceWith: function (element, _a, scope) {
        var selector = _a[0];
        var flatMapId = scope.generateUidIdentifier("parent");
        if (selector) {
            return (0, babel_1.flatMapNodeList)(element, (0, babel_types_1.arrowFunctionExpression)([flatMapId], templateSelector({
                ELEMENT: flatMapId,
                PARAM: scope.generateUidIdentifier("element"),
                SELECTOR: selector
            })));
        }
        else {
            return (0, babel_1.flatMapNodeList)(element, (0, babel_types_1.arrowFunctionExpression)([flatMapId], template({
                ELEMENT: flatMapId,
                PARAM: scope.generateUidIdentifier("element")
            })));
        }
    }
};
