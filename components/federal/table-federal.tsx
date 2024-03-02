"use client"

import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { TiDelete } from "react-icons/ti";
import { useTransition } from "react";
import { toast } from "sonner";
import { federalDelete } from "@/actions/federal";
import { EditFederal } from "./edit-federal";

interface TableOfPlacementProps {
  id: string;
  name: string;
  count: number;
}

  export const TableFederal = ({
    id,
    name,
    count
  }: TableOfPlacementProps) => {
    const [isPending, startTransition] = useTransition();
    
    const onDelete = (id: string) => {
      startTransition(() => {
        federalDelete(id)
              .then((data) => {
                  if (data.error) {
                      toast.error(data.error);
                  }
  
                  if (data.success) {
                    toast.success(data.success);
                    window.location.reload();   
                  }
              })
              .catch(() => toast.error("Что-то пошло не так!"));
      });           
    }

    return (
            <TableRow key={id}>
              <TableCell className="font-medium">{count}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell className="flex flex-row gap-x-1">
                <EditFederal
                  id={id}
                  name={name}
                /> 
                <Button 
                onClick={() => onDelete(id)} 
                variant="destructive" 
                className="w-[50px]"
                disabled={isPending}
                >
                  <TiDelete />
                  </Button>
              </TableCell>
            </TableRow>
    );
  }