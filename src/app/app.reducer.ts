import { getIsLoadingFun, uiReducer, UiState } from './shared/ui.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface AppState {
  ui: UiState;
}

export const reducers: ActionReducerMap<AppState> = {
  ui: uiReducer
};

export const getUiState = createFeatureSelector<UiState>('ui');

export const getIsLoading = createSelector(getUiState, getIsLoadingFun);
