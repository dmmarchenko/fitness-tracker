import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  @Output()
  trainingStart = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onTrainingStart() {
    this.trainingStart.emit();
  }
}
