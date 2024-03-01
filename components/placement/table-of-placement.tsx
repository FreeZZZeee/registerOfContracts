"use client"

import {
    TableBody,
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { EditContract } from "@/components/edit-contracts";
import { Button } from "@/components/ui/button";
import { TiDelete } from "react-icons/ti";
import { useEffect, useState } from "react";

interface TableOfPlacementParam {
  id: string
  name: string;
}

interface TableOfPlacementProps {
  placements: Array<TableOfPlacementParam>;
}

  export const TableOfPlacement = ({
    placements
  }: TableOfPlacementProps) => {
    const [arr, setPlacements] = useState<[]>();
    
    useEffect(() => { 
      if (placements) {
        setPlacements(placements as []);
      }      
    }, [placements])
  

    return (
        <TableBody>
          {arr?.map(placement => (
            <TableRow>
              <TableCell className="font-medium">1</TableCell>
              <TableCell>{placement.name}</TableCell>
              <TableCell className="flex flex-row gap-x-1">
                <EditContract />
                <Button  variant="destructive" className="w-[50px]"><TiDelete /></Button>
              </TableCell>
          </TableRow>
          ))}     
        </TableBody>
    );
  }