
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
      
    if(req.method === "POST"){
        try{
            const isExistUser = await prisma.user.count({
                where:{
                    username: req.body.team_name,
                    role: req.body.role,
                }
            })
        
            if(isExistUser === 0){
                const createdDraftAccount = await prisma.user.create({
                    data: {
                        username: req.body.team_name,
                        role: req.body.role,
                        avatar: req.body.avatar
                    }
                })
        
                await prisma.settings.create({
                    data: {
                        user_settings_id: createdDraftAccount?.id,
                        bg_video_mp4: "/video/bg/stars_bg.mp4",
                        bg_video_webm: "/video/bg/stars_bg.webm"
                    }
                })
        
                const newArenaPlayer = await prisma?.arenaPlayer.create({
                    data: {
                        user_id: createdDraftAccount?.id,
                        arena_id: req.body.arenaID,
                        isActive: true
                    }
                })
                res.status(200).json({ 
                    success: true,
                    message:`Successful Create Drafter Account`,
                    result: createdDraftAccount,
                    socket: {
                        user: createdDraftAccount,
                        arenaID: req.body.arenaID, 
                        arenaPlayers: newArenaPlayer 
                    }
                })
               
            }       
            else{
                const isUpdateCharacter = await prisma.user.update({
                    where:{
                        username: req.body.team_name,
                    },
                    data:{
                        avatar: req.body.avatar
                    }
                })
                const findAccount = await prisma.user.findFirst({
                    where: {
                        username: req.body.team_name,
                    } 
                })
    
                const countUserArenaPlayer = await prisma.arenaPlayer.count({
                    where:{
                        user_id: findAccount?.id,
                        arena_id: req.body.arenaID,
                    }
                })
    
    
                if(findAccount){
                    let arenaDetails = null;
                    if(countUserArenaPlayer === 0){
                        arenaDetails = await prisma?.arenaPlayer.create({
                            data: {
                                user_id: findAccount?.id,
                                arena_id: req.body.arenaID,
                                isActive: true
                            }
                        })
                    }
                    else{
                        const findUserArenaPlayer = await prisma.arenaPlayer.findFirst({
                            where:{
                                user_id: findAccount?.id,
                                arena_id: req.body.arenaID,
                            }
                        })
                        arenaDetails = await prisma?.arenaPlayer.update({
                            where: {
                                id: findUserArenaPlayer?.id,
                            },
                            data:{
                                isActive: true,
                                arena_id: req.body.arenaID,
                            }
                        })
                    }

                    res.status(200).json({ 
                        success: true,
                        message:`Successful Update Account`,
                        result: isUpdateCharacter,
                        socket: {
                            user: findAccount,
                            arenaID: req.body.arenaID,
                            arenaPlayers: arenaDetails
                        }
                    })
                }
            } 
        }
        catch(error){
            res.status(200).json({ 
                success: false,
                message:error,
            })
        }
    }
        
}
  