"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const DropMenuLinks = [
    { href: "/placement", name: "Cпособ размещения" },
    { href: "/type", name: "Тип ЕП" },
    { href: "/federal", name: "Федеральный закон" },
    { href: "/view", name: "Вид закупки" },
    { href: "/article", name: "Статья расходов" },
    { href: "/division", name: "Подразделение" },
    { href: "/provider", name: "Поставщики" },
]

export const ReferencesButton = () => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Справочники</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-100" align="end">
                {DropMenuLinks.map(DropMenuLink => (
                    <Link href={DropMenuLink.href} key={DropMenuLink.href}>
                        <DropdownMenuItem>
                            {DropMenuLink.name}
                        </DropdownMenuItem>
                    </Link>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};