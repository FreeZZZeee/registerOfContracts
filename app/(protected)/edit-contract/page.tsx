import { getContractFromAxios, getContractsFromAxios } from "@/data/contract";
import { colors } from "@/data/colors";
import { EditContract } from "../_components/editContracts";
import { currentUser } from "@/lib/auth";
import { getPayByContractId } from "@/data/payment";
import { Payment } from "@/interfaces/payment.interface";

const EditContractPage = async (props: any) => {
    const user = await currentUser();
    const qs = props.searchParams;
    const data = await getContractFromAxios(qs?.id);
    const payment = await getPayByContractId(qs?.id);

    const dataContract = await getContractsFromAxios(user?.id as string);

    return (
        <div className="bg-secondary rounded-xl w-3/6 flex flex-wrap items-center justify-between mx-auto mb-10 p-4 shadow-sm">
            <EditContract
                id={data.id}
                placement={data.placement}
                contractNumber={data.contractNumber}
                point={data.point}
                subItem={data.subItem}
                startDateOfTheAgreement={data.startDateOfTheAgreement}
                thePostagePeriod={data.thePostagePeriod}
                endDateOfTheContract={data.endDateOfTheContract}
                provider={data.provider}
                federal={data.federal}
                type={data.type}
                theSubjectOfTheAgreement={data.theSubjectOfTheAgreement}
                theAmountOfTheContract={data.theAmountOfTheContract}
                division={data.division}
                contractColor={data.contractColor}
                returnDate={data.returnDate}
                theAmountOfCollateral={data.theAmountOfCollateral}
                view={data.view}
                article={data.article}
                sourceOfFinancing={data.sourceOfFinancing}
                MP={data.MP}
                micro={data.micro}
                small={data.small}
                average={data.average}
                subcontractorMP={data.subcontractorMP}
                transients={data.transients}
                additionalInformation={data.additionalInformation}
                pdfFile={data.pdfFile}
                placements={dataContract.placements as []}
                types={dataContract.types as []}
                federals={dataContract.federals as []}
                views={dataContract.views as []}
                articles={dataContract.articles as []}
                divisions={dataContract.divisions as []}
                providers={dataContract.providers}
                colors={colors as []}
                payment={payment as Payment[]}
            />
        </div>
    );
}

export default EditContractPage;