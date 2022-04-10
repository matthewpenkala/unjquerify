"use strict";
exports.__esModule = true;
exports.plugins = void 0;
var css_get_plugin_1 = require("./plugins/manipulation/style-properties/css.get.plugin");
var getElementsByClassName_plugin_1 = require("./plugins/selectors/getElementsByClassName.plugin");
var text_set_plugin_1 = require("./plugins/manipulation/dom-insertion/text.set.plugin");
var addclass_plugin_1 = require("./plugins/attributes/addclass.plugin");
var hide_plugin_1 = require("./plugins/effects/basics/hide.plugin");
var querySelectorAll_plugin_1 = require("./plugins/selectors/querySelectorAll.plugin");
var text_get_plugin_1 = require("./plugins/manipulation/dom-insertion/text.get.plugin");
var ready_plugin_1 = require("./plugins/events/document-loading/ready.plugin");
var is_plugin_1 = require("./plugins/traversing/filtering/is.plugin");
var attr_get_plugin_1 = require("./plugins/manipulation/general-attributes/attr.get.plugin");
var attr_set_plugin_1 = require("./plugins/manipulation/general-attributes/attr.set.plugin");
var html_get_plugin_1 = require("./plugins/manipulation/dom-insertion/html.get.plugin");
var html_set_plugin_1 = require("./plugins/manipulation/dom-insertion/html.set.plugin");
var remove_plugin_1 = require("./plugins/manipulation/dom-removal/remove.plugin");
var empty_plugin_1 = require("./plugins/manipulation/dom-removal/empty.plugin");
var find_plugin_1 = require("./plugins/traversing/tree-traversal/find.plugin");
var css_set_plugin_1 = require("./plugins/manipulation/style-properties/css.set.plugin");
var click_attach_plugin_1 = require("./plugins/events/mouse-events/click.attach.plugin");
var on_plugin_1 = require("./plugins/events/event-handler-attachment/on.plugin");
var siblings_plugin_1 = require("./plugins/traversing/tree-traversal/siblings.plugin");
var prev_plugin_1 = require("./plugins/traversing/tree-traversal/prev.plugin");
var next_plugin_1 = require("./plugins/traversing/tree-traversal/next.plugin");
var val_get_plugin_1 = require("./plugins/attributes/val.get.plugin");
var val_set_plugin_1 = require("./plugins/attributes/val.set.plugin");
var index_plugin_1 = require("./plugins/miscellaneous/dom-element-methods/index.plugin");
var contents_plugin_1 = require("./plugins/traversing/miscellaneous-traversing/contents.plugin");
var height_get_plugin_1 = require("./plugins/dimensions/height.get.plugin");
var removeclass_plugin_1 = require("./plugins/attributes/removeclass.plugin");
var hasclass_plugin_1 = require("./plugins/attributes/hasclass.plugin");
var toggleclass_plugin_1 = require("./plugins/attributes/toggleclass.plugin");
exports.plugins = [
    ready_plugin_1.ReadyPlugin,
    getElementsByClassName_plugin_1.GetElementsByClassNamePlugin,
    querySelectorAll_plugin_1.QuerySelectorAllPlugin,
    css_get_plugin_1.CssGetPlugin,
    css_set_plugin_1.CssSetPlugin,
    addclass_plugin_1.AddClassPlugin,
    text_set_plugin_1.TextSetPlugin,
    text_get_plugin_1.TextGetPlugin,
    hide_plugin_1.HidePlugin,
    is_plugin_1.IsPlugin,
    attr_get_plugin_1.AttrGetPlugin,
    attr_set_plugin_1.AttrSetPlugin,
    html_get_plugin_1.HtmlGetPlugin,
    html_set_plugin_1.HtmlSetPlugin,
    remove_plugin_1.RemovePlugin,
    empty_plugin_1.EmptyPlugin,
    find_plugin_1.FindPlugin,
    click_attach_plugin_1.ClickAttachPlugin,
    on_plugin_1.OnPlugin,
    siblings_plugin_1.SiblingsPlugin,
    prev_plugin_1.PrevPlugin,
    next_plugin_1.NextPlugin,
    val_get_plugin_1.ValGetPlugin,
    val_set_plugin_1.ValSetPlugin,
    index_plugin_1.IndexPlugin,
    contents_plugin_1.ContentsPlugin,
    height_get_plugin_1.HeightGetPlugin,
    removeclass_plugin_1.RemoveClassPlugin,
    hasclass_plugin_1.HasClassPlugin,
    toggleclass_plugin_1.ToggleClassPlugin,
];
