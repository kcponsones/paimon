
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    if(req.method === "PUT"){
        try{
            const result = await prisma.boss.update({
                where:{
                    id: req.body.id
                },
                data: {
                    name: req.body.name,
                    picture: req.body.picture,
                    picture_choose:  req.body.picture_choose,
                    picture_flash:  req.body.picture_flash,
                    is_visible:  req.body.is_visible,
                }
            })
    
            res.status(200).json({ 
                success: true,
                message:`Successful Update Boss`,
                result: result
            })
        }
        catch(err){
            res.status(200).json({ 
                success: false,
                message:err,
            })
        }
    }
        
}
  