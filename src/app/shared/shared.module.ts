import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TicketMasterApiService } from './services/api/ticketmaster-api.service';
import { TicketMasterQueryService } from './services/other/ticketmaster-query.service';
import { LoadingService } from './services/other/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TicketMasterInterceptor } from "./services/interceptors/ticketmaster-interceptor.service";

const MaterialModules = [
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModules,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    MaterialModules,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    TicketMasterApiService,
    TicketMasterQueryService,
    LoadingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TicketMasterInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule {}