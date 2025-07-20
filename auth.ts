import NextAuth from "next-auth"
import authConfig from "./auth.config"
 
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import { getUserById } from "./data/user"
import { UserRole } from "@prisma/client"
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"
import { getAccountByUserId } from "./data/account"
 
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
      signIn: "/auth/login",
      error: "/auth/error"

  },
  events: ({
    async linkAccount({user}){
      await db.user.update({
        where : {id: user.id},
        data: {emailVerified: new Date()}
      })
    }
  }),
  callbacks: {
    async signIn({user, account}){
      // Allow OAuth with email verification

      if(account?.provider !== "credentials") return true;

      //prevent sigin without email verification

      const existingUser = await getUserById(user.id as string);

      if(!existingUser?.emailVerified) return false;
      
      //TODO : Add 2FA check

      if(existingUser.twoFactorEnabled){
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)


        if(!twoFactorConfirmation) return false;

        // Delete the two factor confirmation for next sign

        await db.twoFactorConfirmation.delete({
          where: {id: twoFactorConfirmation.id}
        });

        
      }

     

      return true;
    },
    async session({session, token}){
      if(token.sub && session.user){
        session.user.id = token.sub;
      }

      if(token.role && session.user){
        session.user.role = token.role as UserRole;
      }

      if(session.user){
        session.user.twoFactorEnabled =  token.twoFactorEnabled as boolean;
      }

      if(session.user){
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }

     
      return session;
    },

    async jwt({token}){
      if(!token.sub) return null;

      const existingUser = await getUserById(token.sub);

      if(!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;

      token.name = existingUser.name;

      token.email = existingUser.email;

      token.role = existingUser.role;

      token.twoFactorEnabled = existingUser.twoFactorEnabled
    
        return token;
    }
  },
  // here just will have adapter beacuse prisma adapter doesn't work on egde runtime that's why 
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})