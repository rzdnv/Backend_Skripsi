import { PrismaClient } from '@prisma/client'
import { logger } from './logging'

export const prismaClient = new PrismaClient({
    log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
        { emit: 'event', level: 'error' }
    ]
})

prismaClient.$on('error', (e: unknown) => {
    logger.error(e)
})

prismaClient.$on('warn', (e: unknown) => {
    logger.error(e)
})

prismaClient.$on('info', (e: unknown) => {
    logger.error(e)
})

prismaClient.$on('query', (e: unknown) => {
    logger.error(e)
})