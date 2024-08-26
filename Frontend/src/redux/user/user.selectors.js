import { createSelector } from "reselect";

const userSelector = (state) => state.user;

export const selectCurrentUser = createSelector(
  [userSelector],
  (user) => user.currentUser
);

export const selectAuthError = createSelector(
  [userSelector],
  (user) => user.error
);

export const selectUserToken = createSelector(
  [userSelector],
  (user) => user.token
);
