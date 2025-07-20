
"use server";
import { signIn } from '@/auth';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/db';
import { sendTwoFactorTokenEmail, sendVerificationEmail } from '@/lib/mail';
import { generateTwoFactorToken, generateVerificationToken } from '@/lib/token';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import * as z from 'zod'



export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string | null)  => {
        const validatedFields  = LoginSchema.safeParse(values);

        if(!validatedFields.success){   
            return {error: "Invalid Fields"}
        }

        const {email, password, code} = validatedFields.data;

        // Verification Token process start here
         
        const existingUser = await getUserByEmail(email);

        if(!existingUser || !existingUser.email || !existingUser.password){
            return { error: "Email does not exist"}
        }


        if(!existingUser.emailVerified){
           const verificationToken =  await generateVerificationToken(existingUser.email)

           await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
           )

      
            return {success: "Confirmation email sent!"}
        }

        // 2FA start from here 

        if(existingUser.twoFactorEnabled && existingUser.email){
            if(code){
                const twoFactorToken = await getTwoFactorTokenByEmail(
                    existingUser.email
                );

              if(!twoFactorToken){
                return {error: "Invalid code!"}
              }

              if(twoFactorToken.token !== code){
                return {error: "Invalid code!"}
              }

              const hasExpired = new Date(twoFactorToken.expires) < new Date();


             if(hasExpired){
                return {error: "Code expired!"}
             }

             await db.twoFactorToken.delete({
                where: {id: twoFactorToken.id}
             });

             const existingConfrimation = await getTwoFactorConfirmationByUserId(existingUser.id)

             if(existingConfrimation){
                await db.twoFactorConfirmation.delete({
                    where: {id: existingConfrimation.id}
                })
             }

             await db.twoFactorConfirmation.create({
                data:{
                    userId: existingUser.id,
                }
             })

            }else{
                const twoFactorToken =await generateTwoFactorToken(existingUser.email)
    
                await sendTwoFactorTokenEmail(
                    twoFactorToken.email,
                    twoFactorToken.token
                )
    
                return {twoFactor : true}
            }
        }

        try {
            await signIn("credentials", 
                {email,
                     password, 
                    redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT})
            
            // i have told to that to redirect to DEFAULT_LOGIN_REDIRECT (eg. protected)

        } catch (error) {
            if(error instanceof AuthError){
                switch(error.type){
                    case 'CredentialsSignin':
                        return {error: "Invalid credentials"}

                        default :
                        return {error: "Something went wrong"}
                }
            }    

            throw error;     // Must throw this error otherwise they will not redirect you
        }
}