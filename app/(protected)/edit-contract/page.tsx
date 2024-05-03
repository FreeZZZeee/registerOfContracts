import { currentUser } from "@/lib/auth";
import { getContractFromAxios } from "@/data/contract";

const DivisionPage = async (props: any) => {
    const user = await currentUser();
    const qs = props.searchParams;
    const data = await getContractFromAxios(qs.id);

    return (
        <div className="bg-secondary rounded-xl w-3/6 flex flex-wrap items-center justify-between mx-auto mb-10 p-4 shadow-sm">
            {JSON.stringify(data)}

            {/* <EditContract
                id={row.original.id}
                placementId={row.original.placementId}
                contractNumber={row.original.contractNumber}
                point={row.original.point}
                subItem={row.original.subItem}
                startDateOfTheAgreement={row.original.startDateOfTheAgreement}
                thePostagePeriod={row.original.thePostagePeriod}
                endDateOfTheContract={row.original.endDateOfTheContract}
                provider={row.original.provider}
                federalId={row.original.federalId}
                typeId={row.original.typeId}
                theSubjectOfTheAgreement={row.original.theSubjectOfTheAgreement}
                theAmountOfTheContract={row.original.theAmountOfCollateral}
                divisionId={row.original.divisionId}
                contractColor={row.original.contractColor}
                returnDate={row.original.returnDate}
                theAmountOfCollateral={row.original.theAmountOfCollateral}
                viewId={row.original.viewId}
                articleId={row.original.articleId}
                sourceOfFinancing={row.original.sourceOfFinancing}
                MP={row.original.MP}
                micro={row.original.micro}
                small={row.original.small}
                average={row.original.average}
                subcontractorMP={row.original.subcontractorMP}
                transients={row.original.transients}
                additionalInformation={row.original.additionalInformation}
                pdfFile={row.original.pdfFile}
                placements={placements as []}
                types={types as []}
                federals={federals as []}
                views={views as []}
                articles={articles as []}
                divisions={divisions as []}
                colors={colors as []}
            /> */}
        </div>
    );
}

export default DivisionPage;