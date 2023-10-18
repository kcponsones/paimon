
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    if(req.method === "POST"){
        try{
            const isExistBoss = await prisma.boss.count({
                where: {name: req.body.name}
            })

            if(isExistBoss === 0){
                const result = await prisma.boss.create({
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
                    message:`Successful Created a Boss`,
                    arena: result
                })
            }
            else{
                res.status(200).json({ 
                    success: false,
                    message:`Boss Already Exists`,
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
  