import { InputComponent } from './input/input.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';





@NgModule({
  declarations: [
    InputComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,ReactiveFormsModule
  ],exports:[
    InputComponent,
    AlertComponent
  ]
})
export class ModuleSharedModule { }
