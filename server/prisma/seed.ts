import { Prisma } from "@prisma/client";
import {prisma} from "../prisma/prismaClient";

const itemData: Prisma.ItemCreateInput[] = [
    {
        name: "peperoni",
        contains: "peperoni, tomato souce, cheese",
        price: 45
    },
    {
        name: "margarita",
        contains: "tomato souce, cheese",
        price: 42
    },
    {
        name: "four cheeses",
        contains: "cheddar, gorgonzola, cheese, cheese",
        price: 48
    },
]

async function main() {
    console.log(`Start seeding ...`)
    for (const i of itemData) {
        const item = await prisma.item.create({
            data: i,
        })
        console.log(`Created item with id: ${item.id}`)
    }
    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })