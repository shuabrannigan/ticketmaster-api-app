import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export interface ILoadingService {
    loading: BehaviorSubject<boolean>
    loading$: Observable<boolean>
}

const DEFAULTLOADING = false

@Injectable()
export class LoadingService implements ILoadingService {
    loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(DEFAULTLOADING)
    loading$: Observable<boolean> = this.loading.asObservable()
}