"use strict";
exports.__esModule = true;
var babel = require("babel-core");
var jquery_expression_plugin_1 = require("./plugins/jquery-expression.plugin");
var all_plugins_1 = require("./all-plugins");
var cli = require("command-line-parser");
var args = cli();
var file = (args._args && args._args[0]) || undefined;
var withInlineSourceMap = args.withInlineSourceMap;
if (file) {
    var transformed = babel.transformFileSync(file, {
        plugins: [(0, jquery_expression_plugin_1.jQueryExpressionPlugin)(all_plugins_1.plugins)],
        sourceMaps: withInlineSourceMap ? "inline" : false,
        sourceFileName: file,
        ast: false
    });
    console.log(transformed.code);
}
else {
    console.error("Please specify a file to convert as the first argument to this script.");
    process.exit(1);
}
