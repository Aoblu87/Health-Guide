import bcryptjs from 'bcryptjs';
import clientPromise from "@/lib/mongoDBAuthProvider";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { NextAuthOptions, User as IUser } from "next-auth";
import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/dbConfig/dbConfig";
import User from "@/models/User";
import type { Adapter } from "next-auth/adapters";

  



interface ICustomDataOfUser extends IUser {
    roles: number[]; // Guest: 2001, Super Admin: 1010, Admin: 1100 Author: 2010
    active: boolean;
    is_admin: boolean;
    provider: string;
}

export const authOptions: NextAuthOptions = {
//Define the providers you want to use
    adapter: MongoDBAdapter(clientPromise) as Adapter,
    secret: process.env.NEXTAUTH_SECRET as string,
    //Define the pages you want to use
    pages: {
        signIn: "/login"
    },
//define the strategy of the authentication on session and its duration
    session: {
        strategy: 'jwt',
        maxAge: 10 * 24 * 60 * 60, //define the max age of the session in days, hours, minutes and seconds
        updateAge: 2 * 24 * 60 * 60 //define the update time of the session in the same ways
    },
    //  debug: process.env.NODE_ENV === "development",

//Define providers you want to use for authentication
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            profile(profile) {
                return {
                    id: profile.id,
                    name: profile.name || "Unknown",
                    email: profile.email || "Unknown",
                    image: profile.avatar_url || "Unknown",
                    uid: profile.id,
                    roles: [2001],
                    active: true,
                    is_admin: false,
                    provider: "github"
                }
            }

        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            //Define the object that will be passed to the OAuth provider
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name || "Unknown",
                    email: profile.email,
                    image: profile.image,
                    uid: profile.sub,
                    roles: [2001],
                    active: true,
                    is_admin: false,
                    provider: "google"
                }
            }

        }),
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                }
            },
            from: process.env.EMAIL_SERVER_FROM,
        }),
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                email: {},
                password: {},
               
            },
      
        
    
            // name: "Credentials",

            // credentials: {
            //     email: {},
            //     password: {},
               
            // },
            // const credentialDetails = {
            //     email: credentials?.email,
            //     password: credentials?.password,
            //   };
      
            //   const resp = await fetch(backendURL + "/auth/login", {
            //     method: "POST",
            //     headers: {
            //       Accept: "application/json",
            //       "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify(credentialDetails),
            //   });
            //   const user = await resp.json();
            //   if (user.is_success) {
            //     console.log("nextauth daki user: " + user.is_success);
      
            //     return user;
            //   } else {
            //     console.log("check your credentials");
            //     return null;
            //   }
            // },
            async authorize(credentials ,req) {
                const formEmail = credentials?.email as string
                const formPassword = credentials?.password as string
               


                await dbConnect();
                let isUserExist = await User.findOne({
                    email: formEmail
                })
                if (!isUserExist) {
                    return null;
                }
      console.log(isUserExist);

                const isValidPassword = await bcryptjs.compare(formPassword, isUserExist?.password)

                if (!isValidPassword) {
                    return null;
                }

                return {
                    id: isUserExist?._id,
                    firstName: isUserExist?.name || "anonymous",
                    email: isUserExist?.email
                };

            }
        })
        
    ],
//Define the callback to signin the user 
    callbacks: {

        async signIn({ account, profile, user, credentials }) {
            await dbConnect();
          
            try {
      
              // check if user already exists
              const userExists = await User.findOne({ email: profile?.email })
      
              // if not, create a new document and save user in MongoDB
              if (!userExists) {
               const newUser= await User.create({
                    googleId: profile?.sub,
            firstName: profile?.name?.replace(/\s/g, "").toLowerCase(),
            lastName: profile?.name?.replace(/\s/g, "").toLowerCase(),
            email: profile?.email,
                })

              }
             
           
              return true
            } catch (error:any) {
              console.log('Error checking if user exists: ', error.message)
              return false
            }
          },
        
      
        


        async jwt({ token, user, account, profile}) {
            if (account) {
                token.accessToken = account?.access_token

            }
            let customData;
            if (user) {


                token.id = user?.id
                const userNewData = user as ICustomDataOfUser;

                if (!userNewData?.provider) {
                    const existUser = await User.findOne({
                        email: user?.email
                    })
                    customData = {
                        id: existUser?.id,
                        name: existUser?.name,
                        email: existUser?.email,
                        image: existUser?.image,
                        roles: existUser?.roles,
                        active: existUser?.active,
                        is_admin: existUser?.is_admin,
                    }

                }
                else {
                    customData = {
                        id: userNewData?.id,
                        name: userNewData?.name,
                        email: userNewData?.email,
                        image: userNewData?.image,
                        roles: userNewData?.roles,
                        active: userNewData?.active,
                        is_admin: userNewData?.is_admin,
                    }
                }

            }
            return ({ ...token, ...customData })
        },
        //USe session to keep track of the user
        async session({ session, token }) {
            session.user = token as any;

            
            return session;
        }
    }

}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }