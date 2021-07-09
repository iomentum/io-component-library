"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.ThumbnailsMosaic = void 0;
var react_1 = __importDefault(require("react"));
var ThumbnailsMosaic_style_1 = require("./ThumbnailsMosaic.style");
var copyIcon = require("./copy-icon.png");
var ThumbnailsMosaic = function (props) {
    var fileList = props.fileList, otherProps = __rest(props, ["fileList"]);
    var copyToClipboard = function (image) {
        navigator.clipboard.writeText(image.url);
        // displayAlert({
        //   severity: "success",
        //   message: `${image.name} copié dans le press-papier`,
        // });
    };
    return (react_1["default"].createElement(ThumbnailsMosaic_style_1.Container
    // {...otherProps} // TODO: Fix this props
    , null,
        fileList.map(function (image, index) { return (react_1["default"].createElement(ThumbnailsMosaic_style_1.ThumbnailBox, { key: index, onClick: function () { return copyToClipboard(image); } },
            react_1["default"].createElement(ThumbnailsMosaic_style_1.Image, { src: image.url, alt: "Image", className: "image" }),
            react_1["default"].createElement(ThumbnailsMosaic_style_1.MiddleBox, { className: "middle" },
                react_1["default"].createElement(ThumbnailsMosaic_style_1.Image, { src: copyIcon, alt: "copy-icon", className: "copy-icon" })))); }),
        react_1["default"].createElement("div", null)));
};
exports.ThumbnailsMosaic = ThumbnailsMosaic;
