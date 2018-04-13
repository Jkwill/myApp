import { Component } from '@angular/core';
import { NavController,ToastController,Platform, AlertController, ActionSheetController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { TeacherPage } from '../teacher/teacher'
import { CourseService} from "../../services/httpService/course.service"
import {FormPage} from "../form/form";

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
  studyItems:any[];
  teachItems:any[];
  studyThumbnails:string[] = [];
  teachThumbnails:string[] = [];
  constructor(public navCtrl: NavController, public courseService:CourseService,
              public toastCtrl: ToastController, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public platform: Platform) {
    platform.ready().then(() => {

    });
  }

  ionViewWillEnter(){
    this.getAllCourseList();
  }

  createCourse() {
    this.navCtrl.push(FormPage, { type : 'course' });
  }

  presentActionSheet(e, id) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'options',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: '删除',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.deleteCourse(id);
          }
        }, {
          text: '复制',
          icon: !this.platform.is('ios') ? 'copy' : null,
          handler: () => {
            console.log('Archive clicked');
          }
        }, {
          text: '取消',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  deleteCourse(id) {
    let model = {
      courseId : id
    };
    let confirm = this.alertCtrl.create({
      title: '将同时删除下属资源，确认删除吗？',
      buttons: [
        {
          text: '确定',
          handler: () => {
            this.courseService.deleteCourse(model).subscribe( res => {
              if(res.result == 'success') {
                this.getAllCourseList();
                this.toastCtrl.create({
                  message: '删除成功',
                  duration: 1000,
                  position: 'top'
                }).present();
              }
            } , error => {})
          }
        },
        {
          text: '取消',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }

  openDetailPageOfStu(id){
    this.navCtrl.push(DetailPage,  { id: id });
  }

  openTeacherPage(id){
    this.navCtrl.push(TeacherPage,  { id: id });
  }

  getAllCourseList(){
    this.courseService.listValidCourse().subscribe(res => {
      if(res.result=='success'){
        this.studyItems=res.student;
        this.teachItems=res.teacher;
        this.studyThumbnails = [];
        this.teachThumbnails = [];
        for(let item of this.studyItems){
          this.studyThumbnails.push(item.filepath);
        }
        for(let item of this.teachItems){
          this.teachThumbnails.push(item.filepath);
        }
        this.formThumnail(this.studyThumbnails, 'study');
        this.formThumnail(this.teachThumbnails, 'teach');

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

  formThumnail(filepaths,type)
  {
    let width:number = 384;
    let height:number = 216;
    this.courseService.formThumbnail(width, height, filepaths).subscribe( res => {
      if(res.result == "success"){
        if(type == 'study'){
          this.studyThumbnails = res.thumbnail;
        }
        else{
          this.teachThumbnails = res.thumbnail;
        }
      }
    } , error => {})

  }

}
