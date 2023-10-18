
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    if(req.method === "POST"){
        try{
            const userData = await prisma.user.findFirst({
                where:{
                    username: req.body.gm_name,
                    role: "GM"
                }
            })

            if(userData){
                const createArena = await prisma.arena.create({
                    data:{
                        host_id: userData?.id,
                        type: req.body.game_type
                    }
                }) 
    
                res.status(200).json({ 
                    success: true,
                    arena: createArena,
                    user: {
                        id: userData?.id,
                        name: userData?.username,
                        role: userData?.role,
                        avatar: userData?.avatar
                    }
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
  