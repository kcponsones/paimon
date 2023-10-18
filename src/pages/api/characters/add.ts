
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/prisma/client'

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '5mb',
        },
    },
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    if(req.method === "POST"){
        const isExistCharacter = await prisma.characters.count({
            where: {name: req.body.name}
        })

        if(isExistCharacter === 0){
            const result = await prisma.characters.create({
                data: {
                    name: req.body.name,
                    display_name: req.body.display_name,
                    rarity: req.body.rarity,
                    vision: req.body.vision,
                    weapon: req.body.weapon,
                    ban_audio: req.body.ban_audio,
                    pick_audio: req.body.pick_audio,
                    draft_picture: req.body.draft_picture,
                    pick_picture: req.body.pick_picture,
                    flash_picture: req.body.flash_picture,
                    ban_picture:  req.body.ban_picture,
                    is_visible: req.body.is_visible,
                    nation: req.body.nation,
                }
            })
            res.status(200).json({ 
                success: true,
                message:`Successful Created a Character`,
                result: result
            })
        }
        else{
            res.status(200).json({ 
                success: false,
                message:"Character Already Exist"
            })
        }
    }   
}
  