"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.UploadSection = void 0;
var react_1 = __importStar(require("react"));
var Dropzone_1 = __importDefault(require("../Dropzone/Dropzone"));
var ThumbnailsMosaic_1 = require("../ThumbnailsMosaic/ThumbnailsMosaic");
var UploadSection_style_1 = require("./UploadSection.style");
var UploadSection = function (props) {
    var setImagesReadyForUpload = props.setImagesReadyForUpload, filesToDisplay = props.filesToDisplay, otherProps = __rest(props, ["setImagesReadyForUpload", "filesToDisplay"]);
    var _a = react_1.useState(null), setUploadError = _a[1];
    var uploadError = "Le fichier n'est pas bon"; // FIXME: tmps
    return (react_1["default"].createElement("div", __assign({}, otherProps),
        react_1["default"].createElement(Dropzone_1["default"], { setImagesToUpload: setImagesReadyForUpload, setUploadError: setUploadError }),
        uploadError && (react_1["default"].createElement(UploadSection_style_1.ErrorBox, null,
            react_1["default"].createElement("h4", null, "Un erreur est survenue lors de l'envoi d'images:"),
            react_1["default"].createElement("p", null,
                " ",
                uploadError,
                " "))),
        react_1["default"].createElement(ThumbnailsMosaic_1.ThumbnailsMosaic, { fileList: filesToDisplay })));
};
exports.UploadSection = UploadSection;
