import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { TicketMasterApiSearchTerm } from "src/app/components/search/search.types";
import { TicketMasterEventList } from "src/app/misc/event.types";
import { TicketMasterApiService } from "../api/ticketmaster-api.service";

interface ITicketMasterQueryService {
    responseEvents: BehaviorSubject<TicketMasterEventList>
    responseEvents$: Observable<TicketMasterEventList>
    previousSearchTerm: BehaviorSubject<TicketMasterApiSearchTerm>
    previousSearchTerm$: Observable<TicketMasterApiSearchTerm>
    getEvents(searchTerm: TicketMasterApiSearchTerm, pageIndex?: number): Observable<TicketMasterEventList>
    convertDatesToISOFormat(searchTerm: TicketMasterApiSearchTerm): TicketMasterApiSearchTerm
}

const DEFAULTSEARCHTERM: TicketMasterApiSearchTerm = {city: '', startDateTime: '', endDateTime: ''}
const DEFAULTEVENTRESPONSE: TicketMasterEventList = {events: [], page: null}

@Injectable()
export class TicketMasterQueryService implements ITicketMasterQueryService {


    constructor(private ticketMasterApiService: TicketMasterApiService){}

    responseEvents: BehaviorSubject<TicketMasterEventList> = new BehaviorSubject<TicketMasterEventList>(DEFAULTEVENTRESPONSE)
    responseEvents$: Observable<TicketMasterEventList> = this.responseEvents.asObservable()
    previousSearchTerm: BehaviorSubject<TicketMasterApiSearchTerm> = new BehaviorSubject<TicketMasterApiSearchTerm>(DEFAULTSEARCHTERM)
    previousSearchTerm$: Observable<TicketMasterApiSearchTerm> = this.previousSearchTerm.asObservable()

    getEvents(searchTerm: TicketMasterApiSearchTerm, pageIndex?: number): Observable<TicketMasterEventList> {
        if (searchTerm) {
            this.previousSearchTerm.next(searchTerm)
        }
        // const correctedTerm$
        return this.ticketMasterApiService.get(searchTerm).pipe(tap((response: any) => this.responseEvents.next(response)))
    }

    convertDatesToISOFormat(searchTerm: TicketMasterApiSearchTerm): TicketMasterApiSearchTerm {
        throw new Error("Method not implemented.");
    }


    
    
}