"use server";

import * as z from 'zod'
import { SettingsSchema } from "@/schemas";
import { getUserByEmail, getUserById } from '@/data/user';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { generateVerificationToken } from '@/lib/token';
import { sendVerificationEmail } from '@/lib/mail';
import bcrypt from 'bcryptjs';


export const Settings = async (values: z.infer<typeof SettingsSchema>) =>{
    const session = await auth();

    const user = session?.user


    if(!user){
        return {error : "Unauthorized!"}
    }

    const dbUser = await getUserById(user.id as string);

    if(!dbUser){
        return {error: "Unauthorized"}
    }

   if(user.isOAuth){
    values.email = undefined
    values.password = undefined
    values.newPassword = undefined
    values.isTwoFactorEnabled = undefined
   }

   if(values.email && values.email !== user.email){
    const existingUser = await getUserByEmail(values.email);

    if(existingUser && existingUser.id !== user.id){
        return {error : "Email is already in use"}
    }

    const verificationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
    )

    return {success: "Verification email sent!"}
   }

   if(values.password && values.newPassword && dbUser.password){
       const isPasswordMatch = await bcrypt.compare(
        values.password,
        values.newPassword
       )

       if(!isPasswordMatch){
        return {error: "Incorrect Password"}
       }

       const hashedPassword = await bcrypt.hash(values.password, 10);

       values.password = hashedPassword;
       values.newPassword = undefined;
   }

    await db.user.update({
        where: {id: dbUser.id},
        data: {
            ...values
        }
    });


    return {success: "Settings Updated!"}
}