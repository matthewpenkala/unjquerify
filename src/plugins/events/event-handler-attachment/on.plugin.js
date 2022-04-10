"use strict";
exports.__esModule = true;
exports.OnPlugin = exports.addEventListenerCall = void 0;
var babel_types_1 = require("babel-types");
var call_expression_of_jquery_collection_1 = require("../../../model/matchers/call-expression-of-jquery-collection");
var return_self_1 = require("../../../model/return-types/return-self");
function addEventListenerCall(element, eventName, handler) {
    var addEventListener = (0, babel_types_1.memberExpression)(element, (0, babel_types_1.identifier)("addEventListener"));
    return (0, babel_types_1.callExpression)(addEventListener, [eventName, handler]);
}
exports.addEventListenerCall = addEventListenerCall;
exports.OnPlugin = {
    returnType: new return_self_1.ReturnSelf(),
    matchesExpressionType: new call_expression_of_jquery_collection_1.CallExpressionOfjQueryCollection("on"),
    applicableWithArguments: function (args) { return args.length === 2; },
    replaceWith: function (element, _a) {
        var eventName = _a[0], handler = _a[1];
        return addEventListenerCall(element, eventName, handler);
    }
};
