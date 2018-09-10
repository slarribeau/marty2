import { Injectable } from '@angular/core';

@Injectable()
export class MlbRepoService {

  constructor() { }

  //http://mlb.mlb.com/mlb/standings/index.jsp?ymd=20180418#20180423
  getStandings() {
    return [
       {"League":"AL", "Divison": "EAST", "Team":"BOS", "W":18, "L":5, "PCT":.783,"GB":0, "Date":"2018-4-26"},
       {"League":"AL", "Divison": "EAST", "Team":"BLU", "W":14, "L":9, "PCT":.609,"GB":4.0, "Date":"2018-4-26"},
       {"League":"AL", "Divison": "EAST", "Team":"YAN", "W":14, "L":9, "PCT":.609,"GB":4.0, "Date":"2018-4-26"},
       {"League":"AL", "Divison": "EAST", "Team":"RAY", "W":9, "L":13, "PCT":.409,"GB":8.5, "Date":"2018-4-26"},
       {"League":"AL", "Divison": "EAST", "Team":"ORI", "W":6, "L":18, "PCT":.250,"GB":12.5, "Date":"2018-4-26"},

       {"League":"AL", "Divison": "EAST", "Team":"BOS", "W":19, "L":5, "PCT":.792,"GB":0, "Date":"2018-4-27"},
       {"League":"AL", "Divison": "EAST", "Team":"BLU", "W":15, "L":9, "PCT":.625,"GB":4.0, "Date":"2018-4-27"},
       {"League":"AL", "Divison": "EAST", "Team":"YAN", "W":14, "L":10, "PCT":.593,"GB":5.0, "Date":"2018-4-27"},
       {"League":"AL", "Divison": "EAST", "Team":"RAY", "W":10, "L":13, "PCT":.435,"GB":8.5, "Date":"2018-4-27"},
       {"League":"AL", "Divison": "EAST", "Team":"ORI", "W":6, "L":19, "PCT":.240,"GB":13.5, "Date":"2018-4-27"},
    ];
  }

}
