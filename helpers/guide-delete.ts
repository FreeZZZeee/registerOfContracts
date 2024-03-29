import { getArticleById } from "@/data/article";
import axios from "axios";

export const guideDelete = async (dbName: string, id: string) => {

    if (dbName === "article") {
        const dbArticle = await getArticleById(id);

        if (!dbArticle) {
            return { error: "Статья расходов не существует!" }
        }

        const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/guides/${id}`)

        if (res?.statusText === 'OK') {
            return { success: res.data?.message }
        }

        return { error: res.data?.message };

    }

    return { error: "Что-то пошло не так!" };
}