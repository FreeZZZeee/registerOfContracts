import { AddAPlacement } from "@/components/placement/add-a-placement";
import { TablePlacement } from "@/components/placement/table-placement";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getPlacements } from "@/data/placement";

const tableRows = [
    { name: "№", className: "w-[50px]" },
    { name: "Наименование", className: "" },
    { name: "", className: "w-[100px]" },
]

const PlacementPage = async () => {
    const placements = await getPlacements(); 
    let count = 1;
    
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
                <TableBody>
                {placements?.map(placement => (
                    <TablePlacement 
                        key={placement.id}
                        id={placement.id}
                        name={placement.name}   
                        count={count++}                        
                    />
                ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default PlacementPage;