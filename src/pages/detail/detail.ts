import { Component } from '@angular/core';
import {  NavController, NavParams,Platform,ToastController } from 'ionic-angular';
import { VideoPage } from '../video/video'
import { CourseService} from "../../services/httpService/course.service"

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
  courseDetail={};
  courseResource:Object[];
  resource:string="../../assets/source/clear.mp4";
  choose: string = "chapter";
  constructor(public navCtrl: NavController, public navParams: NavParams, public courseService:CourseService,public toastCtrl: ToastController,public platform: Platform) {
    platform.ready().then(() => {
      this.getCourseInfo(navParams.data.item);
      this.getCourseResource(navParams.data.item, navParams.data.type);
    });
  }
  openVideoPage(uid){
    this.navCtrl.push(VideoPage,  { id : uid });
  }
  getCourseInfo(cid){
    let paramObj = {
      courseId: cid
    };
    this.courseService.courseDetail(paramObj).subscribe( res => {
      if(res.result=='success'){
        this.courseDetail = res;
        //console.log(res);
      }else{
        this.toastCtrl.create({
          message: '获取课程详情出错',
          duration: 1000,
          position: 'top'
        }).present();
      }
    },error => {
      console.log("error: "+error);
    });
  }
  getCourseResource(cid,type){
    let paramObj = {
      courseId: cid
    };
    this.courseService.courseResource(paramObj,type).subscribe(res =>{
      if(res.result=='success'){
        this.courseResource = res.section;
        //console.log(res);
      }else{
        this.toastCtrl.create({
          message: '获取课程章节出错',
          duration: 1000,
          position: 'top'
        }).present();
      }
    },error => {
      console.log("error: "+error);
    })
  }


}
