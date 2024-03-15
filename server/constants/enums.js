"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsValues = exports.PizzaIngridients = exports.OrderStatuses = void 0;
var OrderStatuses;
(function (OrderStatuses) {
    OrderStatuses[OrderStatuses["NEW"] = 0] = "NEW";
    OrderStatuses[OrderStatuses["ON_KITCHEN"] = 1] = "ON_KITCHEN";
    OrderStatuses[OrderStatuses["IN_OVEN"] = 2] = "IN_OVEN";
    OrderStatuses[OrderStatuses["READY"] = 3] = "READY";
    OrderStatuses[OrderStatuses["DELIVERY"] = 4] = "DELIVERY";
    OrderStatuses[OrderStatuses["FINISHED"] = 5] = "FINISHED";
    OrderStatuses[OrderStatuses["RATED"] = 6] = "RATED";
})(OrderStatuses || (exports.OrderStatuses = OrderStatuses = {}));
var PizzaIngridients;
(function (PizzaIngridients) {
    PizzaIngridients[PizzaIngridients["PEPERONI"] = 0] = "PEPERONI";
    PizzaIngridients[PizzaIngridients["CHEDDAR"] = 1] = "CHEDDAR";
    PizzaIngridients[PizzaIngridients["MUSHROOMS"] = 2] = "MUSHROOMS";
    PizzaIngridients[PizzaIngridients["TOMATOES"] = 3] = "TOMATOES";
    PizzaIngridients[PizzaIngridients["OLIVES"] = 4] = "OLIVES";
    PizzaIngridients[PizzaIngridients["SHRIMPS"] = 5] = "SHRIMPS";
    PizzaIngridients[PizzaIngridients["PICOLLIS"] = 6] = "PICOLLIS";
})(PizzaIngridients || (exports.PizzaIngridients = PizzaIngridients = {}));
var SettingsValues;
(function (SettingsValues) {
})(SettingsValues || (exports.SettingsValues = SettingsValues = {}));
