import { getIsLoadingFun, uiReducer, UiState } from './shared/ui.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { authReducer, AuthState, getIsAuthFun } from './auth/auth.reducer';

export interface AppState {
  ui: UiState;
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  ui: uiReducer,
  auth: authReducer
};

export const getUiState = createFeatureSelector<UiState>('ui');
export const getIsLoading = createSelector(getUiState, getIsLoadingFun);

export const getAuthState = createFeatureSelector<AuthState>('auth');
export const getIsAuth = createSelector(getAuthState, getIsAuthFun);
