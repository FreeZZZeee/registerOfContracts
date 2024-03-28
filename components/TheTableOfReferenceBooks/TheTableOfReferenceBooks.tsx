import { TiDelete } from "react-icons/ti"
import { EditArticle } from "../article/edit-article"
import { Button } from "../ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { TheTableOfReferenceBooksProps } from "./TheTableOfReferenceBooks.props"

export const TheTableOfReferenceBooks = ({
    count,
    tableRows,
    articles,
    onDelete,
    isPending
}: TheTableOfReferenceBooksProps): JSX.Element => {
    return (
        <Table>
            <TableCaption>Статья расходов</TableCaption>
            <TableHeader className="h-[80px]">
                <TableRow>
                    {tableRows.map(tableRow => (
                        <TableHead key={tableRow.name} className={tableRow.className}>
                            {tableRow.name}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {articles?.map(article => (
                    <TableRow key={article.id}>
                        <TableCell className="font-medium">{count}</TableCell>
                        <TableCell>{article.name}</TableCell>
                        <TableCell className="flex flex-row gap-x-1">
                            <EditArticle
                                id={article.id}
                                name={article.name}
                            />
                            <Button
                                onClick={() => onDelete(article.id)}
                                variant="destructive"
                                className="w-[50px]"
                                disabled={isPending}
                            >
                                <TiDelete />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}