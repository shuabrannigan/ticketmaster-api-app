import { Injectable } from "@angular/core";
import { AbstractApiService } from "./abstract-api.service";
import { HttpParams } from "@angular/common/http";
import { TicketMasterApiSearchTerm } from "src/app/components/search/search.types";
import { environment } from "src/environments/environment";

@Injectable()
export class TicketMasterApiService extends AbstractApiService {

    override BASEURL: string = 'https://app.ticketmaster.com/discovery/v2/events?'
    
    override getParams(searchTerm: TicketMasterApiSearchTerm): HttpParams {
        let params = new HttpParams()
        for (const [key, value] of Object.entries(searchTerm)) {
            if (value) {
                params = params.append(key, value)
            }
        }
        params = params.append('apikey', environment.ticketMasterApiKey)
        return params
    }

}