
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/prisma/client'
import { hashPassword } from '@/libs/providers/password'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    if(req.method === "PUT"){
        try{
            let payload = {}
            if(req.body.role === 'Drafter'){
                payload = {
                    username: req.body.username,
                    role: req.body.role,
                    avatar: req.body.avatar
                }
            }
            else{
                payload = {
                    username: req.body.username,
                    role: req.body.role,
                    avatar: req.body.avatar,
                    password: hashPassword(req.body.password)
                }
            }
            const result = await prisma.user.update({
                where:{
                    id: req.body.id
                },
                data: payload
            })

            res.status(200).json({ 
                success: true,
                message:`Successful Update Account`,
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
  