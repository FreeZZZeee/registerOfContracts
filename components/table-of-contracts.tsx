import {
    TableBody,
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { EditContract } from "./edit-contracts";
import { Button } from "./ui/button";
import { TiDelete } from "react-icons/ti";

  export const TableOfContracts = () => {
    return (
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="flex flex-row gap-x-1">
              <EditContract />
              <Button  variant="destructive" className="w-[50px]"><TiDelete /></Button>
              </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="flex flex-row gap-x-1">
              <EditContract />
              <Button  variant="destructive" className="w-[50px]"><TiDelete /></Button>
              </TableCell>
          </TableRow>
        </TableBody>
    );
  }