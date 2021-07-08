"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.resize = void 0;
var Blitz = require("blitz-resize");
// resize takes an image and a newSize as parameters.
//
// if the image is bigger than the allowed size, we will drop it's quality
// otherwise we will leave the file untouched
//
function resize(image, expectedWeight) {
    return __awaiter(this, void 0, void 0, function () {
        var ratioToApply;
        return __generator(this, function (_a) {
            if (expectedWeight >= image.size) {
                // nothing to do
                return [2 /*return*/, image];
            }
            else {
                ratioToApply = getSizeRatioToApply(image, expectedWeight);
                return [2 /*return*/, resizeSizeWithRatio(image, ratioToApply)];
            }
            return [2 /*return*/];
        });
    });
}
exports.resize = resize;
var contentsAsString = function (file) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            var contents = (_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.result;
            if (typeof contents !== "string") {
                return reject(new Error("couldn't read file contents"));
            }
            return resolve(contents);
        };
        reader.onerror = function (e) { return reject(e); };
        reader.readAsDataURL(file);
    });
};
// Resizing some images won't be 1->1 size efficient.
// reducing an image size by 50% won't halve the file weight.
// We'll adjust the ratios here once we find good ones
var getMimeRatio = function (file) {
    var mimeType = file.name.substring(file.name.lastIndexOf(".") + 1);
    switch (mimeType) {
        // this value is totally made up, we will probably need to dig deeper and adjust.
        case "png":
            return 0.8;
        default:
            return 1;
    }
};
// GetRatioToApply takes an image and the expected max file weight
// and tries to guess which size ratio should be applied
var getSizeRatioToApply = function (image, expectedWeight) {
    var mimeRatio = getMimeRatio(image);
    return (expectedWeight / image.size) * mimeRatio;
};
var blitz = Blitz.create();
// resizeWithRatio applies a ratio to an image,
function resizeSizeWithRatio(image, ratioToApply) {
    return __awaiter(this, void 0, void 0, function () {
        var fileURL;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, contentsAsString(image)];
                case 1:
                    fileURL = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var as_image = new Image();
                            as_image.onload = function () { return __awaiter(_this, void 0, void 0, function () {
                                var resized;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, blitz({
                                                source: image,
                                                width: Math.floor(ratioToApply * as_image.width)
                                            })];
                                        case 1:
                                            resized = _a.sent();
                                            resolve(new File([resized], image.name, { type: resized.type }));
                                            return [2 /*return*/];
                                    }
                                });
                            }); };
                            as_image.onerror = function () {
                                reject(Error("couldn't load image into canvas for resize " + image.name));
                            };
                            as_image.src = fileURL;
                        })];
            }
        });
    });
}
