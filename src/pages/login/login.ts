import { Component } from '@angular/core';
import { ToastController,ModalController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { BackButtonService } from "../../services/uiService/backButton.service";
import { AccountService} from "../../services/httpService/account.service"

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

  constructor(public modalCtrl: ModalController,   private backButtonService: BackButtonService,
              public platform: Platform, public toastCtrl: ToastController,private accountService:AccountService) {
    platform.ready().then(() => {
      this.backButtonService.registerBackButtonAction(null);
    });
  }


  logIn(username: HTMLInputElement, password: HTMLInputElement) {
    if (username.value.length == 0) {
      this.toastCtrl.create({
        message: '请输入账号',
        duration: 1000,
        position: 'top'
      }).present();
    } else if (password.value.length == 0) {
      this.toastCtrl.create({
        message: '请输入密码',
        duration: 1000,
        position: 'top'
      }).present();
    } else {
      this.accountService.login(username.value,password.value).subscribe(res => {
        let result:string=res.result;

        if(result=='success'){
          let modal = this.modalCtrl.create(TabsPage);
          modal.present();
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
        console.log(error);
      });
    }
  }
}
