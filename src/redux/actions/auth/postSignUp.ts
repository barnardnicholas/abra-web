import { createAction } from '@reduxjs/toolkit';
// import { APIError } from '../../../types/APIError';
import { AppDispatch } from '../../store';

export const postSignUpRequest = createAction('postSignUpRequest');
export const postSignUpSuccess = createAction('postSignUpSuccess');
export const postSignUpFailure = createAction('postSignUpFailure');

export const postSignUp = (postBody: any) => async (dispatch: AppDispatch) => {
  dispatch(postSignUpRequest());
  try {
    // await api.post('auth/register', postBody);
    // return dispatch(postSignUpSuccess());
  } catch (e) {
    // handleApiErrors(dispatch, postSignUpFailure, e as APIError);
  }
};
