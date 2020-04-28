import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {
  @Output() trainingExit = new EventEmitter<void>();
  progress = 0;
  timerId: number;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  private startOrResumeTimer() {
    this.timerId = setInterval(() => {
      this.progress += 5;
      if (this.progress >= 100) {
        clearInterval(this.timerId);
      }
    }, 1000);
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
        this.trainingExit.emit();
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
