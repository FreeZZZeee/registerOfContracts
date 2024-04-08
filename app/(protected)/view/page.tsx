import { CreateGuideForm } from "../_components/createForm";
import { GeneralTable } from "../_components/table";
import { Referece } from "@/interfaces/references.interface";
import { getGuideFromAxios } from "@/data/guide";
const ViewPage = async () => {
    const dbName: string = "view";
    const placement: Referece[] = await getGuideFromAxios(dbName);

    return (
        <div className="bg-secondary rounded-xl w-1/2 flex flex-wrap items-center justify-between mx-auto p-4 shadow-sm">
            <CreateGuideForm
                dbName={dbName}
            />
            <GeneralTable
                caprion="Вид закупки"
                dataDB={placement}
                dbName={dbName}
            />
        </div>
    );
}

export default ViewPage;