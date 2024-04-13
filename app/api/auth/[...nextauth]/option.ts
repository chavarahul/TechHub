import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { NextResponse } from "next/server";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from 'bcrypt'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
export const options: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: {
                    label: "email",
                    type: "text"
                },
                password: {
                    label: "password",
                    type: "password",
                }

            },
            async authorize(credentials: { email: string; password: string }) {
                console.log('dd')
                if (!(credentials?.email) || !(credentials?.password)) {
                    return null
                }
                console.log(credentials?.email)
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                console.log(user)
                if (!user) {
                    return null
                }
                const check = await bcrypt.compare(credentials.password, user.password);
                console.log(check)
                if (!check) {
                    return null;
                }
                console.log("jj");
                return {
                    email: user.email
                }
            },
        })
    ],
    callbacks: {
        async jwt({ token,user }) {
            if(user){
            return {
                ...token,email:user.email
            }
        }
        console.log(token)
        return token
        },
        async session({ session,user, token }) {
            return {
                ...session , user:{
                    ...session.user,email:token.email
                }
            
            }
        }
    
    },
    pages: {
        signIn: '/Login',
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
}