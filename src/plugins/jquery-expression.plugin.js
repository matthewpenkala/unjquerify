"use strict";
exports.__esModule = true;
exports.jQueryExpressionPlugin = void 0;
var babel_types_1 = require("babel-types");
var call_expression_of_jquery_collection_1 = require("../model/matchers/call-expression-of-jquery-collection");
var call_expression_of_jquery_global_1 = require("../model/matchers/call-expression-of-jquery-global");
var matchers_1 = require("./matchers");
var chain_1 = require("./chain");
var unchain_1 = require("./unchain");
var return_self_1 = require("../model/return-types/return-self");
var collectors_1 = require("../util/collectors");
var return_value_1 = require("../model/return-types/return-value");
function replaceWithPluginOutput(path, newExpression) {
    if (Array.isArray(newExpression))
        path.replaceWithMultiple(newExpression);
    else
        path.replaceWith(newExpression);
}
function transformVariableDeclarator(path, plugin, chain, args) {
    var parent = path.parentPath;
    if (plugin.escapeFromChain) {
        parent.replaceWith((0, babel_types_1.variableDeclarator)(parent.node.id, chain.leftmost));
        var replacement = plugin.replaceWith(chain.leftmost, args, path.scope);
        parent.getStatementParent().insertAfter(replacement);
    }
    else if (plugin.returnType instanceof return_self_1.ReturnSelf) {
        parent.replaceWith((0, babel_types_1.variableDeclarator)(parent.node.id, chain.leftmost));
        var id = path.scope.generateUidIdentifier("element");
        var collected = (0, collectors_1.arrayCollector)(parent.node.id, "forEach", id, function (ele) {
            return plugin.replaceWith(ele, args, path.scope);
        });
        parent.getStatementParent().insertAfter((0, babel_types_1.expressionStatement)(collected));
    }
    else if (plugin.returnType instanceof return_value_1.ReturnValue) {
        var applied = plugin.replaceWith(chain.leftmost, args, path.scope);
        var wrap = (0, babel_types_1.variableDeclarator)(parent.node.id, applied);
        parent.replaceWith(wrap);
    }
}
function extractExpression(path, plugin, chain, args) {
    if (plugin.escapeFromChain) {
        var out = plugin.replaceWith(chain.leftmost, args, path.scope);
        replaceWithPluginOutput(path, out);
    }
    else if (plugin.returnType instanceof return_self_1.ReturnSelf) {
        var id = path.scope.generateUidIdentifier("element");
        var collected = (0, collectors_1.arrayCollector)(chain.leftmost, "forEach", id, function (ele) {
            return plugin.replaceWith(ele, args, path.scope);
        });
        path.replaceWith(collected);
    }
    else if (plugin.returnType instanceof return_value_1.ReturnValue) {
        var applied = plugin.replaceWith(chain.leftmost, args, path.scope);
        replaceWithPluginOutput(path, applied);
    }
}
function jQueryExpressionPlugin(plugins) {
    var collectionPlugins = plugins.filter(function (p) { return p.matchesExpressionType instanceof call_expression_of_jquery_collection_1.CallExpressionOfjQueryCollection; });
    var callExpressionOfjQueryGlobalPlugins = plugins.filter(function (p) { return p.matchesExpressionType instanceof call_expression_of_jquery_global_1.CallExpressionOfjQueryGlobal; });
    var isToArrayException = function (chain) {
        return chain.links.length === 2 && chain.links[1].methodName === "toArray";
    };
    var CallExpressionTransform = function (path) {
        var node = path.node;
        var args = node.arguments; // TODO accept Spread
        if ((0, matchers_1.matchesCallExpressionOfjQueryGlobalMember)(node)) {
            var functionName = node.callee.property.name;
            console.log("Found CallExpressionOfjQueryMember", functionName);
        }
        else if ((0, matchers_1.matchesCallExpressionOfjQueryGlobal)(node)) {
            callExpressionOfjQueryGlobalPlugins
                .filter(function (plugin) { return plugin.applicableWithArguments(node.arguments); })
                .forEach(function (plugin) {
                replaceWithPluginOutput(path, plugin.replaceWith(node, args, path.scope));
            });
        }
        else if ((0, matchers_1.matchesCallExpressionOfjQueryCollection)(node)) {
            var chain = (0, chain_1.buildChain)(node);
            if (chain.links.length > 1 && !isToArrayException(chain)) {
                (0, unchain_1.unchainExpressions)(path, chain, plugins);
            }
            else {
                var link_1 = chain.links[0];
                var matchedPlugins = collectionPlugins.filter(function (p) { return p.matchesExpressionType.methodName === link_1.methodName &&
                    p.applicableWithArguments(link_1.arguments); });
                if (matchedPlugins.length === 0)
                    return;
                var plugin = matchedPlugins[0];
                // TODO remove messy casts.
                if (path.parentPath.isVariableDeclarator()) {
                    transformVariableDeclarator(path, plugin, chain, args);
                }
                else {
                    extractExpression(path, plugin, chain, args);
                }
            }
        }
    };
    return {
        visitor: {
            CallExpression: CallExpressionTransform
        }
    };
}
exports.jQueryExpressionPlugin = jQueryExpressionPlugin;
