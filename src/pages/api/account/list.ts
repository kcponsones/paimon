
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    if(req.method === "GET"){
        try{
            const userList = await prisma.user.findMany({
                select: {
                    id: true,
                    username: true,
                    role: true,
                    avatar: true
                }
            })
            res.status(200).json({ 
                success: true,
                list: userList
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
  