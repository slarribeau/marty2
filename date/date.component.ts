import { Input, Component, OnInit, Output, EventEmitter } from '@angular/core';
import {DateUtilitiesService} from '../date-utilities.service'
import {ViewEncapsulation} from '@angular/core'

@Component({
  selector: 'app-date',
  template: `
    <p>
          <mat-form-field id="this-feels-hacky-and-wrong">
          <input class="myDatePicker" matInput [matDatepicker]="picker" [(ngModel)]="myDateObject"  (dateChange)="sendEvent($event)" placeholder="">
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker>  </mat-datepicker>
      </mat-form-field> 
    </p>
  `,
  styles: [
    `
    #this-feels-hacky-and-wrong {
      top:-30px;
    }

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
    //this.myDateObject=this.dateUtil.getPrevDayObject(new Date());
    this.myDateObject = new Date(2018, 3, 26);

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

  sendEvent(event){ 
    console.log("Date.component: send event received: " + event.value)
    let dateString = this.dateUtil.dateObject2String(event.value);
    console.log("Date.component: about to emit" + dateString);
    this.childEvent.emit(dateString);
  }

}
