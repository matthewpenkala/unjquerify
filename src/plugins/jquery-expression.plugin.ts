import {CallExpression, Expression, expressionStatement, VariableDeclarator, variableDeclarator,} from "babel-types";
import {NodePath, Visitor} from "babel-traverse";
import {CallExpressionOfjQueryCollection} from "../model/matchers/call-expression-of-jquery-collection";
import {CallExpressionOfjQueryGlobal} from "../model/matchers/call-expression-of-jquery-global";
import {
    matchesCallExpressionOfjQueryCollection,
    matchesCallExpressionOfjQueryGlobal,
    matchesCallExpressionOfjQueryGlobalMember,
} from "./matchers";
import {buildChain} from "./chain";
import {Plugin} from "../model/plugin";
import {unchainExpressions} from "./unchain";
import {ReturnSelf} from "../model/return-types/return-self";
import {arrayCollector} from "../util/collectors";
import {ReturnValue} from "../model/return-types/return-value";

export interface CallExpressionOfjQueryCollectionPlugin extends Plugin {
    matchesExpressionType: CallExpressionOfjQueryCollection;
}

export function jQueryExpressionPlugin(plugins: Plugin[]): { visitor: Visitor } {
    const collectionPlugins =
        plugins.filter(p => p.matchesExpressionType instanceof CallExpressionOfjQueryCollection) as
            CallExpressionOfjQueryCollectionPlugin[];
    const callExpressionOfjQueryGlobalPlugins =
        plugins.filter(p => p.matchesExpressionType instanceof CallExpressionOfjQueryGlobal);
    return {
        visitor: {
            CallExpression: (path: NodePath<CallExpression>) => {
                const node = path.node;
                const args = node.arguments as Expression[]; // TODO accept Spread
                if (matchesCallExpressionOfjQueryGlobalMember(node)) {
                    const functionName = node.callee.property.name;
                    console.log("Found CallExpressionOfjQueryMember", functionName);
                } else if (matchesCallExpressionOfjQueryGlobal(node)) {
                    callExpressionOfjQueryGlobalPlugins
                        .filter(p => p.applicableWithArguments(node.arguments))
                        .forEach(p => {
                            const out = p.replaceWith(node, args, path.scope);
                            if (Array.isArray(out)) path.replaceWithMultiple(out);
                            else path.replaceWith(out);
                        });
                } else if (matchesCallExpressionOfjQueryCollection(node)) {
                    const chain = buildChain(node);
                    if (chain.links.length > 1) {
                        unchainExpressions(path, chain, plugins);
                    } else {
                        const link = chain.links[0];
                        const ps = collectionPlugins.filter(
                            p => p.matchesExpressionType.methodName === link.methodName &&
                                p.applicableWithArguments(link.arguments),
                        );
                        if (ps.length === 0) return;
                        const plugin = ps[0];

                        // TODO remove messy casts.
                        if (path.parentPath.isVariableDeclarator()) {
                            const parent = path.parentPath as NodePath<VariableDeclarator>;
                            if (plugin.escapeFromChain) {
                                parent.replaceWith(variableDeclarator(parent.node.id, chain.leftmost));
                                const replacement = plugin.replaceWith(chain.leftmost, args, path.scope);
                                parent.getStatementParent().insertAfter(replacement);
                            } else if (plugin.returnType instanceof ReturnSelf) {
                                parent.replaceWith(variableDeclarator(parent.node.id, chain.leftmost));
                                const id = path.scope.generateUidIdentifier("element");
                                const collected = arrayCollector(parent.node.id as Expression,
                                    "forEach", id, (ele) => {
                                        return plugin.replaceWith(ele, args, path.scope) as Expression;
                                    });
                                parent.getStatementParent().insertAfter(expressionStatement(collected));
                            } else if (plugin.returnType instanceof ReturnValue) {
                                const applied = plugin.replaceWith(chain.leftmost, args, path.scope);
                                const wrap = variableDeclarator(parent.node.id, applied as Expression);
                                parent.replaceWith(wrap);
                            }
                        } else {
                            if (plugin.escapeFromChain) {
                                const out = plugin.replaceWith(chain.leftmost, args, path.scope);
                                if (Array.isArray(out)) path.replaceWithMultiple(out);
                                else path.replaceWith(out);
                            } else if (plugin.returnType instanceof ReturnSelf) {
                                const id = path.scope.generateUidIdentifier("element");

                                const collected = arrayCollector(chain.leftmost as Expression,
                                    "forEach", id, (ele) => {
                                        return plugin.replaceWith(ele, args, path.scope) as Expression;
                                    });
                                path.replaceWith(collected);
                            }
                        }
                    }
                }
            },
        },
    };
}
