
import {  createSelector } from '@ngrx/store'
import { createFeatureSelector} from '@ngrx/store'
import { AppState } from './user.state'
import { User } from './user.interface'

export const userRootSelector = (state:AppState)=>state.User


    export const selectUser = createSelector(
        userRootSelector,(User:User)=>{
            return User
        }
    )
