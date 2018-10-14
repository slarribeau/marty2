import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {DateUtilitiesService} from '../date-utilities.service'
import {ViewEncapsulation} from '@angular/core'

@Component({
  selector: 'app-date',
  template: `
    <p>
       <mat-form-field>
          <input class="myDatePicker" matInput [matDatepicker]="picker" [(ngModel)]="myDateObject"  (dateChange)="sendEvent($event)" placeholder="">
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker>  </mat-datepicker>
      </mat-form-field> 
    </p>
  `,
  styles: [
    `
    .mat-form-field-wrapper {
      padding-bottom: 0.25em;
    }
  
    .mat-form-field {
      float: left;
      /*bottom: 16px; */
      /* left: 10px; */
    }

    /* Clear floats (clearfix hack) */
    .mat-form-field:after {
      content: "";
      clear: both;
      display: table;
      border: 1px solid red;
    }
    `
  ]
})
export class DateComponent implements OnInit {
  myDateObject: Date;
  @Output() public childEvent = new EventEmitter();

  constructor(private dateUtil: DateUtilitiesService) { }

  ngOnInit() {
    //Note that "myDateObject" is presented in the DatePicker Component's HTML
    this.myDateObject=this.dateUtil.getPrevDayObject(new Date());
    console.log("Date.component: ngOnInit" + this.myDateObject)
  }

  sendEvent(event){ 
    console.log("Date.component: send event received: " + event.value)
    let dateString = this.dateUtil.dateObject2String(event.value);
    console.log("Date.component: about to emit" + dateString);
    this.childEvent.emit(dateString);
  }
  
}
