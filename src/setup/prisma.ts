// import { PrismaClient } from '@prisma/client';
// import { PrismaClient  } from '../prisma/generated/client'; // Untuk DATABASE_URL

import { PrismaClient } from "@prisma/client";


// import dotenv from 'dotenv';

// dotenv.config();

// export const prisma = new PrismaClient();

// export const erklikaPrisma = new PrismaClient({
//     datasources: { db: { url: process.env.DATABASE_URL_ERKLIKA } },
// });

// import { PrismaClient as MainPrismaClient } from '../../generated/client'; // Database utama
// import { PrismaClient as ErklikaPrismaClient } from '../../generated/erklika-client'; // Database USER_DB

export const prisma = new PrismaClient();
// export const erklikaPrisma = new ErklikaPrismaClient();


