"use server";
import * as z from 'zod'
import { getUserByEmail } from "@/data/user";
import { ResetSchema } from "@/schemas";
import { generatePasswordResetToken } from '@/lib/token';
import { sendPasswordResetEmail } from '@/lib/mail';



export const reset = async (values: z.infer<typeof ResetSchema>)=> {
   const validateFields = ResetSchema.safeParse(values)

   if(!validateFields.success){
     return {error: "Invalid email!"}
   }

   const {email} = validateFields.data;

   const existingUser = await getUserByEmail(email);

   if(!existingUser){
    return {error: "Email not found!"}
   }

   // TODO : generate token send to user and confirm the email

   const passwordResetToken = await generatePasswordResetToken(email);

   sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
   )

   return {success: "Reset Email sent!"}

}