import { AddAPlacement } from "@/components/placement/add-a-placement";
import { TableOfPlacement } from "@/components/placement/table-of-placement";
import { Table, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getPlacements } from "@/data/placement";

const tableRows = [
    { name: "№", className: "w-[50px]" },
    { name: "Наименование", className: "" },
    { name: "", className: "w-[100px]" },
]

const PlacementPage = async () => {
    const placements = await getPlacements();
    
    return (
        <div className="bg-secondary rounded-xl w-1/2 flex flex-wrap items-center justify-between mx-auto p-4 shadow-sm">  
            <AddAPlacement />
            <Table>
                <TableCaption>Способ размещения</TableCaption>
                <TableHeader className="h-[80px]">
                    <TableRow>                        
                        {tableRows.map(tableRow => (
                            <TableHead className={tableRow.className}>
                                {tableRow.name}
                            </TableHead>
                        ))}
                    </TableRow>                    
                </TableHeader>
                <TableOfPlacement 
                    placements={placements}
                        
                />
            </Table>
        </div>
    );
}

export default PlacementPage;