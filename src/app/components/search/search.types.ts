import { FormGroup } from "@angular/forms"

export interface TicketMasterApiSearchTerm {
    city: string
    startDateTime: string
    endDateTime: string
    page?: number
}

export interface ISearchComponent {
    searchForm: FormGroup
    search(): void
}
