"use client"

import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { EditContract } from "./edit-contracts";
import { Button } from "../ui/button";
import { TiDelete } from "react-icons/ti";
import { contractDelete } from "@/actions/contract";
import { toast } from "sonner";
import { useEffect, useState, useTransition } from "react";
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
  id: string,
  placementId: string,
  typeId: string,
  federalId: string,
  contractNumber: string,
  startDateOfTheAgreement: string,
  endDateOfTheContract: string,
  provider: string,
  theSubjectOfTheAgreement: string,
  actuallyPaidFor: string,
  theAmountOfTheContract: string,
  returnDate: string,
  theAmountOfCollateral: string,
  viewId: string,
  articleId: string,
  divisionId: string,
  sourceOfFinancing: string,
  MP: boolean,
  subcontractorMP: boolean,
  transients: boolean,
  additionalInformation: string,
  contractColor: string
  userId: string
}

interface contractParamArr {
  contracts: contractParam[]
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
  contracts,
  valuesParam,
  placements,
  types,
  federals,
  views,
  articles,
  divisions,
  colors
}: contractParamArr
) => {
  const [newContracts, setContracts] = useState(contracts as contractParam[]);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  let count: number = 1;

  useEffect(() => {
    setInterval(() => {
      if (typeof window !== 'undefined') {
        let searchContract = JSON.parse(localStorage.getItem('contracts') as any);
        if (searchContract) {
          setContracts(searchContract)
        } else {
          setContracts(contracts);
        }
      }
    }, 100);
  }, [])


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
    <TableBody>
      {newContracts && newContracts?.map((contract) => {
        return (
          <TableRow key={contract.id}>
            <TableCell className="font-medium">{count++}</TableCell>
            <TableCell>{contract.contractNumber}</TableCell>
            <TableCell>{contract.placementId}</TableCell>
            <TableCell>{contract.startDateOfTheAgreement}</TableCell>
            <TableCell>{contract.endDateOfTheContract}</TableCell>
            <TableCell>{contract.theSubjectOfTheAgreement}</TableCell>
            <TableCell>{contract.divisionId}</TableCell>
            <TableCell>{contract.provider}</TableCell>
            <TableCell>{contract.actuallyPaidFor}</TableCell>
            <TableCell>{contract.theAmountOfTheContract}</TableCell>
            <TableCell>{contract.userId}</TableCell>
            <TableCell className={getColor(contract.contractColor)}></TableCell>
            <TableCell className="flex flex-row gap-x-1 !text-black">
              <EditContract
                id={contract.id}
                placementId={contract.placementId}
                contractNumber={contract.contractNumber}
                startDateOfTheAgreement={contract.startDateOfTheAgreement}
                endDateOfTheContract={contract.endDateOfTheContract}
                provider={contract.provider}
                federalId={contract.federalId}
                typeId={contract.typeId}
                theSubjectOfTheAgreement={contract.theSubjectOfTheAgreement}
                actuallyPaidFor={contract.actuallyPaidFor}
                theAmountOfTheContract={contract.theAmountOfCollateral}
                divisionId={contract.divisionId}
                contractColor={contract.contractColor}
                returnDate={contract.returnDate}
                theAmountOfCollateral={contract.theAmountOfCollateral}
                viewId={contract.viewId}
                articleId={contract.articleId}
                sourceOfFinancing={contract.sourceOfFinancing}
                MP={contract.MP}
                subcontractorMP={contract.subcontractorMP}
                transients={contract.transients}
                additionalInformation={contract.additionalInformation}
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
                onClick={() => onDelete(contract.id)}
                variant="destructive"
                className="w-[50px]"
                disabled={isPending}
              >
                <TiDelete />
              </Button>
            </TableCell>
          </TableRow>
        )
      })}
    </TableBody>
  );
}