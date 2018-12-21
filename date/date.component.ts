import { Input, Component, OnInit, Output, EventEmitter } from '@angular/core';
import {DateUtilitiesService} from '../date-utilities.service'
import {ViewEncapsulation} from '@angular/core'

@Component({
  selector: 'app-date',
  template: `
    <p>
          <mat-form-field style="color:grey" id="position-top">
          <input class="myDatePicker" matInput [matDatepicker]="picker" [(ngModel)]="myDateObject"  (dateChange)="sendEvent($event)" placeholder="">
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker>  </mat-datepicker>
      </mat-form-field> 
    </p>
  `,
  styles: [
    `
    #position-top {
      /* This is needed so that the datepicker is near the top of its container div */
      top:-30px;
    }

    .mat-form-field {
      float: left;
    }

    /* Clear floats (clearfix hack) - This is needed so the right button is next to datepicker */
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
    //this.myDateObject=this.dateUtil.getPrevDayObject(new Date());
    this.myDateObject = new Date(2018, 8, 30);

    console.log("Date.component: ngOnInit" + this.myDateObject)
  }

  decr() {
    this.myDateObject=this.dateUtil.getPrevDayObject(this.myDateObject);
    let dateString = this.dateUtil.dateObject2String(this.myDateObject);
    console.log("Date.component: about to emit" + dateString);
    this.childEvent.emit(dateString);
  }

  incr() {
    this.myDateObject=this.dateUtil.getNextDayObject(this.myDateObject);
    let dateString = this.dateUtil.dateObject2String(this.myDateObject);
    console.log("Date.component: about to emit" + dateString);
    this.childEvent.emit(dateString);
  }

  setDate(date) {
    this.myDateObject = new Date(date);
    let dateString = this.dateUtil.dateObject2String(this.myDateObject);
    console.log(dateString);
    this.childEvent.emit(dateString);
  }

  getDate() {
    return this.dateUtil.dateObject2String(this.myDateObject);
  }

  sendEvent(event){ 
    console.log("Date.component: send event received: " + event.value)
    let dateString = this.dateUtil.dateObject2String(event.value);
    console.log("Date.component: about to emit" + dateString);
    this.childEvent.emit(dateString);
  }
}
