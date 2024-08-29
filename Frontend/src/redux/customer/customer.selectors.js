//Author: Mikias hailu and yared tsgie
import { createSelector } from "reselect";

const userSelector = (state) => state.user;
//customer token
export const selectCurrentUser = createSelector(
  [userSelector],
  (user) => user.currentUser
);
//customer token
export const selectUserToken = createSelector(
  [userSelector],
  (user) => user.token
);
//customer token
export const selectAuthError = createSelector(
  [userSelector],
  (user) => user.error
);

