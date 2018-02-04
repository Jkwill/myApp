import { Component } from '@angular/core';
import { NavParams,ToastController} from 'ionic-angular';
import { AccountService} from "../../services/httpService/account.service"
import { HttpRequestService} from "../../services/httpService/httpRequest.service"

@Component({
  selector: 'page-personalInfo',
  templateUrl: 'personalInfo.html'
})
export class PersonalInfoPage {
  userInfo;
  password:string="";
  confirmPassword:string="";
  constructor(public accountService:AccountService,
              public httpRequestService:HttpRequestService,
              public toastCtrl:ToastController,
              public navParams: NavParams) {
    this.userInfo=this.navParams.data;
  }
  change(){
    if(this.password!=this.confirmPassword){
      this.toastCtrl.create({
        message: '两次输入密码不一致',
        duration: 2000,
        position: 'middle'
      }).present();
    }else{
      let paramObj={
        email:this.userInfo.email,
        telephone:this.userInfo.phone,
        address:this.userInfo.address,
        introduction:this.userInfo.introduction,
        password:this.password,
        confirmPassword:this.confirmPassword
      }
      this.accountService.saveAccount(this.httpRequestService.serialize(paramObj)).subscribe(res=>{
        if(res.result="success"){
          this.toastCtrl.create({
            message: '修改成功',
            duration: 2000,
            position: 'middle'
          }).present();
        }
      },error=>{
        console.log("error:"+error);
      });
    }
  }

}
