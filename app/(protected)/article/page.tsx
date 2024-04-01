import { GeneralTable } from "../_components/table";
import { CreateGuideForm } from "../_components/createForm";
import axios from "axios";

const ArticlePage = async () => {
    const dbName: string = "article";
    const { data: articles } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${dbName}`);

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