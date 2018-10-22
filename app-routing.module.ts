import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StandingsComponent} from './standings/standings.component';
import {Test2Component} from './test2/test2.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', redirectTo: '/left/AL/EAST/2018-9-30(sidebar:right/AL/EAST/2018-9-30)', pathMatch: 'full'},
  { path: 'left', component: Test2Component },
  { path: 'left/:league/:division/:date', component: StandingsComponent},
  { path: 'right/:league/:division/:date', component: StandingsComponent, outlet: 'sidebar' },
  { path: 'metrics', component: Test2Component},
  { path: '**', component: Test2Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
