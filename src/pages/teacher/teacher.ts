import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ToastController} from 'ionic-angular';
import {CourseService} from "../../services/httpService/course.service";
import {FormPage} from "../form/form";
import {CourseSTPage} from '../courseST/courseST';
import {TeacherService} from "../../services/httpService/teacher.service";
import {FileUploadParam} from "../../model/FileUploadParam";

/**
 * Generated class for the TeacherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-teacher',
  templateUrl: 'teacher.html',
})
export class TeacherPage {
  courseDetail={};
  courseId:string;
  fileParam:FileUploadParam = new FileUploadParam('','','');
  courseResource:Object[];
  discussList:any[];
  messageList:Object[];
  homeworkList:Object[];
  progressList:Object[];
  sectionNum:number = 0;


  choose: string = "chapter";

  constructor(public navCtrl: NavController, public navParams: NavParams, public courseService:CourseService,public teacherService:TeacherService, public toastCtrl: ToastController, public platform: Platform) {
    platform.ready().then(() => {
      this.courseId = navParams.get('id');
      this.initFileUpload(this.courseId);
    });
  }

  ionViewWillEnter() {
    this.getCourseInfo(this.courseId);
    this.getCourseResource(this.courseId, "teacher");
    this.getDiscussList(this.courseId);
    this.getMessageList(this.courseId);
    this.getHomeworkList(this.courseId);
    this.getProgress(this.courseId);
  }

  pushForm(formType)
  {
    this.navCtrl.push(FormPage, { id : this.courseId, type : formType, order:this.sectionNum });
  }

  editSection(id)
  {
    this.navCtrl.push(FormPage, { sectionId : id, id:this.courseId, type : 'section' });
  }

  editHomework(sectionId, homeworkId)
  {
    this.navCtrl.push(FormPage, { sectionId:sectionId, homeworkId:homeworkId, fileParam:this.fileParam, type:'homework' })
  }

  editUnit(sectionId, unitId)
  {
    this.navCtrl.push(FormPage, { sectionId:sectionId, unitId:unitId, fileParam:this.fileParam, type:'unit' })
  }


  getDiscussList(cid){
    let paramObj = {
      courseId: cid
    };
    this.courseService.listDiscuss(paramObj).subscribe( res => {
      if(res.result=='success') {
        this.discussList=res.discuss;
      }
    },error=>{
      console.log("error:"+error);
    })
  }

  doUpvote(id){
    let paramObj = {
      id:id
    }
    this.courseService.doUpvote(paramObj).subscribe(res => {
      if(res.result == "success"){
        for(let i =0;i<this.discussList.length;i++){
          if(this.discussList[i].id == id){
            this.discussList[i].id = res.count;
            break;
          }
        }
      }
      else{
        console.log("doUpvote Failed");
      }
    }, error => {
      console.log("error:"+error);
    });
  }

  getCourseInfo(cid){
    let paramObj = {
      courseId: cid
    };
    this.courseService.courseDetail(paramObj).subscribe( res => {
      if(res.result=='success'){
        this.courseDetail = res;
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
        this.sectionNum = this.courseResource.length;
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

  initFileUpload(cid)
  {
    let paramObj = {
      courseId : cid
    };
    this.teacherService.initFileUpload(paramObj).subscribe( res => {
      if(res.result == 'success'){
          this.fileParam = new FileUploadParam(res.coolviewId, res.groupId, res.parentId);
          console.log(this.fileParam);
      }
    }, error => {} );
  }

  getMessageList(cid){
    let paramObj = {
      courseId: cid
    };
    this.courseService.listMessage(paramObj).subscribe( res => {
      if(res.result=='success') {
        this.messageList=res.message;
      }
    },error=>{
      console.log("error:"+error);
    })
  }

  getHomeworkList(cid){
    let paramObj = {
      courseId: cid
    };
    this.courseService.listSHomework(paramObj).subscribe( res => {
      if(res.result=='success') {
        this.homeworkList=res.homeworkList;
      }
    },error=>{
      console.log("error:"+error);
    })
  }

  editStudentAndTeacher(){
      this.navCtrl.push(CourseSTPage,  { courseId: this.courseId });
  }

  getProgress(cid){
    let paramObj = {
      courseId: cid
    };
    this.teacherService.listProgress(paramObj).subscribe( res => {
      console.log(res);
      if(res.result == "success")
      {
        this.progressList = res.progress;
      }
      else
      {
        this.toastCtrl.create({
          message: '获取学习进度失败',
          duration: 1000,
          position: 'top'
        }).present();
      }

    }, error => {

    });
  }

}
