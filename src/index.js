"use strict";
exports.__esModule = true;
exports.event = exports.style = exports.elem = void 0;
function setInlineStyle(element, style) {
    for (var prop in style) {
        if (prop in element.style)
            element.style[prop] = style[prop];
        else
            element.style.setProperty(prop, style[prop]);
    }
}
function setAttribute(element, name, value) {
    if (name === "style")
        setInlineStyle(element, value);
    else if (name in element)
        element[name] = value;
    else
        element.setAttribute(name, value);
}
function elem() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var tag = args[0];
    var attributes = {}, children = [];
    if (args[1]) {
        if (typeof args[1] === "string")
            children = [args[1]];
        else if (Array.isArray(args[1]))
            children = args[1];
        else
            attributes = args[1];
    }
    if (args[2]) {
        if (typeof args[2] === "string")
            children = [args[2]];
        else
            children = args[2];
    }
    var el = document.createElement(tag);
    for (var attr in attributes)
        setAttribute(el, attr, attributes[attr]);
    for (var _a = 0, children_1 = children; _a < children_1.length; _a++) {
        var child = children_1[_a];
        el.append(child);
    }
    return el;
}
exports.elem = elem;
function elemGetArgs(args) {
    var _a = args.reverse(), id = _a[0], tag = _a[1];
    return [tag, id];
}
function checkElement(el, tag) {
    if (!el)
        throw new ReferenceError("Element not found.");
    if (tag && el.tagName.toLowerCase() != tag)
        console.warn(new TypeError("tag parameter and element's tag do not match."));
}
function elemGet() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var _a = elemGetArgs(args), tag = _a[0], id = _a[1];
    var el = document.getElementById(id);
    checkElement(el, tag);
    return el;
}
function elemGetChild() {
    var _a;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var _b = elemGetArgs(args), tag = _b[0], id = _b[1];
    var el = ((_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.children[0]) || null;
    checkElement(el, tag);
    return el;
}
function elemGetParent() {
    var _a;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var _b = elemGetArgs(args), tag = _b[0], id = _b[1];
    var el = ((_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.parentElement) || null;
    checkElement(el, tag);
    return el;
}
elem.get = elemGet;
elem.getChild = elemGetChild;
elem.getParent = elemGetParent;
var styleElement;
function style(selector, properties) {
    if (!styleElement) {
        styleElement = document.createElement("style");
        document.head.append(styleElement);
    }
    if (!styleElement.sheet)
        throw new Error("Unable to add style rule.");
    var index = styleElement.sheet.insertRule(selector + " {}");
    var rule = styleElement.sheet.cssRules[index];
    setInlineStyle(rule, properties);
    return rule;
}
exports.style = style;
function event(element, eventType, handler) {
    element.addEventListener(eventType, handler);
    return function () { return element.removeEventListener(eventType, handler); };
}
exports.event = event;
