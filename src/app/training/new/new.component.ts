import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { getIsLoading } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { EnrichedAppState, getAvailableExercises } from '../training.reducer';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  availableExercises: Observable<Exercise[]>;
  isLoading: Observable<boolean>;

  constructor(private trainingService: TrainingService, private store: Store<EnrichedAppState>) {
  }

  ngOnInit(): void {
    this.fetchAvailableExercises();
    this.isLoading = this.store.select(getIsLoading);
    this.availableExercises = this.store.select(getAvailableExercises);
  }

  onTrainingStart(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  fetchAvailableExercises() {
    this.trainingService.fetchAvailableExercises();
  }
}
