import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import {StandingsComponent} from './standings/standings.component';
import { Test2Component } from './test2/test2.component';
import { MlbRepoService} from './mlb-repo.service'
import { DateComponent} from './date/date.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatFormFieldModule, MatNativeDateModule, MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule } from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import {DateUtilitiesService} from './date-utilities.service'
import { FilterPipe} from './filter.pipe';
import { DivisionFilterPipe} from './division.filter.pipe';
import { LeagueFilterPipe} from './league.filter.pipe';




@NgModule({
  declarations: [
    AppComponent,
    StandingsComponent,
    Test2Component,
    DateComponent,
    FilterPipe,
    DivisionFilterPipe,
    LeagueFilterPipe
  ],
  imports: [
   BrowserModule,
   FormsModule,
   AppRoutingModule,
   BrowserAnimationsModule,
   MatDatepickerModule, MatNativeDateModule, MatInputModule,
   MatFormFieldModule, MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule
  ],
  providers: [MlbRepoService, DateUtilitiesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
