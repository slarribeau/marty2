import { Component, OnInit } from '@angular/core';
import {MlbRepoService} from '../mlb-repo.service';
import {ActivatedRoute, Router, Route, ParamMap} from '@angular/router';

//https://www.dropbox.com/sh/0sankm6febsfogp/AAB1p-aVJnoReeclPZdv6jYua/Raw%20Icons%20-%20AL?dl=0
//http://resizeimage.net/


@Component({
  selector: 'app-test',
  template: `
    {{league}}
    {{division}}
    {{date}}

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
      <tr *ngFor="let standing of standings | divisionFilter:(division) | filter:(date)">

        <td> 
          <img src="../assets/icon.png" alt="some text" width=16 height=16 style="float:left;">
        </td>
        <td style="width:50px;  ">{{standing.Team}}  </td>
        <td style="width:150px; ">{{standing.W}} </td>
        <td style="width:100px; ">{{standing.L}}</td>
        <td style="width:200px; ">{{standing.PCT}}</td>
        <td style="width:200px; ">{{standing.GB}}</td>
      </tr>
    </table>
  `,
  styleUrls:['../app.component.css']
})
export class StandingsComponent implements OnInit {
  public standings = [];
  private league; //LEAGUE
  private division; //DIVISION
  private date; //DATE


  constructor(private _MlbRepoService: MlbRepoService, private route: ActivatedRoute) { 
     console.log("StandingsComponent: Constructor");
  }

  ngOnInit() {
    console.log("StandingsComponent: ngOnInit");
    this.standings = this._MlbRepoService.getStandings();
    console.log((this.route.snapshot.paramMap.get('league')));
    console.log((this.route.snapshot.paramMap.get('division')));
    console.log((this.route.snapshot.paramMap.get('date')));

    this.route.paramMap.subscribe((params:ParamMap) => {
      let league = params.get('league');
      let division = params.get('division');
      let date = params.get('date');
      this.league = league;
      //this.division = division; //Mysterious bug? Not set on left instantation ???
      this.division = 'EAST';

      this.date = date;
    });

  }

}
