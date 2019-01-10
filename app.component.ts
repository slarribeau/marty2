import { OnInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {DateComponent} from './date/date.component';
import {Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  currentLeagueLeft;
  currentLeagueRight;
  currentDivisionLeft;
  currentDivisionRight;
  endOfSeason;
  startOfSeason;


  leagueChoices = [
    {
      label: 'American League',
      value: "AL"
    },
    {
      label: 'National League',
      value: 'NL'
    }
 ];

 divisionChoices = [
  {
    label: 'Eastern',
    value: 'EAST'
  }, 
  {
    label: 'Central',
    value: 'CENT'
  },
  {
    label: 'Western',
    value: "WEST"
  },
];
  
  ngOnInit() {
    console.log("app.component.ts: ngOnInit")
    this.currentLeagueLeft = this.leagueChoices[0].value;
    this.currentLeagueRight = this.leagueChoices[0].value;
    this.currentDivisionLeft = this.divisionChoices[0].value
    this.currentDivisionRight = this.divisionChoices[0].value
    //Be carefull passing strings to Date -- Safari is fussy
    //https://stackoverflow.com/questions/4310953/invalid-date-in-safari
    this.startOfSeason = new Date(2018, 2, 29);
    this.endOfSeason = new Date(2018, 8, 30);;
  }
  
  constructor(private router: Router) {
    console.log("app.component.ts: constructor")

    this.router.events.subscribe((event: Event) => {
      console.log("app.component.ts: SUBSCRIBE")
      console.log(event);
    
      if (event instanceof NavigationStart) {
          // Show loading indicator        
            console.log("SUBSCRIBE: Start loading");
      }

      if (event instanceof NavigationEnd) {
          // Hide loading indicator
          console.log("SUBSCRIBE: Done loading");
          let url = event.urlAfterRedirects;

          //Before: left/AL/EAST/2018-9-20(sidebar:right/AL/EAST/2018-9-29)
          //Remove first 14 characters
          //After: 2018-9-20(sidebar:right/AL/EAST/2018-9-29
          let leftDate = url.slice(14, url.length)

          //Remove left paren and everything after
          leftDate = leftDate.substring(0, leftDate.indexOf('('));
          console.log("Left date = " + leftDate);


          //Before: left/AL/EAST/2018-9-20(sidebar:right/AL/EAST/2018-9-29)
          //Remove all text up to and including string 'right
          //After: /AL/EAST/2018-9-29)
          let rightDate = url.split("right").pop();

          //Remove first 9 characters
          rightDate = rightDate.slice(9, rightDate.length)

          //Remove ending right paren 
          rightDate = rightDate.substring(0, rightDate.indexOf(')'));

          console.log("Right date = " + rightDate);

          if (leftDate != rightDate) {
            alert("This is not OK -- Dates in URL must be the same");
            this.router.navigate(['/']);
          }

          let appDate = this.child.getDate()
          if (appDate != leftDate) {
            //Dates in URL (" + leftDate + ") not matching date in app (" + appDate +")");
            //So, will update date in app from URL
            let tmp = leftDate.split("-");
            //(3) ["2018", "9", "30"]

            let yearInt = parseInt(tmp[0]);
            let monthInt = parseInt(tmp[1]) - 1;
            let dayInt = parseInt(tmp[2]);
            console.log(yearInt, monthInt, dayInt)
            this.child.setDate(new Date(yearInt, monthInt, dayInt));
          }
      }

      if (event instanceof NavigationError) {
          // Hide loading indicator

          // Present error to user
          console.log(event.error);
          console.log(event);
      }
    });

  }

  @ViewChild(DateComponent) child: DateComponent;


  processChildEvent(date) {
    console.log("app.component: processChildEvent() " + date);
    //this.router.navigateByUrl('/left/1/'+date);
    //this.router.navigate([{ outlets: {
    //  sidebar: ['right', '1', '2018-4-26']
    //}}]);
    let x = '/left/'+this.currentLeagueLeft+'/'+this.currentDivisionLeft+'/'+date;
    x = x +'(sidebar:'+'right/'+this.currentLeagueRight+'/'+this.currentDivisionRight+'/'+date+')';
    console.log("app.component: processChildEvent() will nav to " + x);
    this.router.navigateByUrl(x);
  }

  incrDate(){
    console.log("app.component: incrDate() called");
    if (this.child.incr(this.endOfSeason) == false) {
       alert("Cannot go past end of season")
    }
  }

  decrDate(){
    console.log("app.component: decrDate() called");
    if (this.child.decr(this.startOfSeason) == false) {
      alert("Cannot go past beginning of season")
    }  
  }

  seasonStartDate(){
    console.log("app.component: seasonStartDate() called");
    this.child.setDate(this.startOfSeason);
  }

  seasonEndDate(){
    console.log("app.component: seasonEndDate() called");
    this.child.setDate(this.endOfSeason);
  }


  setStyle(e, which) {
    console.log("app.component: setStyle() begin param dump");
    console.log(e);
    console.log(which);
    console.log("app.component: setStyle() end param dump");

    let date = this.child.getDate()
    let x = '/left/'+this.currentLeagueLeft+'/'+this.currentDivisionLeft+'/'+date;
    x = x +'(sidebar:'+'right/'+this.currentLeagueRight+'/'+this.currentDivisionRight+'/'+date+')';
    console.log("app.component: setStyle() about to navigate to: ", x);
    this.router.navigateByUrl(x);
  }
}

