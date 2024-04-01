import axios from "axios";
import { CreateGuideForm } from "../_components/createForm";
import { GeneralTable } from "../_components/table";

const TypePage = async () => {
    const dbName: string = "type";
    const { data: placement } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${dbName}`);

    return (
        <div className="bg-secondary rounded-xl w-1/2 flex flex-wrap items-center justify-between mx-auto p-4 shadow-sm">
            <CreateGuideForm
                dbName={dbName}
            />
            <GeneralTable
                caprion="Тип ЕП"
                dataDB={placement}
                dbName={dbName}
            />
        </div>
    );
}

export default TypePage;