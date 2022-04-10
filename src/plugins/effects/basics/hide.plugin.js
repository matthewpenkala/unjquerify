"use strict";
exports.__esModule = true;
exports.HidePlugin = void 0;
var babel_types_1 = require("babel-types");
var call_expression_of_jquery_collection_1 = require("../../../model/matchers/call-expression-of-jquery-collection");
var return_self_1 = require("../../../model/return-types/return-self");
var babel_1 = require("../../../util/babel");
exports.HidePlugin = {
    returnType: new return_self_1.ReturnSelf(),
    matchesExpressionType: new call_expression_of_jquery_collection_1.CallExpressionOfjQueryCollection("hide"),
    applicableWithArguments: function (args) { return args.length === 0; },
    replaceWith: function (element) {
        var styleDisplay = (0, babel_1.nestedMemberExpressions)(element, ["style", "display"]);
        return (0, babel_types_1.assignmentExpression)("=", styleDisplay, (0, babel_types_1.stringLiteral)("none"));
    }
};
