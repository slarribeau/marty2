import { Injectable } from '@angular/core';

@Injectable()

export class DateUtilitiesService {

  constructor() { }

  public getPrevDayObject(inDate: Date) : Date {
    console.log("date-utilities.service getPrevDayObject()");
    let myDate = new Date(inDate);
    let dateOffset = (24*60*60*1000) * 1; //1 days
    myDate.setTime(myDate.getTime() - dateOffset);
    return myDate;
  }

  public getNextDayObject(inDate: Date) : Date {
    console.log("date-utilities.service getNextDayObject()");
    let myDate = new Date(inDate);
    let dateOffset = (24*60*60*1000) * 1; //1 days
    myDate.setTime(myDate.getTime() + dateOffset);
    return myDate;
  }
  
  public dateObject2String(date: Date) : String {
    console.log("date-utilities.service dateObject2String()");
    let dateString = date.getFullYear() + "-";
    dateString += date.getMonth()+1 + "-";
    dateString += date.getDate();
    return dateString;
  }

  public getPrevDayString(inDate :Date) : String {
    console.log("date-utilities.service getPrevDayString()");
    let myDate = new Date(inDate);
    let dateOffset = (24*60*60*1000) * 1; //1 days
    myDate.setTime(myDate.getTime() - dateOffset);

    let returnDate: String;
    returnDate = myDate.getFullYear() + "-";
    returnDate += myDate.getMonth()+1 + "-";
    returnDate += myDate.getDate().toString(); 
    return returnDate;
  }

}
