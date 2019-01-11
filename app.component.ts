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
          //De Construct URL
          let deConstructedUrl = url.split("/");
          console.log(deConstructedUrl);
          //(8) ["", "left", "AL", "EAST", "2018-9-29(sidebar:right", "AL", "EAST", "2018-9-29)"]0: ""1: "left"2: "AL"3: "EAST"4: "2018-9-29(sidebar:right"5: "AL"6: "EAST"7: "2018-9-29)"
          let myLeftLeague = deConstructedUrl[2];
          let myLeftDivision = deConstructedUrl[3];  
          let myLeftDate = deConstructedUrl[4].substring(0, deConstructedUrl[4].indexOf('('));
          let myRightLeague = deConstructedUrl[5];
          let myRightDivision = deConstructedUrl[6];  
          let myRightDate = deConstructedUrl[7].substring(0, deConstructedUrl[7].indexOf(')'));
          console.log(myLeftLeague, myLeftDivision, myLeftDate, myRightLeague, myRightDivision, myRightDate);

          if (this.checkDateMatch(myLeftDate, myRightDate) == 0) {
            return;
          }
          this.checkAndSetLeftLeague(myLeftLeague);
          this.checkAndSetLeftDivision(myLeftDivision);
          this.checkAndSetDate(myLeftDate);
          this.checkAndSetRightLeague(myRightLeague);
          this.checkAndSetRightDivision(myRightDivision);
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


  checkAndSetLeftLeague(myLeftLeague){
    if (this.currentLeagueLeft != myLeftLeague) {
      this.currentLeagueLeft = myLeftLeague;
    }
  }

  checkAndSetLeftDivision(myLeftDivision) {
    if (this.currentDivisionLeft != myLeftDivision) {
    this.currentDivisionLeft = myLeftDivision;
    }
  }

  checkAndSetRightLeague(myRightLeague){
    if (this.currentLeagueRight != myRightLeague) {
      this.currentLeagueRight = myRightLeague;
    }
  }
  checkAndSetRightDivision(myRightDivision){
    if (this.currentDivisionRight != myRightDivision) {
      this.currentDivisionRight = myRightDivision;
    }
  }

  checkDateMatch(leftDate, rightDate) {
    if (leftDate != rightDate) {
      alert("Dates must match: Left Date = " + leftDate + " Right Date = " + rightDate + " Returning to home page");
      this.router.navigate(['/']);
      return 0;
    }
    return 1;
  }

  checkAndSetDate(urlDate){
    let appDate = this.child.getDate()
      if (appDate != urlDate) {
        //Dates in URL (" + leftDate + ") not matching date in app (" + appDate +")");
        //So, will update date in app from URL
        let tmp = urlDate.split("-");
        //(3) ["2018", "9", "30"]

        let yearInt = parseInt(tmp[0]);
        let monthInt = parseInt(tmp[1]) - 1;
        let dayInt = parseInt(tmp[2]);
        console.log(yearInt, monthInt, dayInt)
        this.child.setDate(new Date(yearInt, monthInt, dayInt));
  }

}
