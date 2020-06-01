import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrainingService } from './training.service';
import { Store } from '@ngrx/store';
import { EnrichedAppState, getIsTraining } from './training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  ongoingTraining: Observable<boolean>;

  constructor(private trainingService: TrainingService, private store: Store<EnrichedAppState>) {
  }

  ngOnInit(): void {
    this.ongoingTraining = this.store.select(getIsTraining);
  }

}
