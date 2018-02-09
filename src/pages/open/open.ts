import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { CourseService} from "../../services/httpService/course.service"

/**
 * Generated class for the OpenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-open',
  templateUrl: 'open.html',
})
export class OpenPage {
  openCourse ={};
  openSection :Object[];
  choose: string = "chapter";
  constructor(public navCtrl: NavController, public navParams: NavParams,public courseService:CourseService,public platform: Platform) {
    platform.ready().then(() => {
      this.getOpenResourse(this.navParams.data.id);

    });
  }
  getOpenResourse(id){
    let paramObj = {
      courseId:id
    };
    this.courseService.openCourseResource(paramObj).subscribe( res => {
      console.log(res);
      this.openCourse = res.course;
      this.openSection = res.section;
    }, error => {
      console.log("getOpenCourseResource error:"+error);
    })
  }

}
