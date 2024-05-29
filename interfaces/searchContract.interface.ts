import { selectParam } from "./guide.interface"

export interface valuesParamPropsArr {
    placements: selectParam[]
    types: selectParam[]
    federals: selectParam[]
    views: selectParam[]
    articles: selectParam[]
    divisions: selectParam[]
    providers: selectParam[]
    users: selectParam[]
}

export interface searchContract {
    placement: string,
    type: string,
    point: string,
    subItem: string,
    federal: string,
    contractNumber: string,
    startDateOfTheAgreement: string,
    thePostagePeriodFrom: string,
    thePostagePeriodIsUpTo: string,
    endDateOfTheContract: string,
    provider: string,
    theSubjectOfTheAgreement: string,
    actuallyPaidFor: string,
    theAmountOfTheContract: string,
    returnDate: string,
    theAmountOfTheContractFrom: string,
    theAmountOfTheContractIsUpTo: string,
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
    user: string
} 