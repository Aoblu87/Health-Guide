import dbConnect from "@/dbConfig/dbConfig";
import clientPromise from "@/lib/mongoDBAuthProvider";
import User from "@/models/User";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { NextAuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

export const authOptions: NextAuthOptions = {
  //Define the providers you want to use
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  secret: process.env.NEXTAUTH_SECRET as string,
  //Define the pages you want to use
  pages: {
    signIn: "/login",
  },
  //define the strategy of the authentication on session and its duration
  session: {
    strategy: "jwt",
    maxAge: 10 * 24 * 60 * 60, //define the max age of the session in days, hours, minutes and seconds
    updateAge: 2 * 24 * 60 * 60, //define the update time of the session in the same ways
  },
  //  debug: process.env.NODE_ENV === "development",

  //Define providers you want to use for authentication
  providers: [
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
          provider: "google",
        };
      },
    }),
  ],
  //Define the callback to signin the user
  callbacks: {
    async signIn({ account, profile, user, credentials }) {
      await dbConnect();

      try {
        // check if user already exists
        const user = await User.findOne({ email: profile?.email });

        // if not, create a new document and save user in MongoDB
        if (!user) {
          const newUser = await User.create({
            googleId: profile?.sub,
            firstName: profile?.name?.replace(/\s/g, "").toLowerCase(),
            lastName: profile?.name?.replace(/\s/g, "").toLowerCase(),

            email: profile?.email,
            photo: profile?.image,
          });
          return newUser;
        }
        if (typeof window !== "undefined" && window.localStorage) {
          localStorage.setItem("userId", user.id);}
     
        cookies().set({
          name: "userId",
          value: user._id,
          httpOnly: true,
          // maxAge: 48 * 60 * 60,
        });

        return user;
      } catch (error: any) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
    
    //USe session to keep track of the user
    async session({ session, token }) {
      session.user = token as any;


      return session;
    },
  },
};
