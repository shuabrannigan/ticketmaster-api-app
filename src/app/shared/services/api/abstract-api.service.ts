import { HttpClient, HttpParams } from "@angular/common/http"
import { inject } from "@angular/core"
import { Observable } from "rxjs"

export abstract class AbstractApiService {
    abstract BASEURL: string
    http = inject(HttpClient) // this over providing in the constructor avoids having to use super()

    abstract getParams(searchTerm: any): HttpParams

    get<T>(searchTerm: any): Observable<T> {
        return this.http.get<T>(this.BASEURL, {params: this.getParams(searchTerm)})
    }
}