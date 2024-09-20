"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarTemplate = void 0;
var CarTemplate = /** @class */ (function () {
    function CarTemplate(path, brand, model, year, isTraffic) {
        if (isTraffic === void 0) { isTraffic = false; }
        this.path = path;
        this.isTraffic = isTraffic;
        this.totalUi = 0;
        this.name = {
            brand: brand,
            model: model,
            year: year
        };
        this.cars = [];
        this.visualParts = [];
        this.scopesLength = 0;
        this.totalScopes = 0;
        this.purchaseLength = 0;
        this.totalPurchase = 0;
        this.uiLength = 0;
        this.totalUi = 0;
    }
    CarTemplate.prototype.getName = function () {
        return "".concat(this.name.brand, "_").concat(this.name.model, "_").concat(this.name.year);
    };
    return CarTemplate;
}());
exports.CarTemplate = CarTemplate;
