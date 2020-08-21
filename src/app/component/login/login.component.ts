import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submittedRegister: boolean = false;
  isRequestRegister: boolean = false;
  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private commonService: CommonService,
    private router: Router
    ) { }

    ngOnInit() : void {
      this.loginFormInit();
    }
  
    loginFormInit(): void {
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }
  

    onSubmitLogin() : void {
      if (this.loginForm.invalid) {
          return;
      }
      this.authService.login(this.loginForm.value).subscribe((data)=>{
        localStorage.setItem('token', data.token);
        this.commonService.success('Logged In successfully');
        this.router.navigate(['/home']);
        this.authService.isAuth$.next(true);
      }, (error) => {
        this.commonService.error(error);
      })
    }
  

    get l() { return this.loginForm.controls; }

}
