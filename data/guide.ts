import axios from "axios";

export const getGuideFromAxios = async (dbName: string) => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${dbName}`);
        return res.data;
    } catch {
        return null;
    }

}