import { CreateGuideForm } from "../_components/createForm";
import { GeneralTable } from "../_components/table";
import axios from "axios";

const DivisionPage = async () => {
    const dbName: string = "division";
    const { data: divisions } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${dbName}`);

    return (
        <div className="bg-secondary rounded-xl w-1/2 flex flex-wrap items-center justify-between mx-auto p-4 shadow-sm">
            <CreateGuideForm
                dbName={dbName}
            />
            <GeneralTable
                caprion="Подразделение"
                dataDB={divisions}
                dbName={dbName}
            />
        </div>
    );
}

export default DivisionPage;