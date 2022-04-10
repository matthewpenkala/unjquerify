"use strict";
exports.__esModule = true;
exports.ClickAttachPlugin = void 0;
var babel_types_1 = require("babel-types");
var call_expression_of_jquery_collection_1 = require("../../../model/matchers/call-expression-of-jquery-collection");
var return_self_1 = require("../../../model/return-types/return-self");
var on_plugin_1 = require("../event-handler-attachment/on.plugin");
exports.ClickAttachPlugin = {
    returnType: new return_self_1.ReturnSelf(),
    matchesExpressionType: new call_expression_of_jquery_collection_1.CallExpressionOfjQueryCollection("click"),
    applicableWithArguments: function (args) { return args.length === 1; },
    replaceWith: function (element, _a) {
        var handler = _a[0];
        return (0, on_plugin_1.addEventListenerCall)(element, (0, babel_types_1.stringLiteral)("click"), handler);
    }
};
