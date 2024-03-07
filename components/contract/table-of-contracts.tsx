import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { EditContract } from "./edit-contracts";
import { Button } from "../ui/button";
import { TiDelete } from "react-icons/ti";
import { getPlacementById } from "@/data/placement";
import { getDivisionById } from "@/data/division";


interface contractParam {
  count: number;
  placementId: string;
  contractNumber: string;
  startDateOfTheAgreement: string,
  endDateOfTheContract: string,
  provider: string,
  theSubjectOfTheAgreement: string,
  actuallyPaidFor: string,
  theAmountOfTheContract: string,
  divisionId: string,
  executor: string,
  color: string
}

export const TableOfContracts = async ({
  count,
  placementId,
  contractNumber,
  startDateOfTheAgreement,
  endDateOfTheContract,
  provider,
  theSubjectOfTheAgreement,
  actuallyPaidFor,
  theAmountOfTheContract,
  divisionId,
  executor,
  color
}: contractParam) => {
  
    const placement = await getPlacementById(placementId); 
    const division = await getDivisionById(divisionId);

    const getColor = (color: string) => {
      if (color) {
        return `${color} text-white hover:!text-black`
      }

      return "bg-secondary"
    }

    return (
        
          <TableRow className={getColor(color)}>
            <TableCell className="font-medium">{count}</TableCell>
            <TableCell>{contractNumber}</TableCell>
            <TableCell>{placement?.name}</TableCell>
            <TableCell>{startDateOfTheAgreement}</TableCell>
            <TableCell>{endDateOfTheContract}</TableCell>
            <TableCell>{theSubjectOfTheAgreement}</TableCell>
            <TableCell>{division?.name}</TableCell>
            <TableCell>{provider}</TableCell>            
            <TableCell>{actuallyPaidFor}</TableCell>
            <TableCell>{theAmountOfTheContract}</TableCell>
            <TableCell>{executor}</TableCell>
            <TableCell>Цвет</TableCell>
            <TableCell className="flex flex-row gap-x-1 !text-black">
              <EditContract />
              <Button  variant="destructive" className="w-[50px]"><TiDelete /></Button>
            </TableCell>
          </TableRow>
    );
}