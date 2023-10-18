
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
                const getDraft = await prisma.draft.findFirst({
                    where:{
                        uid: req.body.draft_id
                    },
                    include:{
                        CharacterDraft: {
                            include: {
                                character: true
                            },
                            orderBy: {
                                index: 'asc'
                            }
                        },
                        arena: {
                            select:{
                                mode: true
                            }
                        }
                    },
                   
                })
                res.status(200).json({ 
                    success: true,
                    result: getDraft?.CharacterDraft,
                    mode:  getDraft?.arena?.mode
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
  