import { NgModule } from '@angular/core';
import { CurrentComponent } from './current/current.component';
import { NewComponent } from './new/new.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { StopTrainingComponent } from './current/stop-training.component';
import { TrainingComponent } from './training.component';
import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentComponent,
    NewComponent,
    PastTrainingsComponent,
    StopTrainingComponent
  ],
  imports: [
    SharedModule,
    TrainingRoutingModule
  ]
})
export class TrainingModule {

}
