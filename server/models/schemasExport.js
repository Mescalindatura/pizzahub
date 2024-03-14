const { TABLE_NAMES } = require("../db/tables/table");
const { itemSchema } = require("./itemsModel");
const { orderSchema } = require("./ordersModel");
const { siteConfSchema } = require("./siteConfigModel");


exports.schemas = {
    [TABLE_NAMES.items]: itemSchema,
    [TABLE_NAMES.orders]: orderSchema,
    [TABLE_NAMES.siteconfigurations]: siteConfSchema,
};