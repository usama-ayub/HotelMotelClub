import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  errorObj = {
    message: '',
    error: false
  }
  successObj = {
    message: '',
    success: false
  }
  warningObj = {
    message: '',
    warning: false
  }
  constructor() { }

  error(message:string) :void {
    this.errorObj.error = true;
    this.errorObj.message = message;
    setTimeout(()=>{
      this.errorObj.error = false;
    },2000)
  }

  success(message:string) :void {
    this.successObj.success = true;
    this.successObj.message = message;
    setTimeout(()=>{
      this.successObj.success = false;
    },2000)
  }
}
