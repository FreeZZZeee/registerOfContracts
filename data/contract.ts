import { db } from "@/lib/db";
import axios from "axios";
import { getUserById } from "./user";

export const getContractById = async (id: string) => {
    try {
        const contract = await db.contract.findUnique({
            where: { id }
        });

        return contract;
    } catch {
        return null;
    }
}

export const getContracts = async () => {
    try {
        const contract = await db.contract.findMany();

        return contract;
    } catch {
        return null;
    }
}

export const getContractsFromAxios = async (id: string) => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/contract?user=${id}`);

        return res?.data;
    } catch {
        return null;
    }
}

export const getContractFromAxios = async (id: string) => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/contract/${id}`);

        return res?.data;
    } catch {
        return null;
    }
}