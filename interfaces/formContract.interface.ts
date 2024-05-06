import { colorParam } from "./color.interface"
import { selectParam } from "./guide.interface"

export interface valuesParamPropsArr {
    id: string,
    placementId: string,
    typeId: string,
    point: string,
    subItem: string,
    federalId: string,
    contractNumber: string,
    startDateOfTheAgreement: string,
    thePostagePeriod: string,
    endDateOfTheContract: string,
    provider: string,
    theSubjectOfTheAgreement: string,
    theAmountOfTheContract: string,
    returnDate: string,
    theAmountOfCollateral: string,
    viewId: string,
    articleId: string,
    divisionId: string,
    sourceOfFinancing: string,
    MP: boolean,
    micro: boolean,
    small: boolean,
    average: boolean,
    subcontractorMP: boolean,
    transients: boolean,
    additionalInformation: string,
    contractColor: string
    pdfFile: string | File
    placements: selectParam[]
    types: selectParam[]
    federals: selectParam[]
    views: selectParam[]
    articles: selectParam[]
    divisions: selectParam[]
    providers: selectParam[]
    colors: colorParam[]
}