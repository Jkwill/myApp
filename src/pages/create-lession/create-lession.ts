import { Component } from '@angular/core';
import {  NavController, NavParams , ViewController} from 'ionic-angular';

/**
 * Generated class for the CreateLessionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-lession',
  templateUrl: 'create-lession.html',
})
export class CreateLessionPage {
  lestype:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
