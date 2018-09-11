import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DebugElement} from '@angular/core'
import { DateComponent } from './date.component';
import {DateUtilitiesService} from '../date-utilities.service'
import { MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule} from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms'

import {newEvent} from '../testing';
import { By }                 from '@angular/platform-browser';
import { FilterPipe} from '../filter.pipe';

describe('DateComponent when tested directly', () => {

    //https://angular.io/guide/testing#triggereventhandler
    //See dashboard-hero-component.spec.ts
    //See dashboard/dashboard.component.spec.ts

    //We will want to trigger a 'dateChange' event
    //One test will simply send a pre defined date object
    //Another test will pick a date from the picker and makes sure that it is sent

  let comp: DateComponent;
  let fixture: ComponentFixture<DateComponent>;
  let heroDe: DebugElement;
  let heroEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DateComponent, 
        FilterPipe],
      providers : [DateUtilitiesService],
      imports: [BrowserAnimationsModule, 
        MatInputModule, 
        MatFormFieldModule, 
        MatNativeDateModule, 
        FormsModule, 
        MatDatepickerModule]
  })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateComponent);
    comp    = fixture.componentInstance;

    // find the hero's DebugElement and element
    heroDe  = fixture.debugElement.query(By.css('.myDatePicker'));
    heroEl = heroDe.nativeElement;

    // trigger initial data binding
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('should raise selected event when clicked (triggerEventHandler) -- make sure runs with $ ng test -sm=false -- else you get XMLHttpRequest error', () => {
    let myDate : Date = new Date("January 1, 2019");
    let obj = {"value" : myDate};

    spyOn(comp.childEvent, 'emit');
    heroDe.triggerEventHandler('dateChange', obj);
    expect(comp.childEvent.emit).toHaveBeenCalledWith('2019-1-1');
  });

  it('Change date and validate it is contained in triggered event', () => {
    const hostElement = fixture.nativeElement;
    const nameInput: HTMLInputElement = hostElement.querySelector('input')

    nameInput.value = 'Tue Jan 1 2019 12:55:44 GMT-0700 (Pacific Daylight Time';

    nameInput.dispatchEvent(newEvent('input')); 

    fixture.detectChanges();
    let myDate : Date = new Date(nameInput.value);
  let obj = {"value" : comp.myDateObject/*myDate*/};

    spyOn(comp.childEvent, 'emit');
    heroDe.triggerEventHandler('dateChange', obj);
    expect(comp.childEvent.emit).toHaveBeenCalledWith('2019-1-1');

  })
  
/*
    it('should raise selected event when clicked (element.click)', () => {
      let selectedHero: Hero;
      comp.selected.subscribe((hero: Hero) => selectedHero = hero);

      heroEl.click();
      expect(selectedHero).toBe(expectedHero);
    });

  it('should raise selected event when clicked (click helper)', () => {
    let selectedHero: Hero;
    comp.selected.subscribe(hero => selectedHero = hero);

    click(heroDe); // click helper with DebugElement
    click(heroEl); // click helper with native element

    expect(selectedHero).toBe(expectedHero);
  });
  */
});

