import { Component, OnInit } from '@angular/core';
import {MlbRepoService} from '../mlb-repo.service';
import {ActivatedRoute, Router, Route, ParamMap} from '@angular/router';

//https://www.dropbox.com/sh/0sankm6febsfogp/AAB1p-aVJnoReeclPZdv6jYua/Raw%20Icons%20-%20AL?dl=0
//http://resizeimage.net/


@Component({
  selector: 'app-test',
  template: `
    <table>
      <tr> 
        <th></th>
        <th>Team</th>
        <th style="text-align:right">W</th>
        <th style="text-align:right">L</th>
        <th>PCT</th>
        <th>GB</th>

      </tr>
      <!-- <tr *ngFor="let standing of standings | divisionFilter:(division) | filter:(date)">  -->
      <tr *ngFor="let standing of standings | leagueFilter:(league) | divisionFilter:(division) | filter:(date)">

    
        <td> 
          <img src="assets/icon.png" alt="some text" width=16 height=16 style="float:left;">
        </td>
        <td style="width:50px;  ">{{standing.Team}}  </td>
        <td style="width:150px; ">{{standing.W}} </td>
        <td style="width:100px; ">{{standing.L}}</td>
        <td style="width:200px; ">{{standing.PCT}}</td>
        <td style="width:200px; ">{{standing.GB}}</td>
      </tr>
    </table>
    <div *ngIf="(standings | leagueFilter:(league) | divisionFilter:(division) | filter:(date)).length === 0">
    "No Data Displayed -- No Scores Reported For This Date"
    </div>
  `,
  styles:[
    `
    td {
      border: 1px solid #ddd;
      padding: 8px;
    }
    th {
      background-color: #0097a7ff; /* clr 2 header */
      border: 1px solid #ddd;
      padding: 8px;
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: center;
      color: white;
    }
    
    tr:nth-child(even) {
      background-color: rgba(250, 217, 179, 0.856); /* clr 2 odd row */
    }  
    
    tr:hover {
      background-color: #ddd;
    }
    
    tr {
      background-color: rgba(250, 217, 179, 0.856); /* clr 2 even row */
    }
    
    table {
      margin: 0 auto;
      border-collapse: collapse;
      width: 100%;
    }
    `
  ]
})
export class StandingsComponent implements OnInit {
  public standings = [];
  public league; //LEAGUE
  public division; //DIVISION
  public date; //DATE


  constructor(private _MlbRepoService: MlbRepoService, private route: ActivatedRoute) { 
     console.log("standings.component: constructor");
  }

  ngOnInit() {
    console.log("standings.component: ngOnInit");
    this.standings = this._MlbRepoService.getStandings();
    console.log("standings.component: ngOnInit: " + (this.route.snapshot.paramMap.get('league')));
    console.log("standings.component: ngOnInit: " + (this.route.snapshot.paramMap.get('division')));
    console.log("standings.component: ngOnInit: " + (this.route.snapshot.paramMap.get('date')));

    this.route.paramMap.subscribe((params:ParamMap) => {
      let league = params.get('league');
      let division = params.get('division');
      let date = params.get('date');
      this.league = league;
      this.division = division;
      this.date = date;
      console.log("standings.component: subscribe " + league + division + date);
    });

  }

}
