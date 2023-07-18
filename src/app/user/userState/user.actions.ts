import { createAction,props } from "@ngrx/store";
import { User } from "./user.interface";

export const invokeUserApi = createAction('[user API] Invoke API ')
export const FetchUserAPI = createAction('[user API] fetch api success',    props<{User:User}>())
