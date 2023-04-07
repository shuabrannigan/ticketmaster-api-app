import { TestBed } from "@angular/core/testing"
import { TicketMasterApiService } from "./ticketmaster-api.service"
import { SharedModule } from "../../shared.module"
import { TicketMasterApiSearchTerm } from "src/app/components/search/search.types"
import { HttpParams } from "@angular/common/http"
import { environment } from "src/environments/environment"
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { mockEventList } from "src/app/components/list/list.types"

describe('TicketMasterApiService', () => {
    let service: TicketMasterApiService
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
            providers: [TicketMasterApiService]
        })
        service = TestBed.inject(TicketMasterApiService)
        httpMock = TestBed.inject(HttpTestingController)
    })

    afterEach(() => {
        httpMock.verify()
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    it('should have ticketmaster base url', () => {
        expect(service.BASEURL).toEqual(BASEURL)
    })

    describe('getParams()', () => {
        it('method should exist', () => {
            expect(service.getParams).toBeTruthy()
        })
  
        it('should append all non-null properties of the searchterm', () => {
            const result = service.getParams(searchTerm);
            expect(result.get('city')).toBe(searchTerm.city);
            expect(result.get('startDateTime')).toBe(searchTerm.startDateTime);
            expect(result.get('endDateTime')).toBe(searchTerm.endDateTime);
        });

        it('should not append null properties of the searchterm', () => {
            const updatedSearchTerm: TicketMasterApiSearchTerm = {...searchTerm, startDateTime: null}
            const result = service.getParams(updatedSearchTerm);
            expect(result.get('city')).toBe(updatedSearchTerm.city);
            expect(result.get('startDateTime')).toBeNull();
            expect(result.get('endDateTime')).toBe(updatedSearchTerm.endDateTime);
        });
    })

    describe('get()', () => {

        it('method should exist', () => {
            expect(service.get).toBeTruthy()
        })
        
        it('should return events from the api', (done) => {
            let mockresponse = {
                _embedded: {
                    events: mockEventList.events
                },
                page: mockEventList.page

            } as any
            service.get({}).subscribe((events:any) => {
                expect(events.events.length).toBe(5)
                done()
            })
            const request = httpMock.expectOne(`${service.BASEURL}apikey=${encodeURI(environment.ticketMasterApiKey)}`)
            expect(request.request.method).toBe('GET')
            request.flush(mockresponse)
        })
    })
})