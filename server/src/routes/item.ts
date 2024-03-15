import express, {Request, Response} from "express";
import {prisma} from "../../prisma/prismaClient";
import {body} from "express-validator";

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const item = await prisma.item.create({
            data: {
                name: req.body.name,
                description: req.body.description,
                price: parseFloat(req.body.price)
            }
        });
    }
});
router.get('/',async ( req, res)=>{
    try {
        const items = await prisma.item.findMany();
        res.json(items);
    } catch (error) {
        console.error('Error retrieving items:', error);
        res.status(400).json({error: 'Failed to retrieve items'});
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const item = await prisma.item.findUnique({ where: { id } });
        if (!item) {
            return res.status(404).json({ error: `Item with ID ${id} not found` });
        }
        res.json(item);
    } catch (error) {
        console.error('Error retrieving item:', error);
        res.status(400).json({ error: `Failed to retrieve item by id: ${id}` });
    }}
);

router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const updatedItem = await prisma.item.update({
            where: {
                id: id
            },
            data: {
                description: req.body.description,
                price: Number(req.body.price)
            }
        });
        res.json(updatedItem);
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(400).json({error: `Failed to update item by id: ${id}`});
    }
});
router.delete('/:id', async (req: Request, res: Response) => {
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

export default router;