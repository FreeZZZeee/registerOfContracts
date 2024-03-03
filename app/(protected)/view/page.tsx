import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AddAView } from "@/components/view/add-a-view";
import { TableView } from "@/components/view/table-type";
import { getViews } from "@/data/view";

const tableRows = [
    { name: "№", className: "w-[50px]" },
    { name: "Наименование", className: "" },
    { name: "", className: "w-[100px]" },
]

const ViewPage = async () => {
    const views = await getViews(); 
    let count = 1;
    
    return (
        <div className="bg-secondary rounded-xl w-1/2 flex flex-wrap items-center justify-between mx-auto p-4 shadow-sm">  
            <AddAView />
            <Table>
                <TableCaption>Вид закупки</TableCaption>
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
                {views?.map(view => (
                    <TableView 
                        key={view.id}
                        id={view.id}
                        name={view.name}   
                        count={count++}                        
                    />
                ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default ViewPage;