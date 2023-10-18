import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '@/prisma/client'
import { comparePassword } from "@/libs/providers/password";

export const authentication: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            type:"credentials",
            credentials: {},
            async authorize(credentials) {
                const { username, password, avatar, role } = credentials as {
                  username: string;
                  password: string;
                  avatar: string;
                  role: string
                };
                let isErr = false,
                data: any = {};

                const userQueryData = await prisma.user.findFirst({
                    where: {
                        username: username,
                        role: role
                    }
                })
                if(role === "GM"){
                    if(comparePassword(password, userQueryData?.password)){
                        data = {
                            id: userQueryData?.id,
                            name: userQueryData?.username,
                            role: userQueryData?.role,
                            avatar: userQueryData?.avatar,
                        }
                    }
                    else{
                        isErr = true;
                    }
                }
                else{
                    if(userQueryData){
                        data = {
                            id: userQueryData?.id,
                            name: userQueryData?.username,
                            role: userQueryData?.role,
                            avatar: userQueryData?.avatar,
                        }
                    }
                    else{
                        isErr = true;
                    }
                }


                if(!isErr){
                    return data;
                }
                else{
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        jwt: ({ token, user }: any) => {
          // first time jwt callback is run, user object is available
          if (user) {
            token.id = user.id;
            token.name = user.name;
            token.role = user.role;
            token.avatar = user.avatar
          }
          return token
        },
        session: ({ session, token }: any) => {
          if (token) {
            session.user = {}
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.role = token.role
            session.user.avatar = token.avatar
          }
    
          return session;
        },
      },
    secret: process.env.JWT_SECRET,
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    pages: {
        signIn: '/login',
        signOut: '/logout',
        // error: '/auth/error',
        // signOut: '/auth/signout'
    }
}

export default NextAuth(authentication);