import { Exercise } from './exercise.model';
import { AppState } from '../app.reducer';
import { SET_AVAILABLE_TRAININGS, SET_PAST_TRAININGS, START_TRAINING, STOP_TRAINING, TrainingActions } from './training.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface TrainingState {
  availableExercises: Exercise[];
  pastExercises: Exercise[];
  activeTraining: Exercise;
}

export interface EnrichedAppState extends AppState {
  trainings: TrainingState;
}

const initialState: TrainingState = {
  availableExercises: [],
  pastExercises: [],
  activeTraining: null
};

export function trainingReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case SET_AVAILABLE_TRAININGS:
      return {
        ...state,
        availableExercises: action.payload
      };
    case SET_PAST_TRAININGS:
      return {
        ...state,
        pastExercises: action.payload
      };
    case START_TRAINING:
      return {
        ...state,
        activeTraining: {...state.availableExercises.find(ex => ex.id === action.selectedId)}
      };
    case STOP_TRAINING:
      return {
        ...state,
        activeTraining: null
      };
    default:
      return state;
  }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const getPastExercises = createSelector(getTrainingState, (state: TrainingState) => state.pastExercises);
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);
export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining != null);

