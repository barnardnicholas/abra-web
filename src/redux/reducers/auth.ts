import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { postSignUpRequest, postSignUpSuccess, postSignUpFailure } from '../actions/auth';

interface AuthState {
  isPosting: boolean;
  postSuccess: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isPosting: false,
  postSuccess: false,
  error: null,
};

export default createReducer(initialState, {
  [postSignUpRequest.type]: handlePostRequest,
  [postSignUpSuccess.type]: handlePostSuccess,
  [postSignUpFailure.type]: handleFailure,
});

function handlePostRequest(state: AuthState) {
  state.isPosting = true;
  state.postSuccess = false;
  state.error = null;
}

function handlePostSuccess(state: AuthState) {
  state.isPosting = false;
  state.postSuccess = true;
}

function handleFailure(state: AuthState, action: PayloadAction<string>) {
  state.isPosting = false;
  state.error = action.payload;
}
