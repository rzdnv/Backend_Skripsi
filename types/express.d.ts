// import { ADMIN_ROLE } from "@prisma/client"

// declare namespace Express {
//     export interface Request {
//         token?: {
//             name: string
//             id: number
//             telephone: string
//             role: ADMIN_ROLE
//         }
//     }
// }

// src/types/express.d.ts
import { ADMIN_ROLE } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      token: {
        name: string;
        id: number;
        telephone: string;
        role: ADMIN_ROLE;
      };
    }
  }
}

export {};
