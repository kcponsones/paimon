
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/prisma/client'
import { getServerSession } from 'next-auth'
import { authentication } from '@/src/pages/api/auth/[...nextauth]'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    const session = await getServerSession(req,res,authentication) 
    if(req.method === "GET"){
        try{
            if(session){
                const getArena = await prisma.arena.findFirst({
                    where: {
                        host_id: session?.user?.id
                    },
                    orderBy: [
                        {
                            createdAt: 'desc'
                        }
                    ]
                })  
                res.status(200).json({ 
                    success: true,
                    arena: getArena,
                })
            }
            else{
                res.status(401).json({ 
                    success: false,
                })
            }
        }
        catch(err) {
            res.status(200).json({ 
                success: false,
                message: err,
            })
        }
    }   
}
  