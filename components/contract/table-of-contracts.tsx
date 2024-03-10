"use client"

import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { EditContract } from "./edit-contracts";
import { Button } from "../ui/button";
import { TiDelete } from "react-icons/ti";
import { contractDelete } from "@/actions/contract";
import { toast } from "sonner";
import { useTransition } from "react";

interface contractParam {
  id: string;
  count: number;
  placementName: string;
  contractNumber: string;
  startDateOfTheAgreement: string,
  endDateOfTheContract: string,
  provider: string,
  theSubjectOfTheAgreement: string,
  actuallyPaidFor: string,
  theAmountOfTheContract: string,
  divisionName: string,
  executor: string,
  color: string
}

export const TableOfContracts = ({
  id,
  count,
  placementName,
  contractNumber,
  startDateOfTheAgreement,
  endDateOfTheContract,
  provider,
  theSubjectOfTheAgreement,
  actuallyPaidFor,
  theAmountOfTheContract,
  divisionName,
  executor,
  color
}: contractParam) => {

  const getColor = (color: string) => {
    if (color) {
      return `${color} text-white hover:!text-black`
    }

    return "bg-secondary"
  }

  const [isPending, startTransition] = useTransition();

  const onDelete = (id: string) => {
    startTransition(() => {
      contractDelete(id)
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

    <TableRow className={getColor(color)}>
      <TableCell className="font-medium">{count}</TableCell>
      <TableCell>{contractNumber}</TableCell>
      <TableCell>{placementName}</TableCell>
      <TableCell>{startDateOfTheAgreement}</TableCell>
      <TableCell>{endDateOfTheContract}</TableCell>
      <TableCell>{theSubjectOfTheAgreement}</TableCell>
      <TableCell>{divisionName}</TableCell>
      <TableCell>{provider}</TableCell>
      <TableCell>{actuallyPaidFor}</TableCell>
      <TableCell>{theAmountOfTheContract}</TableCell>
      <TableCell>{executor}</TableCell>
      <TableCell>Цвет</TableCell>
      <TableCell className="flex flex-row gap-x-1 !text-black">
        <EditContract />
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