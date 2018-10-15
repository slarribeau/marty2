import { Injectable } from '@angular/core';

@Injectable()

export class DateUtilitiesService {

  constructor() { }

  public getPrevDayObject(inDate: Date) : Date {
    let myDate = new Date(inDate);
    let dateOffset = (24*60*60*1000) * 1; //1 days
    myDate.setTime(myDate.getTime() - dateOffset);
    return myDate;
  }

  public getNextDayObject(inDate: Date) : Date {
    let myDate = new Date(inDate);
    let dateOffset = (24*60*60*1000) * 1; //1 days
    myDate.setTime(myDate.getTime() + dateOffset);
    return myDate;
  }
  
  public dateObject2String(date: Date) : String {
    let dateString = date.getFullYear() + "-";
    dateString += date.getMonth()+1 + "-";
    dateString += date.getDate();
    return dateString;
  }

  public getPrevDayString(inDate :Date) : String {
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
