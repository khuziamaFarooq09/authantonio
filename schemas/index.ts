import { UserRole } from '@prisma/client';
import * as z from 'zod'


export const SettingsSchema = z.object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(8)),
    newPassword: z.optional(z.string().min(8))
})
.refine((data)=> {
    if(data.password && !data.newPassword){
        return false;
    }

    return true;
}, {
    message: "New password is required!"
})
.refine((data)=> {
    if(data.newPassword && !data.password){
        return false
    }

    return  true;
},{
    message: "New password is required!"
})

export const LoginSchema = z.object({
    email : z.string().email({
        message: "Email in required"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    }),
    code: z.optional(z.string()),
});



export const RegisterSchema = z.object({
    name : z.string().min(1, {message: "Username is required"}),
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(8, {message: "password must be of 8 characters"}).max(32, {message: "passwod must be less than 32 characters"})

})


export const ResetSchema = z.object({
        email: z.string().email({
            message: "Email is Required"
        })
})

export const NewPasswordSchema = z.object({
           password: z.string().min(8, {message: "password must be of 8 characters"}).max(32, {message: "passwod must be less than 32 characters"})
})