"use strict";
exports.__esModule = true;
exports.ReadyPlugin = void 0;
var call_expression_of_jquery_collection_1 = require("../../../model/matchers/call-expression-of-jquery-collection");
var return_self_1 = require("../../../model/return-types/return-self");
var template = require("@babel/template");
var replaceAstTemplate = template.statements("\n    const LISTENER_ID = LISTENER_FUNCTION;\n    if (document.readyState !== 'loading') {\n        LISTENER_ID();\n    } else {\n        document.addEventListener('DOMContentLoaded', LISTENER_ID);\n    }\n");
exports.ReadyPlugin = {
    returnType: new return_self_1.ReturnSelf(),
    matchesExpressionType: new call_expression_of_jquery_collection_1.CallExpressionOfjQueryCollection("ready"),
    applicableWithArguments: function (args) { return args.length === 1; },
    replaceWith: function (element, _a, scope) {
        var arg = _a[0];
        return replaceAstTemplate({
            LISTENER_FUNCTION: arg,
            LISTENER_ID: scope.generateUidIdentifier("onLoadListener")
        });
    },
    escapeFromChain: true
};
