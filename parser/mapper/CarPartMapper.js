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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarPartMapper = void 0;
var Log_js_1 = require("../util/Log.js");
var fs = require("fs");
var xml2js = require("xml2js");
var util = require("util");
var CarPartMapper = /** @class */ (function () {
    function CarPartMapper() {
    }
    CarPartMapper.map = function (context) {
        return __awaiter(this, void 0, void 0, function () {
            var _loop_1, _i, _a, carTemplate, _loop_2, _b, _c, carTemplate;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        Log_js_1.log.info("CarPartMapper :: Mapping in-scope car parts");
                        _loop_1 = function (carTemplate) {
                            var _loop_3, _e, _f, car;
                            return __generator(this, function (_g) {
                                switch (_g.label) {
                                    case 0:
                                        _loop_3 = function (car) {
                                            var data, xmlObj, sortedScope;
                                            return __generator(this, function (_h) {
                                                switch (_h.label) {
                                                    case 0:
                                                        data = "";
                                                        try {
                                                            data = fs.readFileSync(car.path, "UTF-8");
                                                        }
                                                        catch (err) {
                                                            Log_js_1.log.warn("CarPartMapper :: Failed to read ".concat(car.path, " : ").concat(err));
                                                            return [2 /*return*/, "continue"];
                                                        }
                                                        Log_js_1.log.dbug("CarPartMapper :: Parsing XML");
                                                        return [4 /*yield*/, xml2js.parseStringPromise(data)];
                                                    case 1:
                                                        xmlObj = _h.sent();
                                                        sortedScope = xmlObj.RaceVehicleItemData.SortedScope[0].member.map(function (it) {
                                                            return Number(it.ItemDataId[0].Id[0]);
                                                        });
                                                        // Actually do the mapping
                                                        car.partScope = context.carVisualParts.filter(function (it) {
                                                            return sortedScope.includes(it.id);
                                                        });
                                                        car.partScope.forEach(function (it) {
                                                            if (!carTemplate.visualParts.includes(it)) {
                                                                carTemplate.visualParts.push(it);
                                                            }
                                                            if (!it.scopes.includes(car)) {
                                                                it.scopes.push(car);
                                                            }
                                                            it.totalScopes = carTemplate.cars.length;
                                                        });
                                                        return [2 /*return*/];
                                                }
                                            });
                                        };
                                        _e = 0, _f = carTemplate.cars;
                                        _g.label = 1;
                                    case 1:
                                        if (!(_e < _f.length)) return [3 /*break*/, 4];
                                        car = _f[_e];
                                        return [5 /*yield**/, _loop_3(car)];
                                    case 2:
                                        _g.sent();
                                        _g.label = 3;
                                    case 3:
                                        _e++;
                                        return [3 /*break*/, 1];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        };
                        _i = 0, _a = context.carTemplates;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        carTemplate = _a[_i];
                        return [5 /*yield**/, _loop_1(carTemplate)];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        Log_js_1.log.info("CarPartMapper :: Mapping out-of-scope car parts");
                        _loop_2 = function (carTemplate) {
                            context.carVisualParts.filter(function (it) {
                                return !carTemplate.visualParts.includes(it);
                            }).forEach(function (it) {
                                if (it.path.toLowerCase().includes(carTemplate.path.toLowerCase())) {
                                    carTemplate.visualParts.push(it);
                                }
                                // Special cases
                                // Ugh
                                // Criterion why
                                else if (it.path.includes("polerstar_1_2020") && carTemplate.path.includes("polestar_1_2020")) {
                                    Log_js_1.log.info("CarPartMapper :: Handling Polestar/Polerstar typo for part ".concat(it.id));
                                    carTemplate.visualParts.push(it);
                                }
                                else if (it.path.includes("nissan_gtrnismo_2017") && carTemplate.path.includes("nissan_gtr_2017")) {
                                    Log_js_1.log.info("CarPartMapper :: Handling GT-R Nismo part separation for part ".concat(it.id));
                                    carTemplate.visualParts.push(it);
                                }
                            });
                        };
                        // Map based on parent directory
                        for (_b = 0, _c = context.carTemplates; _b < _c.length; _b++) {
                            carTemplate = _c[_b];
                            _loop_2(carTemplate);
                        }
                        return [2 /*return*/, context];
                }
            });
        });
    };
    return CarPartMapper;
}());
exports.CarPartMapper = CarPartMapper;
