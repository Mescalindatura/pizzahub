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
exports.deserializeOrders = void 0;
const index_1 = require("../index");
const prismaClient_1 = require("../../prisma/prismaClient");
function deserializeOrderItems(bufferData) {
    const jsonString = bufferData.toString();
    return JSON.parse(jsonString);
}
function deserializeOrders(orders) {
    return orders.map(order => (Object.assign(Object.assign({}, order), { items: deserializeOrderItems(order.items) })));
}
exports.deserializeOrders = deserializeOrders;
index_1.app.post('/orders', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { items, price, minutes } = req.body;
        const newOrder = yield prismaClient_1.prisma.order.create({
            data: {
                items: Buffer.from(JSON.stringify(items)),
                totalPrice: Number(price),
                estimatedTime: Number(minutes),
            },
        });
        res.status(201).json(newOrder);
    }
    catch (error) {
        console.error('Error creating order:', error);
        res.status(400).json({ error: 'Failed to create order' });
    }
}));
index_1.app.get('/orders', (res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield prismaClient_1.prisma.order.findMany();
        res.json(deserializeOrders(orders));
    }
    catch (error) {
        console.error('Error retrieving orders:', error);
        res.status(400).json({ error: 'Failed to retrieve orders' });
    }
}));
index_1.app.get('/orders/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params;
    try {
        const order = yield prismaClient_1.prisma.order.findUnique({
            where: {
                id: Number(id)
            }
        });
        res.json(order);
    }
    catch (error) {
        console.error('Error retrieving order:', error);
        res.status(400).json({ error: `Failed to retrieve order by id: ${id}` });
    }
}));
index_1.app.get('/orders/status/:status', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = req.params;
    try {
        const orders = yield prismaClient_1.prisma.order.findMany({
            where: { status: Number(status) }
        });
        res.json(deserializeOrders(orders));
    }
    catch (error) {
        console.error('Error retrieving order:', error);
        res.status(400).json({ error: `Failed to retrieve orders by status: ${status}` });
    }
}));
index_1.app.get('/orders/created/:from/:to', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { from, to } = req.params;
    try {
        const orders = yield prismaClient_1.prisma.order.findMany({
            where: {
                createdAt: {
                    gte: new Date(from),
                    lte: new Date(to)
                }
            }
        });
        res.json(deserializeOrders(orders));
    }
    catch (error) {
        console.error('Error retrieving orders:', error);
        res.status(400).json({ error: `Failed to retrieve orders by dates of creation` });
    }
}));
index_1.app.get('/orders/updated/:from/:to', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { from, to } = req.params;
    try {
        const orders = yield prismaClient_1.prisma.order.findMany({
            where: {
                updatedAt: {
                    gte: new Date(from),
                    lte: new Date(to)
                }
            }
        });
        res.json(deserializeOrders(orders));
    }
    catch (error) {
        console.error('Error retrieving orders:', error);
        res.status(400).json({ error: `Failed to retrieve orders by dates of last update` });
    }
}));
// app.get('/orders/by_item/:item', async (req: Request, res: Response) => {
//     const itemID = Number(req.params);
//     try {
//         const orders = await prisma.order.findMany({
//             where: {
//                 items: {
//                     some: (byteValue: number)=>{
//                         const buffer = Buffer.from([byteValue]);
//                         const orderItems = deserializeOrderItems(buffer);
//                         return orderItems.some(orderItem => orderItem.itemID === itemID);
//                     }
//                 }
//             }
//         });
//         res.json(deserializeOrders(orders));
//     } catch (error) {
//         console.error('Error retrieving orders:', error);
//         res.status(400).json({error: `Failed to retrieve orders by dates of creation`});
//     }
// });
index_1.app.put('/orders/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params;
    const status = req.body;
    try {
        const updatedItem = yield prismaClient_1.prisma.order.update({
            where: {
                id: Number(id)
            },
            data: {
                status: Number(status)
            }
        });
        res.json(updatedItem);
    }
    catch (error) {
        console.error('Error updating order:', error);
        res.status(400).json({ error: `Failed to update order by id: ${id}` });
    }
}));
index_1.app.delete('/orders/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params;
    try {
        yield prismaClient_1.prisma.order.delete({
            where: {
                id: Number(id)
            },
        });
        res.sendStatus(204);
    }
    catch (error) {
        console.error('Error deleting order:', error);
        res.status(400).json({ error: 'Failed to delete order' });
    }
}));
