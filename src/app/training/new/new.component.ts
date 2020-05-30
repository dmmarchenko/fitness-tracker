import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AppState, getIsLoading } from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit, OnDestroy {

  availableExercises: Exercise[];
  isLoading: Observable<boolean>;
  private exerciseChangedSub: Subscription;

  constructor(private trainingService: TrainingService, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.fetchAvailableExercises();
    this.isLoading = this.store.select(getIsLoading);
    this.exerciseChangedSub = this.trainingService.exercisedChanged.subscribe(result => {
      this.availableExercises = result;
    });
  }

  onTrainingStart(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    if (this.exerciseChangedSub) {
      this.exerciseChangedSub.unsubscribe();
    }
  }

  fetchAvailableExercises() {
    this.trainingService.fetchAvailableExercises();
  }
}
