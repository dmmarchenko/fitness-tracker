import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  availableExercises: Observable<Exercise[]>;

  constructor(private trainingService: TrainingService, private firestore: AngularFirestore) {
  }

  ngOnInit(): void {
    this.availableExercises = this.firestore.collection<Exercise>('availableExercises').valueChanges();
  }

  onTrainingStart(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
