import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { TicketMasterQueryService } from "./ticketmaster-query.service"
import { TicketMasterApiSearchTerm } from "src/app/components/search/search.types"
import { TestBed, fakeAsync, tick } from "@angular/core/testing"
import { SharedModule } from "../../shared.module"
import { TicketMasterApiService } from "../api/ticketmaster-api.service"
import { environment } from "src/environments/environment"
import { mockEventList } from "src/app/components/list/list.types"
import { Observable, of } from "rxjs"
import { TicketMasterEventList } from "src/app/misc/event.types"
import { Injectable } from "@angular/core"

@Injectable()
class MockTicketMasterApiService {
    BASEURL = 'https://app.ticketmaster.com/discovery/v2/events?';

    get(searchTerm: TicketMasterApiSearchTerm): Observable<TicketMasterEventList> {
      return of(mockEventList);
    }
}

describe('TicketMasterQueryApiService', () => {
    let service: TicketMasterQueryService
    let apiService: MockTicketMasterApiService
    let httpMock: HttpTestingController
    
    const searchTerm: TicketMasterApiSearchTerm = {
        city: 'Adelaide',
        startDateTime: 'startDate',
        endDateTime: 'endDate'
    }
    const BASEURL = 'https://app.ticketmaster.com/discovery/v2/events?'

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, HttpClientTestingModule],
            providers: [TicketMasterQueryService, {provide: TicketMasterApiService, useClass: MockTicketMasterApiService}]
        })
        service = TestBed.inject(TicketMasterQueryService)
        apiService = TestBed.inject(TicketMasterApiService)
        httpMock = TestBed.inject(HttpTestingController)
    })

    afterEach(() => {
        httpMock.verify()
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    describe('getEvents()', () => {
        it('method should exist', () => {
            expect(service.getEvents).toBeTruthy()
        })

        it('should make a call to TicketMasterApiService.get()', () => {
            let apiServiceSpy = spyOn(apiService, 'get').and.returnValue(of(mockEventList))
            service.getEvents({} as any)
            expect(apiServiceSpy).toHaveBeenCalled()
        })

        it('should return 5 events from the api call', (done) => {
            service.getEvents({} as any).subscribe(({events}) => {
                expect(events.length).toBe(5)
                done()
            })
        })

        it('should populate responseEvents$ with api call response', (done) => {
            spyOn(apiService, 'get').and.returnValue(of(mockEventList))
            service.getEvents(searchTerm).subscribe()
            service.responseEvents$.subscribe(({events}) => {
                expect(events.length).toBe(5)
                done()
            })
        })

        it('should store searchTerm as previous if one is provided', (done) => {
            service.getEvents(searchTerm)
            service.previousSearchTerm$.subscribe((values) => {
                expect(values).toEqual(searchTerm)
                done()
            })
        })

        it('should make a call to convertDateToISOFormat with the previousTerm Vavlues', () => {
            service.getEvents(searchTerm)
        })
    })

})