import { CreateGuideForm } from "../_components/createForm";
import { GeneralTable } from "../_components/table";
import { Referece } from "@/interfaces/references.interface";
import { getGuideFromAxios } from "@/data/guide";

const FederalPage = async () => {
    const dbName: string = "federal";
    const federal: Referece[] = await getGuideFromAxios(dbName);

    return (
        <div className="bg-secondary rounded-xl w-1/2 flex flex-wrap items-center justify-between mx-auto p-4 shadow-sm">
            <CreateGuideForm
                dbName={dbName}
            />
            <GeneralTable
                caprion="Федеральный закон"
                dataDB={federal}
                dbName={dbName}
            />
        </div>
    );
}

export default FederalPage;