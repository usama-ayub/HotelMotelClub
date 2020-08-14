import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/shared/component/helper/must-match';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  registerForm: FormGroup;
  loginForm: FormGroup;
  submittedLogin: boolean = false;
  submittedRegister: boolean = false;
  isRequestLogin: boolean = false;
  isRequestRegister: boolean = false;
  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private commonService: CommonService,
    private router: Router
    ) { }

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
    this.isRequestLogin = true;
    if (this.loginForm.invalid) {
        return;
    }
    this.authService.login(this.loginForm.value).subscribe((data)=>{
      this.isRequestLogin = false;
      localStorage.setItem('token', data.token);
      this.commonService.success('Logged In successfully');
      this.router.navigate(['/home']);
      this.authService.isAuth$.next(true);
    }, (error) => {
      this.isRequestLogin = false;
      this.commonService.error(error);
    })
  }

  onSubmitRegister() : void {
    this.submittedRegister = true;
    if (this.registerForm.invalid) {
        return;
    }
    console.log(this.registerForm)
    // this.authService.register(this.registerForm.value).subscribe((data)=>{
      
    // })
  }
  get f() { return this.registerForm.controls; }
  get l() { return this.loginForm.controls; }
}
