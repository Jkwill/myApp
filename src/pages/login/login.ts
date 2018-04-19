import { Component } from '@angular/core';
import { ToastController,ModalController,NavController} from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { BackButtonService } from "../../services/uiService/backButton.service";
import { AccountService} from "../../services/httpService/account.service"
import { HttpRequestService} from "../../services/httpService/httpRequest.service"
import { ChangeHostPage } from  "../changeHost/changeHost"
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  savePassword:boolean;
  username:string;
  password:string;
  screen_height:number;
  host:string;

  constructor(public navCtrl: NavController,public modalCtrl: ModalController,private backButtonService: BackButtonService,
              public platform: Platform, public toastCtrl: ToastController,private accountService:AccountService,private httpRequestService:HttpRequestService,
  ) {
    platform.ready().then(() => {
      this.backButtonService.registerBackButtonAction(null);
      this.screen_height =  window.screen.height;
    });
  }
  ionViewWillEnter(){
      this.host=this.httpRequestService.getCurrentHost();
  }

  ngOnInit() {

    this.username=localStorage.getItem("username");
    this.password=localStorage.getItem("password");
    if(localStorage.getItem("isSavePasssword")==null){
      this.savePassword=true;
    }else{
      if(localStorage.getItem("isSavePasssword")=='Y'){
        this.savePassword=true;
      }else{
        this.savePassword=false;
      }
    }
     this.host=localStorage.getItem("currentHost");
    if(this.host==null){
      this.host=this.httpRequestService.getDefaultHost();
      localStorage.setItem("currentHost",this.host);
      localStorage.setItem("hostItems",this.httpRequestService.getDefaultHostItems());
    }else{
      this.httpRequestService.setCurrentHost(this.host);
    }

  }
  changeHost(){
    this.navCtrl.push(ChangeHostPage);
  }

  logIn() {
    if (this.username.length == 0) {
      this.toastCtrl.create({
        message: '请输入账号',
        duration: 1000,
        position: 'top'
      }).present();
    } else if (this.password.length == 0) {
      this.toastCtrl.create({
        message: '请输入密码',
        duration: 1000,
        position: 'top'
      }).present();
    } else {
      let paramObj = {
        username: this.username,
        password:this.password
      };
      this.accountService.login(paramObj).subscribe(res => {
        let result:string=res.result;

        if(result=='success'){
          localStorage.setItem("username",this.username);
          if(this.savePassword){
            localStorage.setItem("password",this.password);
            localStorage.setItem("isSavePasssword",'Y');
          }else{
            localStorage.setItem("password","");
            localStorage.setItem("isSavePasssword",'N');
          }
          this.weblibLoginStatus().subscribe(res=>{
            if(res.status=="login"){
              localStorage.setItem("isLoginWeblib","Y");
              let modal = this.modalCtrl.create(TabsPage);
              modal.present();
            }else{
              this.initStoreType().subscribe(res=>{
              if(res.resule="success"){
                this.loginWeblib(res.weblibUsername,res.weblibPasswd);
              }
            },error=>{
              console.log("error: "+error);
            })
            }
          },error=>{
            console.log("error: "+error);
          });
        }else{
          this.toastCtrl.create({
            message: '账号或密码错误',
            duration: 2000,
            position: 'middle'
          }).present();
        }

      }, error => {
        this.toastCtrl.create({
          message: '网络请求出错',
          duration: 2000,
          position: 'bottom'
        }).present();
        console.log("error: "+error);
      });
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

        },error => {
          console.log("error: "+error);
        })
      }
    },error =>{
      console.log("error: "+error);
    },()=>{
      localStorage.setItem("isLoginWeblib","Y");
      let modal = this.modalCtrl.create(TabsPage);
      modal.present();
    });
  }
  weblibLoginStatus(){
    let paramObj = {
    };
    return this.accountService.weblibLoginStatus(paramObj);
  }
  initStoreType(){
    let paramObj = {
    };
    return this.accountService.initStoreType(paramObj);
  }
}
