"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.MiddleBox = exports.Image = exports.ThumbnailBox = exports.Container = void 0;
var styled_components_1 = __importDefault(require("styled-components"));
exports.Container = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  margin: 20px 0;\n\n  justify-content: center;\n  flex-wrap: wrap;\n"], ["\n  display: flex;\n  flex-direction: row;\n  margin: 20px 0;\n\n  justify-content: center;\n  flex-wrap: wrap;\n"])));
exports.ThumbnailBox = styled_components_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: relative;\n  height: 140px;\n  cursor: pointer;\n  padding: 10px;\n  &:hover .middle {\n    opacity: 1;\n  }\n  &:hover .image {\n    opacity: 0.3;\n  }\n"], ["\n  position: relative;\n  height: 140px;\n  cursor: pointer;\n  padding: 10px;\n  &:hover .middle {\n    opacity: 1;\n  }\n  &:hover .image {\n    opacity: 0.3;\n  }\n"])));
exports.Image = styled_components_1["default"].img(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  opacity: 1;\n  display: block;\n  height: 100%;\n  width: auto;\n  transition: 0.5s ease;\n  backface-visibility: hidden;\n"], ["\n  opacity: 1;\n  display: block;\n  height: 100%;\n  width: auto;\n  transition: 0.5s ease;\n  backface-visibility: hidden;\n"])));
exports.MiddleBox = styled_components_1["default"].div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  transition: 0.5s ease;\n  opacity: 0;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  -ms-transform: translate(-50%, -50%);\n  text-align: center;\n"], ["\n  transition: 0.5s ease;\n  opacity: 0;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  -ms-transform: translate(-50%, -50%);\n  text-align: center;\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
