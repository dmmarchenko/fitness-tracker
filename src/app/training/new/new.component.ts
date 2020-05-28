import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UiService } from '../../shared/ui.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit, OnDestroy {

  availableExercises: Exercise[];
  isLoading = true;
  private exerciseChangedSub: Subscription;
  private loadingSub: Subscription;

  constructor(private trainingService: TrainingService, private uiService: UiService) {
  }

  ngOnInit(): void {
    this.trainingService.fetchAvailableExercises();
    this.loadingSub = this.uiService.loadingStateChanged.subscribe(isLoading => this.isLoading = isLoading);
    this.exerciseChangedSub = this.trainingService.exercisedChanged.subscribe(result => {
      this.availableExercises = result;
    });
  }

  onTrainingStart(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    this.exerciseChangedSub.unsubscribe();
    this.loadingSub.unsubscribe();
  }
}
