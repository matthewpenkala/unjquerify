"use strict";
exports.__esModule = true;
exports.unchainExpressions = exports.linkToCallExpression = void 0;
var babel_types_1 = require("babel-types");
var call_expression_of_jquery_collection_1 = require("../model/matchers/call-expression-of-jquery-collection");
var return_self_1 = require("../model/return-types/return-self");
var return_value_1 = require("../model/return-types/return-value");
var jquery_heuristics_1 = require("../util/jquery-heuristics");
function generateAssignment(id, expr) {
    return (0, babel_types_1.variableDeclaration)("const", [(0, babel_types_1.variableDeclarator)(id, expr)]);
}
function linkToCallExpression(object, link) {
    return (0, babel_types_1.callExpression)((0, babel_types_1.memberExpression)(object, (0, babel_types_1.identifier)(link.methodName)), link.arguments);
}
exports.linkToCallExpression = linkToCallExpression;
function generateStatements(path, _a, plugins) {
    var leftmost = _a.leftmost, links = _a.links;
    var collectionPlugins = plugins.filter(function (p) { return p.matchesExpressionType instanceof call_expression_of_jquery_collection_1.CallExpressionOfjQueryCollection; });
    function lookupPlugin(link) {
        return collectionPlugins.filter(function (p) {
            return p.matchesExpressionType.methodName === link.methodName && p.applicableWithArguments(link.arguments);
        });
    }
    var statements = [];
    var lastChainVariable;
    if (!(0, babel_types_1.isIdentifier)(leftmost)) {
        lastChainVariable = path.scope.generateUidIdentifier("start");
        statements.push(generateAssignment(lastChainVariable, leftmost));
    }
    else {
        lastChainVariable = leftmost;
    }
    for (var _i = 0, links_1 = links; _i < links_1.length; _i++) {
        var link = links_1[_i];
        var plugin = lookupPlugin(link)[0];
        if (!plugin) { // we don't know this method
            var newChain = path.scope.generateUidIdentifier("chain");
            var wrapped = (0, jquery_heuristics_1.wrapInjQueryFunctionCall)(lastChainVariable);
            var newCallExpression = linkToCallExpression(wrapped, link);
            var toArray = (0, babel_types_1.callExpression)((0, babel_types_1.memberExpression)(newCallExpression, (0, babel_types_1.identifier)("toArray")), []);
            statements.push(generateAssignment(newChain, toArray));
            lastChainVariable = newChain;
        }
        else if (plugin.returnType instanceof return_self_1.ReturnSelf) {
            statements.push((0, babel_types_1.expressionStatement)(linkToCallExpression(lastChainVariable, link)));
        }
        else if (plugin.returnType instanceof return_value_1.ReturnValue) {
            var newChain = path.scope.generateUidIdentifier("chain");
            statements.push(generateAssignment(newChain, linkToCallExpression(lastChainVariable, link)));
            lastChainVariable = newChain;
        }
    }
    return statements;
}
function unchainExpressions(path, chain, plugins) {
    if ((0, babel_types_1.isExpressionStatement)(path.parent)) {
        var statements = generateStatements(path, chain, plugins);
        path.getStatementParent().replaceWithMultiple(statements);
    }
    else if ((0, babel_types_1.isVariableDeclarator)(path.parent)) {
        var statements = generateStatements(path, chain, plugins);
        var parentPath = path.parentPath;
        var assignments = statements.filter(function (s) { return (0, babel_types_1.isVariableDeclaration)(s); });
        var lastAssignment = assignments[assignments.length - 1];
        var lastAssignmentValue = lastAssignment.declarations[0].init;
        parentPath.get("init").replaceWith(lastAssignmentValue);
        var before = statements.splice(0, statements.lastIndexOf(lastAssignment));
        path.getStatementParent().insertBefore(before);
        var after = statements.splice(statements.lastIndexOf(lastAssignment) + 1, statements.length);
        path.getStatementParent().insertAfter(after);
    }
}
exports.unchainExpressions = unchainExpressions;
