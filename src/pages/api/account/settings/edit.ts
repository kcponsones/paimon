
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/prisma/client'
import { getServerSession } from 'next-auth'
import { authentication } from '../../auth/[...nextauth]'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    if(req.method === "PUT"){
        const session = await getServerSession(req,res,authentication) 
        try{
            const result = await prisma.settings.update({ 
                where: {
                    user_settings_id: session?.user?.id
                },
                data: {
                    bg_video_mp4: req.body.mp4,
                    bg_video_webm: req.body.webm
                }
            })
            res.status(200).json({ 
                success: true,
                message:`Successful Update Settings`,
                result: result
            })
        }
        catch(error){
            res.status(200).json({ 
                success: false,
                message:error,
            })
        }
    }
        
}
  