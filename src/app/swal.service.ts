import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  confirmBlock(): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, !'
    }).then((result) => result);
  }
  showSuccessMessage(title: string, message: string): void {
    Swal.fire({
      icon: 'success',
      title,
      text: message
    });
  }
  showErrorMessage(title: string, message: string): void {
    Swal.fire({
      icon: 'error',
      title,
      text: message
    });
  }
}
