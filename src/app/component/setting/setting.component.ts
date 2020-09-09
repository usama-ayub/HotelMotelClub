import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user/user.service';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  settingTab = {
    description : true,
    specification: false
  }
  verifyPassword:string = '';
  updatePasswordPayload = {
    newPass:'',
    confirmPass:'',
    submit : false
  }
  isVerify:boolean = false;
  constructor(
    private userService: UserService,
    private commonService: CommonService,
  ) { }

  ngOnInit() {
  }

  onTabChange(type:string): void{
    if(type == 'desc'){
      this.settingTab.description = true;
      this.settingTab.specification = false;
    }
    if(type == 'speci'){
      this.settingTab.specification = true;
     this.settingTab.description = false;
   }
   }
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

  updatePassword(){
    if(this.updatePasswordPayload.newPass.length <6){
      this.updatePasswordPayload.submit = true;
      return
    }
    if(this.updatePasswordPayload.confirmPass.length <6){
      this.updatePasswordPayload.submit = true;
      return
    }
    if(this.updatePasswordPayload.newPass !== this.updatePasswordPayload.confirmPass){
      this.updatePasswordPayload.submit = true;
      return
    }
    this.updatePasswordPayload.submit = false;
    this.userService.updatePassword(this.updatePasswordPayload.newPass).subscribe((res)=>{
      this.commonService.success('Password Update Successfully');
      this.isVerify = false;
      this.updatePasswordPayload.confirmPass = ''
      this.updatePasswordPayload.newPass = '';
    }, (error) => {
      this.commonService.error(error);
    })
  }
  isValidUpdatePasswordForm(): {err:boolean, meg:string}{
    if(this.updatePasswordPayload.submit && this.updatePasswordPayload.confirmPass.length < 6){
      return {err:true,meg:'Confirm Password must be at least 6 characters'}
    }
    if(this.updatePasswordPayload.submit && (this.updatePasswordPayload.newPass !== this.updatePasswordPayload.confirmPass)){
      return {err:true,meg:'Confirm Passwords must match'}
    }
    return {err:false,meg:''}
  }
}
