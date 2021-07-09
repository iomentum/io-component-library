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
exports.__esModule = true;
var react_1 = __importStar(require("react"));
var react_dropzone_1 = require("react-dropzone");
var Dropzone_style_1 = require("./Dropzone.style");
var image_utils_1 = require("./image-utils");
var Dropzone = function (props) {
    var setImagesToUpload = props.setImagesToUpload, setUploadError = props.setUploadError, _a = props.maxUploadSize, maxUploadSize = _a === void 0 ? 1000000 : _a, _b = props.label, label = _b === void 0 ? "Glissez-déposez votre image ici, ou cliquez pour rechercher un fichier" : _b, otherProps = __rest(props, ["setImagesToUpload", "setUploadError", "maxUploadSize", "label"]);
    var _c = react_dropzone_1.useDropzone({ accept: "image/*" }), getRootProps = _c.getRootProps, getInputProps = _c.getInputProps, isDragActive = _c.isDragActive, isDragAccept = _c.isDragAccept, isDragReject = _c.isDragReject, allFiles = _c.acceptedFiles;
    react_1.useEffect(function () {
        if (allFiles.length > 0) {
            Promise.all(allFiles.map(function (file) { return image_utils_1.resize(file, maxUploadSize); }))
                .then(function (files) {
                setImagesToUpload(files);
            })["catch"](function (e) {
                setUploadError(e);
            });
        }
    }, [allFiles, setImagesToUpload, setUploadError]);
    return (react_1["default"].createElement(Dropzone_style_1.Container, __assign({}, getRootProps({ isDragActive: isDragActive, isDragAccept: isDragAccept, isDragReject: isDragReject }), otherProps),
        react_1["default"].createElement("input", __assign({}, getInputProps())),
        react_1["default"].createElement("p", null, label)));
};
exports["default"] = Dropzone;
