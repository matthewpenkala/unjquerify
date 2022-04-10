"use strict";
exports.__esModule = true;
exports.RemovePlugin = void 0;
var babel_types_1 = require("babel-types");
var call_expression_of_jquery_collection_1 = require("../../../model/matchers/call-expression-of-jquery-collection");
var return_self_1 = require("../../../model/return-types/return-self");
var babel_1 = require("../../../util/babel");
exports.RemovePlugin = {
    returnType: new return_self_1.ReturnSelf(),
    matchesExpressionType: new call_expression_of_jquery_collection_1.CallExpressionOfjQueryCollection("remove"),
    applicableWithArguments: function (args) { return args.length === 0; },
    replaceWith: function (element, _a) {
        var parentRemove = (0, babel_1.nestedMemberExpressions)(element, ["parentNode", "removeChild"]);
        return (0, babel_types_1.callExpression)(parentRemove, [element]);
    }
};
