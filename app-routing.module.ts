import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StandingsComponent} from './standings/standings.component';
import {Test2Component} from './test2/test2.component';
import { AppComponent } from './app.component';
//import {AppComponent} from './app.component'


export const routes: Routes = [
  { path: '', redirectTo: '/metrics', pathMatch: 'full'},
  { path: 'subscriptions', component: Test2Component },
  { path: 'subscriptions/:league/:division:/:date', component: StandingsComponent},
  { path: 'subscriptionss/:league/:division/:date', component: StandingsComponent, outlet: 'sidebar' },
  { path: 'metrics', component: Test2Component},
  { path: '**', component: Test2Component }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})


//+  declarations: [/* Test2Component */],
//+  imports: [/* RouterModule.forRoot(routes) */],
//+  exports: [RouterModule, routes /* routes */],

export class AppRoutingModule { }
