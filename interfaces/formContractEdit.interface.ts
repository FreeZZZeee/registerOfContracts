import { colorParam } from "./color.interface"
import { selectParam } from "./guide.interface"
import { Payment } from "./payment.interface"

export interface valuesParamPropsArr {
    id: string,
    placement: string,
    type: string,
    point: string,
    subItem: string,
    federal: string,
    contractNumber: string,
    startDateOfTheAgreement: string,
    thePostagePeriod: string,
    endDateOfTheContract: string,
    provider: string,
    theSubjectOfTheAgreement: string,
    theAmountOfTheContract: string,
    returnDate: string,
    theAmountOfCollateral: string,
    view: string,
    article: string,
    division: string,
    sourceOfFinancing: string,
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
    payment: Payment[]
}