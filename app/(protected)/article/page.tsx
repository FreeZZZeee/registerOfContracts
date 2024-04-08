import { GeneralTable } from "../_components/table";
import { CreateGuideForm } from "../_components/createForm";
import { getGuideFromAxios } from "@/data/guide";
import { Referece } from "@/interfaces/references.interface";

const ArticlePage = async () => {
    const dbName: string = "article";
    const articles: Referece[] = await getGuideFromAxios(dbName);

    return (
        <div className="bg-secondary rounded-xl w-1/2 flex flex-wrap items-center justify-between mx-auto p-4 shadow-sm">
            <CreateGuideForm
                dbName={dbName}
            />
            <GeneralTable
                caprion="Статья расходов"
                dataDB={articles}
                dbName={dbName}
            />
        </div>
    );
}

export default ArticlePage;