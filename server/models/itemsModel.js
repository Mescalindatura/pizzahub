const { getTable, updateTable, generateId } = require("../db/dbUtils");
const { TABLE_NAMES } = require("../db/tables/table");
const { validate } = require("../db/validations");

exports.itemSchema = {
    itemID: {
        required: true,
        validator: (val)=> typeof val === 'number',
    },
    name: {
        required: true,
        validator: (val)=> typeof val === 'string',
    },
    price: {
        required: true,
        validator: (val)=> typeof val === 'number',
    },
};