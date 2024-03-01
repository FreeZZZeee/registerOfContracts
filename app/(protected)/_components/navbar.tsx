"use client";

import { UserButton } from "@/components/auth/user-button";
import { ReferencesButton } from "@/components/references-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
    const pathname = usePathname();

    return (
        <nav className="bg-secondary rounded-xl w-full flex flex-wrap items-center justify-between mx-auto p-4 shadow-sm">
            <div className="flex gap-x-2">
            <Button
                    asChild
                    variant={pathname === "/regestry" ? "default" : "outline"}
                >
                    <Link href={"/registry"}>
                        Реестр договоров
                    </Link>
                </Button>
                <Button
                    asChild
                    variant={pathname === "/summary" ? "default" : "outline"}
                >
                    <Link href={"/summary"}>
                        Сводная таблица закупок ПНИПУ
                    </Link>
                </Button>
                <ReferencesButton />              
                <Button
                    asChild
                    variant={pathname === "/reports" ? "default" : "outline"}
                >
                    <Link href={"/reports"}>
                        Отчеты
                    </Link>
                </Button>
            </div>
            <UserButton />
        </nav>
    )
}