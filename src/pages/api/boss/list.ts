
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    if(req.method === "GET"){
        try{
            const bossList = await prisma.boss.findMany({
                orderBy: [
                    {
                      name: 'asc',
                    }
                ]
            })
            res.status(200).json({ 
                success: true,
                list: bossList
            })
        }
        catch(error){
            res.status(403).json({ 
                success: false,
                error: "Error on fetch users"
            })
        }
    }   
}
  