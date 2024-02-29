import { AddAContract } from "@/components/add-a-contract";
import { SheetSearch } from "@/components/sheet-search";
import { TableOfContracts } from "@/components/table-of-contracts"
import { Button } from "@/components/ui/button";

const RegestryPage = () => {
    return (
        <div className="bg-secondary rounded-xl w-5/6 flex flex-wrap items-center justify-between mx-auto p-4 shadow-sm">            
            <SheetSearch />
            <div className="flex flex-row gap-x-2">
                <AddAContract />
                <Button  variant="outline">Редактировать</Button>
            </div>
            <TableOfContracts />
        </div>
    );
}

export default RegestryPage;