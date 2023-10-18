
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/prisma/client'
import { getServerSession } from 'next-auth'
import { authentication } from '@/src/pages/api/auth/[...nextauth]'
import { pusherServer } from '@/libs/providers/pusherServer'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    if(req.method === "POST"){
        const session = await getServerSession(req,res,authentication) 

        if(session){
            try{
                if(req.body.draft_id){
                    const getDraft = await prisma.draft.findFirst({
                        where:{
                            uid: req.body.draft_id
                        },
                        include:{
                            boss: true,
                            player1: {
                                select: {
                                    id: true,
                                    username: true,
                                    avatar: true
                                }
                            },
                            player2: {
                                select: {
                                    id: true,
                                    username: true,
                                    avatar: true
                                }
                            },
                            arena: true,
                            CharacterDraft: {
                                include: {
                                    character: true
                                },
                                orderBy: {
                                    index: 'asc'
                                }
                            }
                        },
                       
                    })
                    res.status(200).json({ 
                        success: true,
                        result: getDraft
                    })
                }
                else{
                    res.status(200).json({ 
                        success: false,
                        result: "No Result"
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
}
  