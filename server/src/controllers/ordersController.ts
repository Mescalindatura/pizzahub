import {app} from "../index";
import {prisma} from "../../prisma/prismaClient";
import {Request, Response} from 'express';
import {OrderItem} from "../constants/interfaces";

function deserializeOrderItems(bufferData: Buffer): OrderItem[] {
    const jsonString = bufferData.toString();
    return JSON.parse(jsonString);
}
export function deserializeOrders(orders: any[]): any[] {
    return orders.map(order => ({
        ...order,
        items: deserializeOrderItems(order.items),
    }));
}

app.post('/orders', async (req: Request, res: Response) => {
    try {
        const { items, price, minutes } = req.body;
        const newOrder = await prisma.order.create({
            data: {
                items: Buffer.from(JSON.stringify(items)),
                totalPrice: Number(price),
                estimatedTime: Number(minutes),
            },
        });

        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(400).json({ error: 'Failed to create order' });
    }
});

app.get('/orders', async (res: Response) => {
    try {
        const orders = await prisma.order.findMany();
        res.json(deserializeOrders(orders));
    } catch (error) {
        console.error('Error retrieving orders:', error);
        res.status(400).json({error: 'Failed to retrieve orders'});
    }
});

app.get('/orders/:id', async (req: Request, res: Response) => {
    const id = req.params;
    try {
        const order = await prisma.order.findUnique({
            where: {
                id: Number(id)
            }
        });
        res.json(order);
    } catch (error) {
        console.error('Error retrieving order:', error);
        res.status(400).json({error: `Failed to retrieve order by id: ${id}`});
    }
});

app.get('/orders/status/:status', async (req: Request, res: Response) => {
    const status = req.params;
    try {
        const orders = await prisma.order.findMany({
            where: {status: Number(status)}
        });
        res.json(deserializeOrders(orders));
    } catch (error) {
        console.error('Error retrieving order:', error);
        res.status(400).json({error: `Failed to retrieve orders by status: ${status}`});
    }
});

app.get('/orders/created/:from/:to', async (req: Request, res: Response) => {
    const {from, to} = req.params;
    try {
        const orders = await prisma.order.findMany({
            where: {
                createdAt: {
                    gte: new Date(from),
                    lte: new Date(to)
                }
            }
        });
        res.json(deserializeOrders(orders));
    } catch (error) {
        console.error('Error retrieving orders:', error);
        res.status(400).json({error: `Failed to retrieve orders by dates of creation`});
    }
});

app.get('/orders/updated/:from/:to', async (req: Request, res: Response) => {
    const {from, to} = req.params;
    try {
        const orders = await prisma.order.findMany({
            where: {
                updatedAt: {
                    gte: new Date(from),
                    lte: new Date(to)
                }
            }
        });
        res.json(deserializeOrders(orders));
    } catch (error) {
        console.error('Error retrieving orders:', error);
        res.status(400).json({error: `Failed to retrieve orders by dates of last update`});
    }
});

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

app.put('/orders/:id', async (req: Request, res: Response) => {
    const id = req.params;
    const status = req.body;
    try {
        const updatedItem = await prisma.order.update({
            where: {
                id: Number(id)
            },
            data: {
                status: Number(status)
            }
        });
        res.json(updatedItem);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(400).json({error: `Failed to update order by id: ${id}`});
    }
});

app.delete('/orders/:id', async (req: Request, res: Response) => {
    const id = req.params;
    try {
        await prisma.order.delete({
            where: {
                id: Number(id)
            },
        });
        res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(400).json({error: 'Failed to delete order'});
    }
});