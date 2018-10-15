import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';


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
  }

  decrDate(){
    console.log("dec function called");
  }

}

