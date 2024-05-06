import { getContractFromAxios, getContractsFromAxios, getNewContracts } from "@/data/contract";
import { colors } from "@/data/colors";
import { getGuideFromAxios } from "@/data/guide";
import { EditContract } from "../_components/editContracts";
import { currentUser } from "@/lib/auth";

const EditContractPage = async (props: any) => {
    const user = await currentUser();
    const qs = props.searchParams;
    const data = await getContractFromAxios(qs?.id);
    const contracts = await getNewContracts([data]);

    const dataContract = await getContractsFromAxios(user?.id as string);

    return (
        <div className="bg-secondary rounded-xl w-3/6 flex flex-wrap items-center justify-between mx-auto mb-10 p-4 shadow-sm">
            {contracts && contracts.map(contract => (
                <EditContract
                    id={contract.id}
                    placementId={contract.placementId}
                    contractNumber={contract.contractNumber}
                    point={contract.point}
                    subItem={contract.subItem}
                    startDateOfTheAgreement={contract.startDateOfTheAgreement}
                    thePostagePeriod={contract.thePostagePeriod}
                    endDateOfTheContract={contract.endDateOfTheContract}
                    provider={contract.providerId}
                    federalId={contract.federalId}
                    typeId={contract.typeId}
                    theSubjectOfTheAgreement={contract.theSubjectOfTheAgreement}
                    theAmountOfTheContract={contract.theAmountOfCollateral}
                    divisionId={contract.divisionId}
                    contractColor={contract.contractColor}
                    returnDate={contract.returnDate}
                    theAmountOfCollateral={contract.theAmountOfCollateral}
                    viewId={contract.viewId}
                    articleId={contract.articleId}
                    sourceOfFinancing={contract.sourceOfFinancing}
                    MP={contract.MP}
                    micro={contract.micro}
                    small={contract.small}
                    average={contract.average}
                    subcontractorMP={contract.subcontractorMP}
                    transients={contract.transients}
                    additionalInformation={contract.additionalInformation}
                    pdfFile={contract.pdfFile}
                    placements={dataContract.placements as []}
                    types={dataContract.types as []}
                    federals={dataContract.federals as []}
                    views={dataContract.views as []}
                    articles={dataContract.articles as []}
                    divisions={dataContract.divisions as []}
                    providers={dataContract.providers}
                    colors={colors as []}
                />
            ))}
        </div>
    );
}

export default EditContractPage;