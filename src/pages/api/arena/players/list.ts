import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/prisma/client'
import { getServerSession } from 'next-auth'
import { authentication } from '@/src/pages/api/auth/[...nextauth]'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    if(req.method === "POST"){
        const session = await getServerSession(req,res,authentication) 

        if(session){
            try{
                let wherePayload = {
                    arena_id: req.body.arenaID,
                    isActive: true
                }
    
                const getArenaPlayers = await prisma.arenaPlayer.findMany({
                    where: wherePayload,
                    include:{
                        user: true,
                    }
                })  

                const arenaDetails = await prisma.arena.findFirst({
                    where:{
                        uid: req.body.arenaID,
                    }
                })

                res.status(200).json({ 
                    success: true,
                    payload: wherePayload,
                    list: getArenaPlayers,
                    details: arenaDetails
                })
            }
            catch(err) {
                res.status(200).json({ 
                    success: false,
                    message: err,
                })
            }
        }
        
    }   
}
  
