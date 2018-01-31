import { Component } from '@angular/core';
import {  NavController, NavParams,Platform } from 'ionic-angular';
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
  subtitle;
  resource:string="../../assets/source/clear.mp4";
  choose: string = "chapter";
  constructor(public navCtrl: NavController, public navParams: NavParams, public courseService:CourseService,public platform: Platform) {
    platform.ready().then(() => {
      this.getCourseInfo(navParams.data.item);
      this.getCourseResource(navParams.data.item, navParams.data.type);
    });
  }
  openVideoPage(){
    this.navCtrl.push(VideoPage,  { item: this.resource });
  }
  getCourseInfo(cid){
    let paramObj = {
      courseId: cid
    };
    this.courseService.courseDetail(paramObj).subscribe( res => {
      this.courseDetail = res;
      this.subtitle = res.startDateString + ' - '+res.endDateString;
      //console.log(res);
    },error => {
      console.log("error: "+error);
    });
  }
  getCourseResource(cid,type){
    let paramObj = {
      courseId: cid
    };
    this.courseService.courseResource(paramObj,type).subscribe(res =>{
      this.courseResource = res.section;
      console.log(res);
    },error => {
      console.log("error: "+error);
    })
  }
}
