import { OnInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {DateComponent} from './date/date.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  types;
  order;
  value;

  fontChoices = [
    {
      label: 'Trebuchet',
      value: "'Trebuchet MS', 'Helvetica Neue', Arial, sans-serif"
    },
    {
      label: 'Georgia',
      value: 'Georgia, times, serif'
    }
 ];

  
  ngOnInit() {
  }
  
  callType(value){
    console.log(value);
    this.order.type=value;
  }
  
  onSubmit() {
    console.log(this.order);
  }

  constructor(private router: Router) { 
    this.types = [ 'type1', 'type2', 'type3' ];
    this.order = {
      type: 'type1',
      name: 'some name'
    };
  }

  @ViewChild(DateComponent) child: DateComponent;


  processChildEvent(date) {
    console.log("processChildEvent " + date);
    //this.router.navigateByUrl('/subscriptions/1/'+date);
    //this.router.navigate([{ outlets: {
    //  sidebar: ['subscriptionss', '1', '2018-4-26']
    //}}]);
    let x = '/subscriptions/AL/EAST/'+date+'(sidebar:'+'subscriptionss/AL/EAST/'+date+')';
    console.log(x);
    this.router.navigateByUrl(x);
  }

  incrDate(){
    console.log("inc function called");
    this.child.incr();
  }

  decrDate(){
    console.log("dec function called");
    this.child.decr();
  }

  myFunction(y) {
    let x = document.getElementById("mySelect");
    console.log(event.target);
  }

  setStyle(e, which) {
    //document.documentElement.style.setProperty(which, e);
    console.log(which);
    console.log(e);
  }

}

