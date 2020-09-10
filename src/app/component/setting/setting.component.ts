import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user/user.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { IUser } from 'src/app/interface/user';
import { MustMatch } from 'src/app/shared/component/helper/must-match';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  userForm: FormGroup;
  isRequestUser:boolean = false;
  submittedUser:boolean = false;
  preferredContact:Array<{type:string,value:number}> = [];
  userInfo:IUser;
  settingTab = {
    description : true,
    specification: false
  }
  updatePasswordForm: FormGroup;
  isRequestPassword:boolean = false;
  submittedPassword:boolean = false;
  
  verifyPassword:string = '';
  isVerify:boolean = false;
  constructor(
    private userService: UserService,
    private commonService: CommonService,
    private formBuilder: FormBuilder
  ) { 
    this.preferredContact = this.commonService.preferredContact;
  }

  ngOnInit() {
    this.passwordFormInit();
    this.userFormInit();
  }

  userFormInit(): void {
    // secondaryContact: [Number, [Validators.required, Validators.pattern("[1-9]{12}")]]
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      firstName: ['', [Validators.required]],
      middleName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      primaryContact: [Number, [Validators.required]],
      secondaryContact: [Number, [Validators.required]],
      addressLine1: ['', [Validators.required]],
      addressLine2: ['', [Validators.required]],
      addressLine3: ['', [Validators.required]],
      preferredContact: [null, [Validators.required]],
    });
  }
  
  get f() { return this.userForm.controls; }
  

  onSubmitUser() : void {
    this.submittedUser = true;
    if (this.userForm.invalid) {
        return;
    }
    this.isRequestUser = true;
    if(this.userForm.value.preferredContact == 1){
      this.userForm.value.preferredContact = this.userForm.value.primaryContact;
    } else {
      this.userForm.value.preferredContact = this.userForm.value.secondaryContact;
    }
    this.userService.updateUserInfo(this.userForm.value)
    .subscribe((res)=>{
      this.isRequestUser = false;
      this.commonService.success('Update User Info');
    }, (error) => {
      this.isRequestUser = false;
      this.commonService.error(error);
    })
  }

  getUserInfo(): void {
    this.userService.getUserInfo()
    .subscribe((res)=>{
      this.userInfo = res;
      this.updateUerForm();
    })
  }
  updateUerForm(): void {
    this.userForm.get('email').setValue(this.userInfo.email);
    this.userForm.get('firstName').setValue(this.userInfo.firstName);
    this.userForm.get('middleName').setValue(this.userInfo.middleName);
    this.userForm.get('lastName').setValue(this.userInfo.lastName);
    this.userForm.get('primaryContact').setValue(this.userInfo.primaryContact);
    this.userForm.get('secondaryContact').setValue(this.userInfo.secondaryContact);
    this.userForm.get('addressLine1').setValue(this.userInfo.addressLine1);
    this.userForm.get('addressLine2').setValue(this.userInfo.addressLine2);
    this.userForm.get('addressLine3').setValue(this.userInfo.addressLine3);
    if(this.userInfo.preferredContact === this.userInfo.primaryContact){
      this.userForm.get('preferredContact').setValue(1);
    } else {
      this.userForm.get('preferredContact').setValue(2);
    }
  }
  onTabChange(type:string): void{
    if(type == 'desc'){
      this.settingTab.description = true;
      this.settingTab.specification = false;
    }
    if(type == 'speci'){
      this.settingTab.specification = true;
     this.settingTab.description = false;
     this.getUserInfo();
   }
   }

   passwordFormInit(): void {
    this.updatePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  updatePassword(){
    this.submittedPassword = true;
    if (this.updatePasswordForm.invalid) {
        return;
    }
    this.submittedPassword = false;
    this.isRequestPassword = true;
    this.userService.updatePassword(this.updatePasswordForm.value.password).subscribe((res)=>{
      this.commonService.success('Password Update Successfully');
      this.isVerify = false;
      this.isRequestPassword = false;
      this.updatePasswordForm.get('password').setValue('');
      this.updatePasswordForm.get('confirmPassword').setValue('');
    }, (error) => {
      this.isRequestPassword = false;
      this.commonService.error(error);
    })
  }
  get p() { return this.updatePasswordForm.controls; }

  verifyPasswordC(){
    this.userService.verifyPassword(this.verifyPassword).subscribe((res)=>{
      this.commonService.success('Password verified Successfully');
      this.isVerify = true;
      this.verifyPassword = '';
    }, (error) => {
      this.isVerify = false;
      this.commonService.error(error);
    })
  }

}
