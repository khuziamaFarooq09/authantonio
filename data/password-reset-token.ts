import { db } from "@/lib/db"

// These functions are to find token in database using email or token to verify is this token exist or not

export const getPasswordResetTokenByToken = async (token: string) => {
      try {
        const passwordResetToken = await db.passwordRestToken.findUnique({
            where: {token}
        })

        return passwordResetToken
      } catch{
        return null;
      }
}

export const getPasswordResetTokenByEmail = async (email: string) => {
      try {
        const passwordResetToken = await db.passwordRestToken.findFirst({
            where: {email}
        })

        return passwordResetToken
      } catch{
        return null;
      }
}