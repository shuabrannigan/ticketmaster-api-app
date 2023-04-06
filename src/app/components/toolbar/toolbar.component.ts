import { Component, Input } from '@angular/core';

interface IToolbar {
  title: string
  filterState: boolean
  toggleFilterState(): void
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements IToolbar {
  @Input() title: string = ''
  filterState = false

  toggleFilterState(): void {
    this.filterState = !this.filterState
  }
}
