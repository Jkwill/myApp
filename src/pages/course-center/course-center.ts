import { Component } from '@angular/core';
import { NavController,ToastController,Platform } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { CourseService} from "../../services/httpService/course.service"

/**
 * Generated class for the CourseCenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-course-center',
  templateUrl: 'course-center.html',
})
export class CourseCenterPage {

  segment: string = "study";
  studyItems:Object[];
  teachItems:Object[];
  constructor(public navCtrl: NavController, public courseService:CourseService,
              public toastCtrl: ToastController, public platform: Platform) {
    platform.ready().then(() => {
      this.getAllCourseList();
    });
  }
  openDetailPage(title){
    this.navCtrl.push(DetailPage,  { item: title });
  }

  getAllCourseList(){
    this.courseService.listValidCourse().subscribe(res => {
      if(res.result=='success'){
        this.studyItems=res.student;
        this.teachItems=res.teacher;
      }else{
        this.toastCtrl.create({
          message: '获取课程列表出错',
          duration: 2000,
          position: 'top'
        }).present();
      }
    }, error => {
      this.toastCtrl.create({
        message: '网络请求出错',
        duration: 2000,
        position: 'top'
      }).present();
      console.log(error);
    });

  }

}
