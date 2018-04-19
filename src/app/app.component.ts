import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {LoginPage} from "../pages/login/login";
import {TabsPage} from "../pages/tabs/tabs";
import {AccountService} from "../services/httpService/account.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = "";


  constructor(platform: Platform,statusBar: StatusBar,public splashScreen: SplashScreen,public accountService:AccountService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      this.accountService.ifLogin().subscribe(res=>{
        if(res.result="success"){
          let paramObj = {
          };
          this.accountService.weblibLoginStatus(paramObj).subscribe(res=>{
            if(res.status=="login"){
                splashScreen.hide();
                this.rootPage=TabsPage;
              }else{
                this.autoLogin();
              }
          },error=>{
              this.rootPage=LoginPage;
          })
        }else{
          this.autoLogin();
        }
      },error=>{
          this.rootPage=LoginPage;
      })
    });
  }
  autoLogin(){
    let username=localStorage.getItem("username");
    let password=localStorage.getItem("password");
    if(username!=null&&password!=null){
        let paramObj = {
        username: username,
        password:password
      };
      this.accountService.login(paramObj).subscribe(res => {
        let result:string=res.result;
        if(result=='success'){
              this.accountService.initStoreType(paramObj).subscribe(res=>{
              if(res.resule="success"){
                this.loginWeblib(res.weblibUsername,res.weblibPasswd);
              }
            },error=>{
              console.log("error: "+error);
            })
            }else{
               this.splashScreen.hide();
               this.rootPage=LoginPage;
            }
          },error=>{
            console.log("error: "+error);
          });
        }else{
          this.splashScreen.hide();
          this.rootPage=LoginPage;
        }
  }
   loginWeblib(username,password){

    let weblibLoginParam = "account="+username+"&password="+password;
    this.accountService.loginWeblib(weblibLoginParam).subscribe(res=>{
      let result=res.members;
      if(result==null){
      }else{
        let weblibSelectMemParam = "memberId="+result[0].id;
        this.accountService.weblibSelectMember(weblibSelectMemParam).subscribe(res=>{
               this.splashScreen.hide();
               this.rootPage=TabsPage;
        },error => {
          console.log("error: "+error);
        })
      }
    },error =>{
      console.log("error: "+error);
    });
  }

}
