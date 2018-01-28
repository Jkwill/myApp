import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { VideoPage } from '../video/video'

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  item;
  resource:string="../../assets/source/clear.mp4";
  choose: string = "chapter";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.data.item;
  }
  openVideoPage(){
    this.navCtrl.push(VideoPage,  { item: this.resource });
  }
}
