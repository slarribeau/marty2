import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StandingsComponent} from './standings/standings.component';
import {Test2Component} from './test2/test2.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', redirectTo: '/subscriptions/AL/EAST/2018-4-26(sidebar:subscriptionss/AL/EAST/2018-4-26)', pathMatch: 'full'},
  { path: 'subscriptions', component: Test2Component },
  { path: 'subscriptions/:league/:division/:date', component: StandingsComponent},
  { path: 'subscriptionss/:league/:division/:date', component: StandingsComponent, outlet: 'sidebar' },
  { path: 'metrics', component: Test2Component},
  { path: '**', component: Test2Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
