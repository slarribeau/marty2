import { Input, Component, OnInit, Output, EventEmitter } from '@angular/core';
import {DateUtilitiesService} from '../date-utilities.service'
import {ViewEncapsulation} from '@angular/core'

@Component({
  selector: 'app-date',
  template: `
    <p>
          <mat-form-field style="color:grey" id="position-top">
          <input class="myDatePicker" 
                 [min]="this.minDate"
                 [max]="this.maxDate"
                 matInput [matDatepicker]="picker" 
                 [(ngModel)]="myDateObject"  
                 (dateChange)="sendEvent($event)" 
                 placeholder="Choose a date...">
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker>  </mat-datepicker>
      </mat-form-field> 
    </p>
  `,
  styleUrls: ['../app.component.css']
})
export class DateComponent implements OnInit {
  myDateObject: Date;
  minDate: Date;
  maxDate: Date;

  @Output() public childEvent = new EventEmitter();
  constructor(private dateUtil: DateUtilitiesService) { }

  ngOnInit() {
    //Note that "myDateObject" is presented in the DatePicker Component's HTML
    //this.myDateObject=this.dateUtil.getPrevDayObject(new Date());
    this.myDateObject = new Date(2018, 8, 30);
    this.minDate = new Date(2018,2,29);
    this.maxDate = new Date(2018,8,30);
    console.log("Date.component: ngOnInit" + this.myDateObject)
  }

  decr(edge) {
    let myDateObjectTmp=this.dateUtil.getPrevDayObject(this.myDateObject);

    if (myDateObjectTmp >= edge) { //Don't decrement past beg of season.
      this.myDateObject=myDateObjectTmp;
      let dateString = this.dateUtil.dateObject2String(this.myDateObject);
      console.log("Date.component: about to emit" + dateString);
      this.childEvent.emit(dateString);
      return true;
    }
    return false;
  }

  incr(edge) {
    let myDateObjectTmp=this.dateUtil.getNextDayObject(this.myDateObject);

    if (myDateObjectTmp <= edge) { //Dont increment past end of season.
      this.myDateObject = myDateObjectTmp;
      let dateString = this.dateUtil.dateObject2String(this.myDateObject);
      console.log("Date.component: about to emit" + dateString);
      this.childEvent.emit(dateString);
      return true;
    }
    return false;
  }

  setDate(date) {
    console.log("setDate");
    this.myDateObject = date;
    let dateString = this.dateUtil.dateObject2String(this.myDateObject);
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
