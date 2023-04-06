import { FormGroup } from "@angular/forms"

export interface TicketMasterApiSearchTerm {
    city: string | null
    startDateTime: string | null
    endDateTime: string | null
    page?: number
}

export interface ISearchComponent {
    searchForm: FormGroup
    search(): void
    clear(): void
}
