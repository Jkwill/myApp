import { Component } from '@angular/core';
import {HttpRequestService} from "../../services/httpService/httpRequest.service"
import { ToastController} from 'ionic-angular';

/**
 * Generated class for the CreateLessionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-change-host',
  templateUrl: 'changeHost.html',
})
export class ChangeHostPage {
  host:string;
  constructor(public toastCtrl: ToastController,public httpRequestService: HttpRequestService) {
  	this.host=localStorage.getItem("host");
  	if(this.host==null){
  		this.host="http:\/\/lms.ccnl.scut.edu.cn";
  	}
  }
  saveHost(){
  	this.httpRequestService.setHost(this.host);
  	localStorage.setItem("host",this.host);
  	this.toastCtrl.create({
        message: '设置成功',
        duration: 1000,
        position: 'bottom'
      }).present();
  }
  setDefaultHost(){
  	this.host="http:\/\/lms.ccnl.scut.edu.cn";
  }
}
