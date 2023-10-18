
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
                const getSettings = await prisma.settings.findUnique({
                    where: {
                        user_settings_id: session?.user?.id
                    },
                    select: {
                        bg_video_mp4: true,
                        bg_video_webm: true
                    },
                })  

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
                    settings: {
                        mp4: getSettings?.bg_video_mp4,
                        webm: getSettings?.bg_video_webm
                    },
                    user: {
                        id: session?.user?.id,
                        name: session?.user?.name,
                        role: session?.user?.role,
                        avatar: session?.user?.avatar
                    },
                    arena:{
                        id: getArena?.uid
                    }
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
  