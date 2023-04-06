import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export interface ILoadingService {
    loading: BehaviorSubject<boolean>
    loading$: Observable<boolean>
}

@Injectable()
export class LoadingService implements ILoadingService {
    loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
    loading$: Observable<boolean> = this.loading.asObservable()
}