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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const index_1 = require("../index");
const prisma = new client_1.PrismaClient();
index_1.app.get('/items', (res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield prisma.item.findMany();
        res.json(items);
    }
    catch (error) {
        console.error('Error retrieving items:', error);
        res.status(400).json({ error: 'Failed to retrieve items' });
    }
}));
index_1.app.get('/items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const items = yield prisma.item.findUnique({
            where: { id }
        });
        res.json(items);
    }
    catch (error) {
        console.error('Error retrieving item:', error);
        res.status(400).json({ error: `Failed to retrieve item by id: ${id}` });
    }
}));
index_1.app.put('/items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params;
    const { contains, price } = req.body;
    try {
        const updatedItem = yield prisma.item.update({
            where: {
                id: Number(id)
            },
            data: {
                contains: contains,
                price: Number(price)
            }
        });
        res.json(updatedItem);
    }
    catch (error) {
        console.error('Error updating item:', error);
        res.status(400).json({ error: `Failed to update item by id: ${id}` });
    }
}));
index_1.app.delete('/items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        yield prisma.item.delete({
            where: { id },
        });
        res.sendStatus(204);
    }
    catch (error) {
        console.error('Error deleting item:', error);
        res.status(400).json({ error: 'Failed to delete item' });
    }
}));
