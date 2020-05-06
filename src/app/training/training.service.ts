import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class TrainingService {

  exerciseChanged = new Subject<Exercise>();

  private availableExercises: Exercise[] = [
    {id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
    {id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15},
    {id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18},
    {id: 'burpees', name: 'Burpees', duration: 60, calories: 8},
    {id: 'walking-high-knees', name: 'Walking high knees', duration: 60, calories: 8},
    {id: 'backward-lunges', name: 'Backward lunges', duration: 60, calories: 8},
    {id: 'jumping-jacks', name: 'Jumping Jacks', duration: 60, calories: 8}
  ];
  private exercises: Exercise[] = [
    {id: 'crunches', name: 'Crunches', duration: 30, calories: 8, state: 'completed', date: new Date()},
    {id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15, state: 'completed', date: new Date()},
    {id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18, state: 'completed', date: new Date()},
    {id: 'burpees', name: 'Burpees', duration: 60, calories: 8, state: 'completed', date: new Date()},
    {id: 'walking-high-knees', name: 'Walking high knees', duration: 60, calories: 8, state: 'completed', date: new Date()},
    {id: 'burpees', name: 'Burpees', duration: 60, calories: 8, state: 'completed', date: new Date()},
    {id: 'burpees', name: 'Burpees', duration: 60, calories: 8, state: 'completed', date: new Date()}
  ];
  private runningExercise: Exercise;


  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise() {
    this.exercises.push({...this.runningExercise, date: new Date(), state: 'completed'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'cancelled',
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100)
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return {...this.runningExercise};
  }

  getPastExercises() {
    return this.exercises.slice();
  }
}
