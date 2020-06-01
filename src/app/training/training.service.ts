import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { firestore } from 'firebase';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import { StopLoading } from '../shared/ui.actions';
import { EnrichedAppState, getActiveTraining } from './training.reducer';
import { SetAvailableTrainings, SetPastTrainings, StartTraining, StopTraining } from './training.actions';


@Injectable({providedIn: 'root'})
export class TrainingService {

  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiService: UIService, private store: Store<EnrichedAppState>) {
  }

  fetchAvailableExercises() {
    this.fbSubs.push(this.db.collection<Exercise>('availableExercises').valueChanges()
      .subscribe(result => {
        this.store.dispatch(new StopLoading());
        this.store.dispatch(new SetAvailableTrainings(result));
      }, () => {
        this.store.dispatch(new StopLoading());
        this.uiService.showSnackBar('Fetching exercises failed, please try again', 3000);
      }));
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new StartTraining(selectedId));
  }

  completeExercise() {
    this.store.select(getActiveTraining)
      .pipe(
        take(1)
      )
      .subscribe(ex => {
        this.addDataToDatabase({...ex, date: new Date(), state: 'completed'});
        this.store.dispatch(new StopTraining());
      });
  }

  cancelExercise(progress: number) {
    this.store.select(getActiveTraining)
      .pipe(
        take(1)
      )
      .subscribe(ex => {
        this.addDataToDatabase({
          ...ex,
          date: new Date(),
          state: 'cancelled',
          duration: ex.duration * (progress / 100),
          calories: ex.calories * (progress / 100)
        });
        this.store.dispatch(new StopTraining());
      });
  }

  fetchPastExercises() {
    this.fbSubs.push(this.db.collection<Exercise>('pastExercises').valueChanges()
      .pipe(
        map(exercises => exercises.map(exercise => {
          return {
            ...exercise,
            date: (exercise.date as firestore.Timestamp).toDate()
          };
        }))
      )
      .subscribe((result: Exercise[]) => {
        this.store.dispatch(new SetPastTrainings(result));
      }));
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('pastExercises').add(exercise);
  }
}
