import { selectParam } from "./guide.interface"

export interface Payment {
    id: string
    amount: string
    paymentOrderNumber: string
    paymentRegistrationDate: Date
    division: string
    contract: string
}