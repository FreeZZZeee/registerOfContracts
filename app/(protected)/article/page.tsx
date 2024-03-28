"use client"
import { AddAArticle } from "@/components/article/add-a-article";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TableArticle } from "@/components/article/table-article";
import { getArticles } from "@/data/article";
import { useEffect, useState } from "react";

const tableRows = [
    { name: "№", className: "w-[50px]" },
    { name: "Наименование", className: "" },
    { name: "", className: "w-[100px]" },
]

interface TableOfArticleProps {
    id: string;
    name: string;
}

const ArticlePage = () => {
    const [articles, setArticles] = useState<TableOfArticleProps[]>([])

    const fetchBooks = async () => {
        const articles = await getArticles() as TableOfArticleProps[];
        setArticles(articles)
    }
    useEffect(() => {
        fetchBooks()
    }, [])


    let count = 1;

    return (
        <div className="bg-secondary rounded-xl w-1/2 flex flex-wrap items-center justify-between mx-auto p-4 shadow-sm">
            <AddAArticle />
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
                        <TableArticle
                            key={article.id}
                            id={article.id}
                            name={article.name}
                            count={count++}
                        />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default ArticlePage;