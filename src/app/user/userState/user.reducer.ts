import { FetchUserAPI } from './user.actions';
import {createReducer, on,StoreModule } from '@ngrx/store'
import { User } from './user.interface';


export const initialState:User={
    _id: "",
    name: "",
    email: "",
    password: "",
    Image:"",

}

const _UserReducer = createReducer(
    initialState,
    on(FetchUserAPI,(state,{User})=>{
        return User
    })

)

export function UserReducer(state:any,action:any){
    return _UserReducer(state,action)
    
}