import { currentUser } from "@/lib/auth";
import { AddAContract } from "../_components/addAContract";
import { getContractsFromAxios } from "@/data/contract";

const DivisionPage = async () => {
    const user = await currentUser();

    const data = await getContractsFromAxios(user?.id as string);

    return (
        <div className="bg-secondary rounded-xl w-3/6 flex flex-wrap items-center justify-between mx-auto mb-10 p-4 shadow-sm">
            <AddAContract
                placements={data?.placements as []}
                types={data?.types as []}
                federals={data?.federals as []}
                views={data?.views as []}
                articles={data?.articles as []}
                divisions={data?.divisions as []}
                providers={data?.providers as []}
            />
        </div>
    );
}

export default DivisionPage;