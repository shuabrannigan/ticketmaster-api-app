import { Observable } from "rxjs";
import { TicketMasterEventList } from "src/app/misc/event.types";

export interface IListComponent {
    list$: Observable<unknown>
    loading$: Observable<boolean>
    onPageChange($event: any): void
}

export const mockEventList: TicketMasterEventList = {
    events: [
        {
          id: '1',
          name: 'event one',
          url: 'test url',
          startDate: '2023-10-10',
          endDate: '2023-10-12',
          venueName: 'arena',
        },
        {
          id: '2',
          name: 'event two',
          url: 'test url',
          startDate: '2023-10-10',
          endDate: '2023-10-12',
          venueName: 'arena',
        },
        {
          id: '3',
          name: 'event three',
          url: 'test url',
          startDate: '2023-10-10',
          endDate: '2023-10-12',
          venueName: 'arena',
        },
        {
          id: '4',
          name: 'event four',
          url: 'test url',
          startDate: '2023-10-10',
          endDate: '2023-10-12',
          venueName: 'arena',
        },
        {
          id: '5',
          name: 'event five',
          url: 'test url',
          startDate: '2023-10-10',
          endDate: '2023-10-12',
          venueName: 'arena',
        },
      ],
      page: {
        size: 5,
        totalElements: 5,
        totalPages: 1,
        number: 0,
      },
}