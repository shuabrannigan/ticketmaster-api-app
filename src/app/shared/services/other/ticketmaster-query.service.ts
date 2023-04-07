import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, finalize, map, switchMap, take, tap, throwError } from "rxjs";
import { TicketMasterApiSearchTerm } from "src/app/components/search/search.types";
import { TicketMasterEventList } from "src/app/misc/event.types";
import { TicketMasterApiService } from "../api/ticketmaster-api.service";
import { LoadingService } from "./loading.service";

interface ITicketMasterQueryService {
    responseEvents: BehaviorSubject<TicketMasterEventList>
    responseEvents$: Observable<TicketMasterEventList>
    previousSearchTerm: BehaviorSubject<TicketMasterApiSearchTerm>
    previousSearchTerm$: Observable<TicketMasterApiSearchTerm>
    getEvents(searchTerm: TicketMasterApiSearchTerm, pageIndex?: number): Observable<TicketMasterEventList>
    convertDateToISOFormat(searchTerm: TicketMasterApiSearchTerm): TicketMasterApiSearchTerm
}

const DEFAULTSEARCHTERM: TicketMasterApiSearchTerm = {city: '', startDateTime: '', endDateTime: ''}
const DEFAULTEVENTRESPONSE: TicketMasterEventList = {events: [], page: null}

@Injectable()
export class TicketMasterQueryService implements ITicketMasterQueryService {


    constructor(private ticketMasterApiService: TicketMasterApiService, private loadingService: LoadingService){}


    responseEvents: BehaviorSubject<TicketMasterEventList> = new BehaviorSubject<TicketMasterEventList>(DEFAULTEVENTRESPONSE)
    responseEvents$: Observable<TicketMasterEventList> = this.responseEvents.asObservable()
    previousSearchTerm: BehaviorSubject<TicketMasterApiSearchTerm> = new BehaviorSubject<TicketMasterApiSearchTerm>(DEFAULTSEARCHTERM)
    previousSearchTerm$: Observable<TicketMasterApiSearchTerm> = this.previousSearchTerm.asObservable()

    getEvents(searchTerm: TicketMasterApiSearchTerm | null, pageIndex?: number): Observable<TicketMasterEventList> {
        if (searchTerm) {
            this.previousSearchTerm.next(searchTerm)
        }
        this.loadingService.loading.next(true)
        const correctedTerm$ = this.previousSearchTerm$.pipe(map((previousTerm) => {
            let correctedTerm = this.convertDateToISOFormat(previousTerm)
            if (pageIndex) {
                correctedTerm = {...correctedTerm, page: pageIndex}
            }
            return correctedTerm
        }))
        return correctedTerm$.pipe(
            take(1),
            switchMap((correctedTerm) => this.ticketMasterApiService.get(correctedTerm)),
            tap((response: any) => {
                this.responseEvents.next(response)
                this.loadingService.loading.next(false)
            }),
            catchError((error: any) => {
                this.loadingService.loading.next(false)
                return throwError(() => new Error(error))
            }),
            finalize(() => this.loadingService.loading.next(false)))
    }

    convertDateToISOFormat(searchTerm: TicketMasterApiSearchTerm): TicketMasterApiSearchTerm {
        const dateFields = ['startDateTime', 'endDateTime'];
        const isoSearchTerm: any = {...searchTerm}
        for (const field of dateFields) {
            if (isoSearchTerm[field]) {
                isoSearchTerm[field] = new Date(isoSearchTerm[field] as string).toISOString().slice(0,19) + 'Z'
            }
        }
        return isoSearchTerm
    }




    
    
}