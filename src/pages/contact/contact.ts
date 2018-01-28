import { Component } from '@angular/core';
import { NavController, ModalController,ToastController } from 'ionic-angular';
import { CreateLessionPage } from '../create-lession/create-lession'
import { LoginPage } from "../login/login";
import { AccountService} from "../../services/httpService/account.service"

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  constructor(public nav: NavController,public modalCtrl: ModalController,public toastCtrl: ToastController,public accountService:AccountService) {
  }
  createLession(){
    let modal = this.modalCtrl.create(CreateLessionPage);
    modal.present();
  }
  logOut() {
    this.accountService.logout().subscribe(res => {
      let result:string=res.result;
      if(result=='success'){
        let modal = this.modalCtrl.create(LoginPage);
        modal.present();
      }else{
        this.toastCtrl.create({
          message: '退出登录失败',
          duration: 2000,
          position: 'bottom'
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
