import NextAuth, { type DefaultSession } from "next-auth"
import { JWT } from "@auth/core/jwt"
import { UserRole } from "@prisma/client";

export type ExtendedUser = DefaultSession["user"] & {
    login: string | null;
    isTwoFactorEnabled: boolean;
    role: UserRole;
    isOAuth: boolean;
    session_expiry?: string;
};

declare module "next-auth" {
    interface Session {
      user: ExtendedUser
    }
  }

  declare module "@auth/core/jwt" {
    interface JWT {
        login: string | null,
        isTwoFactorEnabled: boolean,
        role?: UserRole,
        isOAuth: boolean,
    }
  }