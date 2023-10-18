
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
                switch(req.body.type){
                    case "character_draft": {
                        const findCharacterDraft = await prisma.characterDraft.findFirst({
                            where: {
                                draftID: req.body.draft_id,
                                index: req.body.sequence.index
                            }
                        })

                        const findCurrentDraft = await prisma.draft.findFirst({
                            where: {uid: req.body.draft_id}
                        })
                        
                        if(findCharacterDraft && findCurrentDraft){
                           
                            if(req.body.characterID !== ""){
                                await prisma.characterDraft.update({
                                    where: {
                                        uid: findCharacterDraft.uid
                                    },
                                    data:{
                                        characterID: req.body.characterID
                                    }
                                })
                            }
                           
                            await prisma.draft.update({
                                where: {uid: req.body.draft_id},
                                data: {current_status_draft: req.body.sequence.index}
                            })

                           
                        }
                        res.status(200).json({ 
                            success: true
                        })        
                        break;
                    }
                    case "boss_init": {
                        const bossList = await prisma.boss.findMany({
                            orderBy: [
                                {
                                  name: 'asc',
                                }
                            ]
                        });
                        let bossIndex = Math.floor(Math.random() * (bossList.length - 0 + 1)) + 0;
                        await prisma.draft.update({
                            where: {
                                uid: req.body.draft_id
                            },
                            data:{
                                current_status_draft: 'init',
                                bossID: bossList[bossIndex].id
                            }
                        })
                    
                        res.status(200).json({ 
                            success: true,
                            socket: {
                                draft_id: req.body.draft_id,
                                boss: bossList[bossIndex],
                                isReroll: req.body.isReroll,
                                function: req.body.function
                            }
                        })
                      
                        break;
                    }
                    case "reroll_decisions": {
                        let payload = {};
                        if(req.body.playerPosition === "player1"){
                            payload = {player1_reroll: req.body.playerReroll}
                        }
                        else{
                            payload = {player2_reroll: req.body.playerReroll}
                        }
                        await prisma.draft.update({
                            where: {
                                uid: req.body.draft_id
                            },
                            data: payload
                        })

                        res.status(200).json({ 
                            success: true
                        })
                        break;
                    }
                    case "winner_update": {
                        await prisma.draft.update({
                            where: {
                                uid: req.body.draft_id
                            },
                            data: {
                                winner_user_id: req.body.user_id,
                                isFinish: true
                            }
                        })

                        res.status(200).json({ 
                            success: true
                        })
                        break;
                    }
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
  