import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/prisma/client'
import { createError } from 'micro';
import { json, send } from 'micro';


interface RequestBody {
    page: string;
}
  
export const config = {
    api: {
        bodyParser: false, 
    },
};
  
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method === 'POST') {
      try {
        
        const body = (await json(req)) as RequestBody;
  
        let charactersQuery = null;
        if (body.page === 'Settings') {
          charactersQuery = await prisma.characters.findMany({
            orderBy: [
              {
                name: 'asc',
              },
            ],
          });
        } else {
          charactersQuery = await prisma.characters.findMany({
            where: {
              is_visible: true,
            },
            orderBy: [
              {
                name: 'asc',
              },
            ],
          });
        }
  
        send(res, 200, {
          success: true,
          list: charactersQuery,
        });
      } catch (error: unknown) {
        throw createError(403, 'Error on fetching characters',  error as Error);
      }
    }
  }