"use server";
import * as z from 'zod'
import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByToken } from '@/data/password-reset-token';
import { getUserByEmail } from '@/data/user';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';



export const newPassword = async (values: z.infer<typeof NewPasswordSchema> , token? : string | null) => {
    const validatedFields = NewPasswordSchema.safeParse(values);


    if(!token) {
        return {error: "Missing token!"}
    }
    
    if(!validatedFields.success){
        return {error: "Invalid fields"}
    }
    

    const {password} =  validatedFields.data;


    const existingToken = await getPasswordResetTokenByToken(token)

    if(!existingToken) {
        return {error: "Token doesn't exist"}
    }
    
  
    const hasExpired = new Date(existingToken.expires) < new Date();

    if(hasExpired) {
        return {error: "Token has expired!"}
    }
     
    const existingUser = await getUserByEmail(existingToken.email)

    if(!existingUser) {
        return {error: "User doesn't exist!"}
    }

    const hashedPassword= await bcrypt.hash(password, 10);

    await db.user.update({
        where: {id: existingUser.id},
        data: {password: hashedPassword}
    })

    await db.passwordRestToken.delete({
        where: {id: existingToken.id}
    })

    return {success: "Passwrod updated"}

}