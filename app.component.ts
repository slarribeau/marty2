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
  currentLeagueLeft;
  currentLeagueRight;
  currentDivisionLeft;
  currentDivisionRight;


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
  }
  

  constructor(private router: Router) { }

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
    this.child.incr();
  }

  decrDate(){
    console.log("dec function called");
    this.child.decr();
  }

  setStyle(e, which) {
    let date = this.child.getDate()
    let x = '/left/'+this.currentLeagueLeft+'/'+this.currentDivisionLeft+'/'+date;
    x = x +'(sidebar:'+'right/'+this.currentLeagueRight+'/'+this.currentDivisionRight+'/'+date+')';
    console.log(e);
    console.log(x);
    this.router.navigateByUrl(x);
  }
/*
  setStyle(e, which) {
    //document.documentElement.style.setProperty(which, e);
    console.log(which);
    console.log(e);
  }
*/
}

