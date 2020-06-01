import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';
import { Store } from '@ngrx/store';
import { EnrichedAppState, getActiveTraining } from '../training.reducer';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {
  progress = 0;
  timerId: number;

  constructor(private dialog: MatDialog, private trainingService: TrainingService, private store: Store<EnrichedAppState>) {
  }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  private startOrResumeTimer() {
    this.store.select(getActiveTraining)
      .pipe(
        take(1)
      )
      .subscribe(ex => {
        const step = ex.duration * 10;
        this.timerId = setInterval(() => {
          this.progress += 1;
          if (this.progress >= 100) {
            clearInterval(this.timerId);
            this.trainingService.completeExercise();
          }
        }, step);
      });
  }

  onStop() {
    clearInterval(this.timerId);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(isClosed => {
      if (isClosed) {
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
