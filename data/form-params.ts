export const formParams = [
    { name: "placement", label: "Способ размещения", type: "select" },
    { name: "type", label: "Тип ЕП", type: "select" },
    { name: "point", label: "П.", type: "text" },
    { name: "subItem", label: "ПП.", type: "text" },
    { name: "federal", label: "Федеральный закон", type: "select" },
    { name: "contractNumber", label: "Номер договора", type: "text" },
    { name: "startDateOfTheAgreement", label: "Дата начала действия договора", type: "date" },
    { name: "thePostagePeriod", label: "Срок поставки ТРУ", type: "date" },
    { name: "endDateOfTheContract", label: "Дата окончания договора", type: "date" },
    { name: "provider", label: "Поставщик, подрядчик, исполнитель", type: "text" },
    { name: "theSubjectOfTheAgreement", label: "Передмет договора", type: "text" },
    { name: "actuallyPaidFor", label: "Фактически оплачено", type: "text" },
    { name: "theAmountOfTheContract", label: "Сумма договора", type: "text" },
    { name: "returnDate", label: "Дата возврата обеспечения", type: "date" },
    { name: "theAmountOfCollateral", label: "Сумма обеспечения", type: "text" },
    { name: "view", label: "Вид закупки", type: "select" },
    { name: "article", label: "Статья расходов", type: "select" },
    { name: "division", label: "Подразделение", type: "text" },
    { name: "sourceOfFinancing", label: "Источники финансирования", type: "text" },
    { name: "additionalInformation", label: "Дополнительная информация", type: "textArea" },
    { name: "MP", label: "Субъекты малого и среднего предпринимательства", type: "headingBool" },
    { name: "micro", label: "Микро", type: "bool" },
    { name: "small", label: "Малое", type: "bool" },
    { name: "average", label: "Среднее", type: "bool", className: "mb-5" },
    { name: "subcontractorMP", label: "Субподрядчик МП", type: "bool" },
    { name: "transients", label: "Переходящие", type: "bool" },
    { name: "pdfFile", label: "Документ", type: "file" },
    { name: "contractColor", label: "Цвет", type: "select" },
]

export const formParamsPayment = [
    { name: "amount", label: "Сумма платежа", type: "text" },
    { name: "paymentRegistrationDate", label: "Дата регистрации платежа", type: "date" },
    { name: "division", label: "Подразделение", type: "text" },
    { name: "paymentOrderNumber", label: "№ платежного поручения.", type: "text" },
]

export const searchFormParams = [
    { name: "user", label: "Исполнитель", type: "select" },
    { name: "placement", label: "Способ размещения", type: "select" },
    { name: "type", label: "Тип ЕП", type: "select" },
    { name: "point", label: "П.", type: "text" },
    { name: "subItem", label: "ПП.", type: "text" },
    { name: "federal", label: "Федеральный закон", type: "select" },
    { name: "startDateOfTheAgreement", label: "Дата начала действия договора", type: "date" },
    { name: "thePostagePeriod", label: "Срок поставки ТРУ", type: "headingBool" },
    { name: "thePostagePeriodFrom", label: "От", type: "date" },
    { name: "thePostagePeriodIsUpTo", label: "До", type: "date" },
    { name: "endDateOfTheContract", label: "Дата окончания договора", type: "date" },
    { name: "provider", label: "Поставщик, подрядчик, исполнитель", type: "text" },
    { name: "theSubjectOfTheAgreement", label: "Передмет договора", type: "text" },
    { name: "theAmountOfTheContract", label: "Сумма договора", type: "headingBool" },
    { name: "theAmountOfTheContractFrom", label: "От", type: "text" },
    { name: "theAmountOfTheContractIsUpTo", label: "До", type: "text" },
    { name: "division", label: "Подразделение", type: "text" },
    { name: "sourceOfFinancing", label: "Источники финансирования", type: "text" },
    { name: "MP", label: "Субъекты малого и среднего предпринимательства", type: "headingBool" },
    { name: "micro", label: "Микро", type: "bool" },
    { name: "small", label: "Малое", type: "bool" },
    { name: "average", label: "Среднее", type: "bool", className: "mb-5" },
    { name: "subcontractorMP", label: "Субподрядчик МП", type: "bool" },
    { name: "transients", label: "Переходящие", type: "bool" },
    { name: "contractColor", label: "Цвет", type: "select" },
]