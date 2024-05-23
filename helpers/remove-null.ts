interface searchValuesParams {
    placement: string,
    type: string,
    federal: string,
    point: string,
    subItem: string,
    startDateOfTheAgreement: string,
    endDateOfTheContract: string,
    provider: string,
    thePostagePeriod: string,
    theSubjectOfTheAgreement: string,
    theAmountOfTheContract: string,
    division: string,
    sourceOfFinancing: string,
    subcontractorMP: boolean,
    transients: boolean,
    micro: boolean,
    small: boolean,
    average: boolean,
    contractColor: string,
    user: string
}

export const removeNull: {} | any = (obj: searchValuesParams) => {
    return Object.fromEntries(
        Object.entries(obj)
            .filter(([_, value]) => value)
            .map(([key, value]) => [
                key,
                value === Object(value) ? removeNull(value) : value,
            ]),
    );
}