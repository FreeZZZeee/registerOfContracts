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
import { useRouter } from "next/navigation";

interface valuesParamProps {
  name: string;
  label: string;
  type: string;
}

interface selectParam {
  name: string;
}

interface colorParam {
  color: string;
}

interface contractParam {
  id: string;
  count: number;
  placementName: string;
  contractNumber: string;
  startDateOfTheAgreement: string;
  endDateOfTheContract: string;
  provider: string;
  federal: string;
  type: string;
  theSubjectOfTheAgreement: string;
  actuallyPaidFor: string;
  theAmountOfTheContract: string;
  divisionName: string;
  executor: string;
  color: string;
  returnDate: string;
  theAmountOfCollateral: string;
  view: string;
  article: string;
  sourceOfFinancing: string;
  MP: boolean;
  subcontractorMP: boolean;
  transients: boolean;
  additionalInformation: string;
  valuesParam: valuesParamProps[]
  placements: selectParam[]
  types: selectParam[]
  federals: selectParam[]
  views: selectParam[]
  articles: selectParam[]
  divisions: selectParam[]
  colors: colorParam[]
}


export const TableOfContracts = ({
  id,
  count,
  placementName,
  contractNumber,
  startDateOfTheAgreement,
  endDateOfTheContract,
  provider,
  federal,
  type,
  theSubjectOfTheAgreement,
  actuallyPaidFor,
  theAmountOfTheContract,
  divisionName,
  executor,
  color,
  returnDate,
  theAmountOfCollateral,
  view,
  article,
  sourceOfFinancing,
  MP,
  subcontractorMP,
  transients,
  additionalInformation,
  valuesParam,
  placements,
  types,
  federals,
  views,
  articles,
  divisions,
  colors
}: contractParam
) => {

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const getColor = (color: string) => {
    if (color) {
      return `${color}`
    }

    return "bg-secondary"
  }

  const onDelete = (id: string) => {
    startTransition(() => {
      contractDelete(id)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            toast.success(data.success);
            router.refresh();
          }
        })
        .catch(() => toast.error("Что-то пошло не так!"));
    });
  }

  return (
    <TableRow>
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
      <TableCell className={getColor(color)}></TableCell>
      <TableCell className="flex flex-row gap-x-1 !text-black">
        <EditContract
          id={id}
          placement={placementName}
          contractNumber={contractNumber}
          startDateOfTheAgreement={startDateOfTheAgreement}
          endDateOfTheContract={endDateOfTheContract}
          provider={provider}
          federal={federal}
          type={type}
          theSubjectOfTheAgreement={theSubjectOfTheAgreement}
          actuallyPaidFor={actuallyPaidFor}
          theAmountOfTheContract={theAmountOfCollateral}
          division={divisionName}
          contractColor={color}
          returnDate={returnDate}
          theAmountOfCollateral={theAmountOfCollateral}
          view={view}
          article={article}
          sourceOfFinancing={sourceOfFinancing}
          MP={MP}
          subcontractorMP={subcontractorMP}
          transients={transients}
          additionalInformation={additionalInformation}
          valuesParam={valuesParam as []}
          placements={placements as []}
          types={types as []}
          federals={federals as []}
          views={views as []}
          articles={articles as []}
          divisions={divisions as []}
          colors={colors as []}
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