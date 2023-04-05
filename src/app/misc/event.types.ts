
/**
 * inital interfaces for hydrating api responses
 */
export interface TicketMasterEvent {
    id: string
    name: string
    url: string
    startDate: string
    endDate: string
    venueName: string
}

export interface TicketMasterEventList {
    events: TicketMasterEvent[]
    page: null
}

export interface TicketMasterEventPage {
    size: number
    totalElements: number
    totalPages: number
    number: number
}