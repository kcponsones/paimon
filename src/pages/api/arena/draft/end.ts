
import type { NextApiRequest, NextApiResponse } from 'next'
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
                pusherServer.trigger('arena-room', 'back-arena', { draftID: req.body.draft_id, arenaID: req.body.arena_id })
                res.status(200).json({ 
                    success: true,
                    data: {
                        draftID: req.body.draft_id, 
                        arenaID: req.body.arena_id
                    }
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
  