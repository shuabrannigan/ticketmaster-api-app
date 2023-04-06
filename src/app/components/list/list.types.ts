import { Observable } from "rxjs";

export interface IListComponent {
    list$: Observable<unknown>
    loading$: Observable<boolean>
}