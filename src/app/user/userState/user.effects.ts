import { User } from './user.interface';
import { map, switchMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from "@angular/core";
import { UserServiceService } from '../user.service.service';
import { FetchUserAPI, invokeUserApi } from './user.actions';

@Injectable()
export class UserEffects {
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeUserApi),
      switchMap(() =>
        this.userService.getUser().pipe(
          map(data => FetchUserAPI({ User: data }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserServiceService
  ) {}
}