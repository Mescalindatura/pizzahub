import {Prisma, PrismaClient} from '@prisma/client'

export const prisma = new PrismaClient({
    errorFormat: 'pretty',
    log: [
        {level: 'warn', emit: 'event'},
        {level: 'info', emit: 'event'},
        {level: 'query', emit: 'event'}
    ]
});


