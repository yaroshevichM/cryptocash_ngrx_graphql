import { IAppState } from "../appState";
import {createSelector} from "@ngrx/store"
import { IUserState } from "../states/user.state";

const selectUser = (state: IAppState) => state.user;

export const selectUserInner = createSelector(
   selectUser,
   (state: IUserState) => state
);