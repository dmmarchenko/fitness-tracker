import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, OnDestroy {

  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  private pastExChangeSub: Subscription;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private trainingService: TrainingService) {
  }

  ngOnInit(): void {
    this.trainingService.fetchPastExercises();
    this.pastExChangeSub = this.trainingService.pastExercisedChanged
      .subscribe(result => {
        this.dataSource.data = result;
      });
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    if (this.pastExChangeSub) {
      this.pastExChangeSub.unsubscribe();
    }
  }
}
