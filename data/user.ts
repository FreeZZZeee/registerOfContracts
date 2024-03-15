import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({ where: { email } });

        return user;
    } catch {
        return null;
    }
};

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({ where: { id } });

        return user;
    } catch {
        return null;
    }
};

export const getUserByLogin = async (login: string) => {
    try {
        const user = await db.user.findUnique({ where: { login } });

        return user;
    } catch {
        return null;
    }
};

export const getUserByName = async (name: string) => {
    try {
        const user = await db.user.findFirst({ where: { name } });

        return user;
    } catch {
        return null;
    }
};

export const getUsers = async () => {
    try {
        const users = await db.user.findMany();

        return users;
    } catch {
        return null;
    }
}