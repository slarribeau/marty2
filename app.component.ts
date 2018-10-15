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
  ngOnInit() {
  }

  constructor(private router: Router) { }

  @ViewChild(DateComponent) child: DateComponent;


  processChildEvent(date) {
    console.log("processChildEvent " + date);
    //this.router.navigateByUrl('/subscriptions/1/'+date);
    //this.router.navigate([{ outlets: {
    //  sidebar: ['subscriptionss', '1', '2018-4-26']
    //}}]);
    let x = '/subscriptions/1/'+date+'(sidebar:'+'subscriptionss/1/'+date+')';
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

}

