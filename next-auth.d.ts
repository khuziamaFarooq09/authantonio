import { UserRole } from "@prisma/client";

import NextAuth, { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole;
    twoFactorEnabled : boolean;
    isOAuth: boolean;
    email : string;
}


declare module "next-auth" {
    interface Session{
        user: ExtendedUser
    }
}