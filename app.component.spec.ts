import { TestBed, async } from '@angular/core/testing';
import { DateComponent} from './date/date.component'

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import {StandingsComponent} from './standings/standings.component';
import { Test2Component } from './test2/test2.component';
import { MlbRepoService} from './mlb-repo.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatFormFieldModule, MatNativeDateModule, MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule } from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import {DateUtilitiesService} from './date-utilities.service'
import { FilterPipe} from './filter.pipe';
import {APP_BASE_HREF} from '@angular/common';





describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
  declarations: [
    AppComponent, 
    StandingsComponent,
    Test2Component,
    DateComponent,
    FilterPipe
  ],
  imports: [
   BrowserModule,
   FormsModule,
   AppRoutingModule,
   BrowserAnimationsModule,
   MatDatepickerModule, MatNativeDateModule, MatInputModule,
   MatFormFieldModule, MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}, MlbRepoService, DateUtilitiesService],
  //bootstrap: [AppComponent]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    console.log("-------app.component.spec.ts");
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'my-app'`, async(() => {
    console.log("-------app.component.spec.ts -- title");
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    console.log(app.title);
    expect(app.title).toEqual('my-app');
  }));
  it('should render title in a h2 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('$$$ B');
  }));
});
