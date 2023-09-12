export type Person = {
    row: number,
    name: string,
    nationalCode: string,
    ceoName: string,
    companyOwnershipTypeName: string
}

export type ExeManagerProducerInfo = {
    person: Person,
    choices: { key: string, label: string }[]
}

export type ExeManagerProducer = {
    persons: Person[]
}