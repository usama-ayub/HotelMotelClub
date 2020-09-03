import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/shared/component/helper/must-match';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { Router } from '@angular/router';

enum PreferredContact {
  'Primary Contact' = '1',
  'Secondary Contact' = '2'
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submittedRegister: boolean = false;
  isRequestRegister: boolean = false;
  ePreferredContact = PreferredContact;
  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private commonService: CommonService,
    private router: Router
    ) {
      console.log(this.ePreferredContact)
     }

    ngOnInit() : void {
      this.registerFormInit();
    }
  
  
    registerFormInit(): void {
      // secondaryContact: [Number, [Validators.required, Validators.pattern("[1-9]{12}")]]
      this.registerForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        firstName: ['', [Validators.required]],
        middleName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        primaryContact: [Number, [Validators.required]],
        secondaryContact: [Number, [Validators.required]],
        addressLine1: ['', [Validators.required]],
        addressLine2: ['', [Validators.required]],
        addressLine3: ['', [Validators.required]],
        preferredContact: [null, [Validators.required]],
        confirmPassword: ['', Validators.required]
      }, {
        validator: MustMatch('password', 'confirmPassword')
      });
    }
  
    onSubmitRegister() : void {
      this.submittedRegister = true;
      if (this.registerForm.invalid) {
          return;
      }
      this.isRequestRegister = true;
      if(this.registerForm.value.preferredContact == '1'){
        this.registerForm.value.preferredContact = this.registerForm.value.primaryContact;
      } else {
        this.registerForm.value.preferredContact = this.registerForm.value.secondaryContact;
      }
      console.log(this.registerForm.value)
      this.authService.register(this.registerForm.value)
      .subscribe((res)=>{
        this.authService.login(this.registerForm.value).subscribe((data)=>{
          localStorage.setItem('token', data.token);
          localStorage.setItem('userid',data.userid.toString());
          this.isRequestRegister = false;
          this.commonService.success('Logged In successfully');
          this.router.navigate(['/home']);
          this.authService.isAuth$.next(true);
        }, (error) => {
          this.isRequestRegister = false;
          this.commonService.error(error);
        })
      }, (error) => {
        this.isRequestRegister = false;
        this.commonService.error(error);
      })
    }
    get f() { return this.registerForm.controls; }

}
