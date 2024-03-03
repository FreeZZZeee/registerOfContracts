import { AddADivision } from "@/components/division/add-a-division";
import { TableDivision } from "@/components/division/table-type";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AddAView } from "@/components/view/add-a-view";
import { getDivisions } from "@/data/division";

const tableRows = [
    { name: "№", className: "w-[50px]" },
    { name: "Наименование", className: "" },
    { name: "", className: "w-[100px]" },
]

const DivisionPage = async () => {
    const divisions = await getDivisions(); 
    let count = 1;
    
    return (
        <div className="bg-secondary rounded-xl w-1/2 flex flex-wrap items-center justify-between mx-auto p-4 shadow-sm">  
            <AddADivision />
            <Table>
                <TableCaption>Подразделение</TableCaption>
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
                {divisions?.map(division => (
                    <TableDivision 
                        key={division.id}
                        id={division.id}
                        name={division.name}   
                        count={count++}                        
                    />
                ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default DivisionPage;