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
    this.router.navigateByUrl('/subscriptionss/1/'+date);
    //this.router.navigate(['/', 'red-pill']);
    this.router.navigate([{ outlets: {
      sidebar: ['subscriptionss', '1', '2018-4-26']
    }}]);
  }
}

