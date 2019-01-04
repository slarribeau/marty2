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
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
          // Show loading indicator        
            console.log("Start loading");
            console.log(event);

      }

      if (event instanceof NavigationEnd) {
          // Hide loading indicator
          console.log("Done loading");
          console.log(event);
          let url = event.url;
          //Before: left/AL/EAST/2018-9-20(sidebar:right/AL/EAST/2018-9-29)
          //Remove first 14 characters
          //After: 2018-9-20(sidebar:right/AL/EAST/2018-9-29
          let leftDate = url.slice(14, url.length)
          console.log("Left date = " + leftDate);

          //Remove left paren and everything after
          leftDate = leftDate.substring(0, leftDate.indexOf('('));
          console.log("Left date = " + leftDate);


          let rightDate = url.split("right").pop();
          console.log("Right date = " + rightDate);
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
    console.log("processChildEvent " + date);
    //this.router.navigateByUrl('/left/1/'+date);
    //this.router.navigate([{ outlets: {
    //  sidebar: ['right', '1', '2018-4-26']
    //}}]);
    let x = '/left/'+this.currentLeagueLeft+'/'+this.currentDivisionLeft+'/'+date;
    x = x +'(sidebar:'+'right/'+this.currentLeagueRight+'/'+this.currentDivisionRight+'/'+date+')';
    console.log(x);
    this.router.navigateByUrl(x);
  }

  incrDate(){
    console.log("inc function called");
    if (this.child.incr(this.endOfSeason) == false) {
       alert("Cannott go past end of season")
    }
  }

  decrDate(){
    console.log("dec function called");
    if (this.child.decr(this.startOfSeason) == false) {
      alert("Cannot go past beginning of season")
    }  
  }

  seasonStartDate(){
    this.child.setDate(this.startOfSeason);
  }

  seasonEndDate(){
    this.child.setDate(this.endOfSeason);
  }


  setStyle(e, which) {
    let date = this.child.getDate()
    let x = '/left/'+this.currentLeagueLeft+'/'+this.currentDivisionLeft+'/'+date;
    x = x +'(sidebar:'+'right/'+this.currentLeagueRight+'/'+this.currentDivisionRight+'/'+date+')';
    console.log(e);
    console.log(x);
    this.router.navigateByUrl(x);
  }
}

