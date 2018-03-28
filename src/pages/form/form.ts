import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {TeacherService} from "../../services/httpService/teacher.service";
import { CourseInfo } from "../../model/CourseInfo"
import {SectionInfo} from "../../model/SectionInfo";

/**
 * Generated class for the FormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {
  title:string="form";
  showCourse:boolean = false;
  showSection:boolean = false;
  courseInfo:CourseInfo = new CourseInfo(' ',' ',' ',0,0,' ',' ',' ',' ', ' ', ' ');
  isOpen:boolean = false;
  courseType:Object[];
  department:Object[];
  sectionInfo:SectionInfo = new SectionInfo('','','','','','','');
  constructor(public navCtrl: NavController, public teacherService:TeacherService,public toastCtrl: ToastController,  public navParams: NavParams) {
    let formType = this.navParams.get('type');
    let courseId = this.navParams.get('id');
    let sectionId = this.navParams.get('sectionId');
    if(formType == "course")
    {
      this.title = "编辑课程";
      this.showSection = false;
      this.showCourse = true;
      this.formCourse(courseId);
    }
    else
    {
      console.log(sectionId);
      this.title = "新增章节";
      this.showSection = true;
      this.showCourse = false;
      if(typeof (sectionId) != "undefined")
      {
        this.formSection(courseId, sectionId);
      }
    }
  }

  formCourse(courseId)
  {
    let param = {
      courseId : courseId
    };
    this.teacherService.formCourse(param).subscribe( res => {
      if(res.result == 'success' )
      {
        this.courseType = res.courseType;
        this.department = res.departmentType;
        if(res.isOpen == '1')
        {
          this.isOpen = false;
        }
        else
        {
          this.isOpen = true;
        }
        let startDate:string = res.startDate;
        startDate = startDate.split(' ')[0];
        let endDate :string = res.endDate;
        endDate = endDate.split(' ')[0];
        let credit:number = parseInt(res.credit);
        let classHour:number = parseInt(res.classHour);
        this.courseInfo = new CourseInfo(courseId, res.name, res.textbook, credit, classHour, res.introduction, res.isOpen, startDate, endDate, res.type, res.department);
      }
    }, error => {

    })
  }

  saveCourse()
  {
    if(this.isOpen)
    {
      this.courseInfo.isOpen = '2'
    }
    else
    {
      this.courseInfo.isOpen = '1';
    }
    this.teacherService.saveCourse(this.courseInfo).subscribe( res => {
      if(res.result == 'success')
      {
        this.toastCtrl.create({
          message: "保存成功",
          duration: 2000,
          position: 'top'
        }).present();
        this.navCtrl.pop();
      }
    } , error => {
      console.log('result:'+error);
    });
  }

  formSection(courseId, sectionId)
  {
    let param =  {
        courseId : courseId,
        sectionId : sectionId
      };

    this.teacherService.formSection(param).subscribe( res => {
      let startDate:string = res.startDate;
      startDate = startDate.split(' ')[0];
      let endDate :string = res.endDate;
      endDate = endDate.split(' ')[0];
      console.log(res.name);
      this.sectionInfo = new SectionInfo(courseId, sectionId, res.name, res.introduction, res.attach, startDate, endDate);
      console.log(this.sectionInfo);
    }, error => {

    })
  }

  saveSection()
  {
    console.log(this.sectionInfo);
    this.teacherService.saveSection(this.sectionInfo).subscribe( res => {
      if(res.result == 'success') {
        this.toastCtrl.create({
          message: "保存成功",
          duration: 2000,
          position: 'top'
        }).present();
        this.navCtrl.pop();
      }
    });
  }

}
