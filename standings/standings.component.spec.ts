import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterPipe} from '../filter.pipe';

import { StandingsComponent } from './standings.component';
import {MlbRepoService} from '../mlb-repo.service';
import {RouterTestingModule} from '@angular/router/testing'

describe('StandingsComponent', () => {
  let component: StandingsComponent;
  let fixture: ComponentFixture<StandingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandingsComponent, FilterPipe],
      providers : [MlbRepoService],
      imports : [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
