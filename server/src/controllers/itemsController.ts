import {PrismaClient} from "@prisma/client";
import {app} from "../index";
import {Request, Response} from 'express';

const prisma = new PrismaClient();

app.get('/items', async (req: Request, res: Response) => {
    try {
        const items = await prisma.item.findMany();
        res.json(items);
    } catch (error) {
        console.error('Error retrieving items:', error);
        res.status(400).json({error: 'Failed to retrieve items'});
    }
});

app.get('/items/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const items = await prisma.item.findUnique({
            where: {id}
        });
        res.json(items);
    } catch (error) {
        console.error('Error retrieving item:', error);
        res.status(400).json({error: `Failed to retrieve item by id: ${id}`});
    }
});

app.put('/items/:id', async (req: Request, res: Response) => {
    const id = req.params;
    const {contains, price} = req.body;
    try {
        const updatedItem = await prisma.item.update({
            where: {
                id: Number(id)
            },
            data: {
                contains: contains,
                price: Number(price)}
        });
        res.json(updatedItem);
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(400).json({error: `Failed to update item by id: ${id}`});
    }
});

app.delete('/items/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.item.delete({
            where: { id },
        });
        res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(400).json({ error: 'Failed to delete item' });
    }
});