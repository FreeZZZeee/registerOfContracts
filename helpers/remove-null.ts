interface searchValuesParams {
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