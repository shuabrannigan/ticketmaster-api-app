import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, filter, map } from "rxjs";
import { TicketMasterEventList } from "src/app/misc/event.types";
import { environment } from "src/environments/environment";

@Injectable()
export class TicketMasterInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const apikey = environment.ticketMasterApiKey
        if (req.url.includes('ticketmaster')) {

            const requestWithAPIKEY = req.clone({setParams: {apikey}})
            return next.handle(requestWithAPIKEY).pipe(map((response: any) => {
                if (response.body) {
                    let hydratedBody = hydrateResponse(response.body)
                    response = response.clone({body: hydratedBody})
                }
                return response
            }))
        }
       return next.handle(req)
    }
}

function hydrateResponse(response: any): TicketMasterEventList {
    const events = 
    response?._embedded?.events?.map(
        ({
          name = '',
          id,
          images = [],
          url = '',
          _embedded = {},
          dates = {},
        }: any) => ({
          name,
          id,
          imageUrl: images[0]?.url || '',
          url,
          venueName: _embedded?.venues?.[0]?.name || '',
          startDate: dates.start?.localDate || '',
          endDate: dates.end?.localDate || dates.start?.localDate || '',
        })
      ) || [];

      const concertEventList: TicketMasterEventList = {
        page: response?.page || null,
        events,
      };
  
      return concertEventList
}