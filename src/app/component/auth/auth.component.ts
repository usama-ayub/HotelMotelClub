import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/shared/component/helper/must-match';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  registerForm: FormGroup;
  loginForm: FormGroup;
  submittedLogin = false;
  submittedRegister = false;
  constructor(private formBuilder: FormBuilder, private auth: AuthService) { }

  ngOnInit() : void {
    this.registerFormInit();
    this.loginFormInit();
  }

  loginFormInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  registerFormInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }
  onSubmitLogin() : void {
    this.submittedLogin = true;
    if (this.loginForm.invalid) {
        return;
    }
    this.auth.login(this.loginForm.value).subscribe((res:any)=>{

    })
    console.log(this.loginForm)
  }

  onSubmitRegister() : void {
    this.submittedRegister = true;
    if (this.registerForm.invalid) {
        return;
    }
    console.log(this.registerForm)
    this.auth.register(this.registerForm.value).subscribe((res:any)=>{
      
    })
  }
  get f() { return this.registerForm.controls; }
  get l() { return this.loginForm.controls; }
}
