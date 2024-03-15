import express, {Request, Response} from "express";
import itemRouter from "../src/routes/item"
import orderRouter from "../src/routes/order"
import {prisma} from "../prisma/prismaClient";

export const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/items', itemRouter);
app.use('/orders', orderRouter);


// todo: add app.use logics
    app.listen(PORT, async () => {
        console.log(`Server is listening at http://localhost:${PORT}`);
        // await runDbTests();
    });