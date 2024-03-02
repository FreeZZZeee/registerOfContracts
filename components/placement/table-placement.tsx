"use client"

import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { TiDelete } from "react-icons/ti";
import { startTransition, useState } from "react";
import { placementDelete } from "@/actions/placement";
import { toast } from "sonner";
import { EditPlacement } from "@/components/placement/edit-placement";

interface TableOfPlacementProps {
  id: string;
  name: string;
  count: number;
}

  export const TablePlacement = ({
    id,
    name,
    count
  }: TableOfPlacementProps) => {
    const onDelete = (id: string) => {
      startTransition(() => {
        placementDelete(id)
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
                <EditPlacement 
                  id={id}
                  name={name}
                /> 
                <Button onClick={() => onDelete(id)} variant="destructive" className="w-[50px]"><TiDelete /></Button>
              </TableCell>
            </TableRow>
    );
  }