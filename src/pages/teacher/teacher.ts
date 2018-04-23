import { Component } from '@angular/core';
import {
  NavController, NavParams, Platform, ToastController, AlertController,
  ActionSheetController
} from 'ionic-angular';
import {CourseService} from "../../services/httpService/course.service";
import {FormPage} from "../form/form";
import { CorrectionPage } from "../correction/correction";
import {CourseSTPage} from '../courseST/courseST';
import {TeacherService} from "../../services/httpService/teacher.service";
import {FileUploadParam} from "../../model/FileUploadParam";
import {ExamPage} from "../exam/exam";
import {FinalExamPage} from "../final-exam/final-exam";
import {VideoPage} from "../video/video";
import {Message} from "../../model/Message";

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
  startDate:string;
  endDate:string;
  courseId:string;
  fileParam:FileUploadParam = new FileUploadParam('','','');
  courseResource:any;
  discussList:any[];
  messageList:Message[];
  homeworkList = new Array();
  progressList:Object[];
  sectionNum:number = 0;
  newMessage:Message = new Message('','','','','',false);
  addNewMessage:boolean = false;
  choose: string = "chapter";

  constructor(public navCtrl: NavController, public navParams: NavParams, public courseService:CourseService,public teacherService:TeacherService,
              public toastCtrl: ToastController, public alertCtrl: AlertController,  public actionSheetCtrl: ActionSheetController, public platform: Platform) {
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
    this.getProgress(this.courseId);
  }

  openVideoPage(uid){
    this.navCtrl.push(VideoPage,  { id : uid });
  }

  pushExam(id) {
    this.navCtrl.push(ExamPage, { id : id });
  }

  pushForm(formType)
  {
    this.navCtrl.push(FormPage, { id : this.courseId, type : formType, order:this.sectionNum, startDate:this.startDate, endDate:this.endDate });
  }

  pushFinalExam()
  {
    this.navCtrl.push(FinalExamPage, { id : this.courseId });
  }

  editSection(id)
  {
    this.navCtrl.push(FormPage, { sectionId : id, id:this.courseId, type : 'section' });
  }

  editHomework(sectionId, homeworkId)
  {
    this.navCtrl.push(FormPage, { sectionId:sectionId, homeworkId:homeworkId, fileParam:this.fileParam, type:'homework', endDate:this.endDate })
  }

  editUnit(sectionId, unitId)
  {
    this.navCtrl.push(FormPage, { sectionId:sectionId, unitId:unitId, fileParam:this.fileParam, type:'unit', startDate:this.startDate, endDate:this.endDate })
  }

  openCorrection(id){
    this.navCtrl.push(CorrectionPage,{id:id,courseId:this.courseId});
  }

  deleteSection(id)
  {
    let param = {
      id : id
    };
    let confirm = this.alertCtrl.create({
      title: '将同时删除下属资源，确认删除吗？',
      buttons: [
        {
          text: '确定',
          handler: () => {
            this.teacherService.deleteSection(param).subscribe( res => {
              if(res.result == "success")
              {
                this.getCourseResource(this.courseId, "teacher");
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

  deleteUnit(id)
  {
    let param = {
      id : id
    };
    let confirm = this.alertCtrl.create({
      title: '将同时删除下属资源，确认删除吗？',
      buttons: [
        {
          text: '确定',
          handler: () => {
            this.teacherService.deleteUnit(param).subscribe( res => {
              if(res.result == "success")
              {
                this.getCourseResource(this.courseId, "teacher");
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

  deleteHomework(id)
  {
    let param = {
      id : id
    };
    let confirm = this.alertCtrl.create({
      title: '将同时删除所有学生上传的作业，确认删除吗？',
      buttons: [
        {
          text: '确定',
          handler: () => {
            this.teacherService.deleteHomework(param).subscribe( res => {
              if(res.result == "success")
              {
                this.getCourseResource(this.courseId, "teacher");
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
        this.startDate = res.startDate.split(' ')[0];
        this.endDate = res.endDate.split(' ')[0];
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
        this.getHomeworkList();
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
    this.messageList = [];
    this.courseService.listMessage(paramObj).subscribe( res => {
      if(res.result=='success') {
        let mList:any[]=res.message;
        for(let message of mList){
          let date = message.createDate.split(' ');
          let createDate = date[0].substr(5)+' '+date[1].substr(0,5);
          let m:Message = new Message(message.id, message.content, message.creatorName, message.photo, createDate,false);
          this.messageList.push(m);
        }
      }
    },error=>{
      console.log("error:"+error);
    })
  }

  saveMessage() {
    let param = {
      messageId : this.newMessage.messageId,
      courseId : this.courseId,
      content : this.newMessage.content
    };
    this.teacherService.saveMessage(param).subscribe( res => {
      if(res.result == 'success'){
        this.addNewMessage = false;
        this.getMessageList(this.courseId);
        this.toastCtrl.create({
          message: '操作完成',
          duration: 1000,
          position: 'top'
        }).present();
      }
    }, error => {} );
  }

  addMessage() {
    this.addNewMessage = true;
  }

  closeAddNew(){
    this.addNewMessage = false;
  }

  expand(message){
    message.expand = true;
  }

  packUp(message){
    message.expand = false;
  }

  editMessage(message) {
    this.addNewMessage = true;
    this.newMessage = message;
  }

  deleteMessage(message) {
    let model = {
      messageId : message.messageId
    };
    this.teacherService.deleteMessage(model).subscribe( res => {
      if(res.result == 'success'){
        this.getMessageList(this.courseId);
        this.toastCtrl.create({
          message: '删除成功',
          duration: 1000,
          position: 'top'
        }).present();
      }
    }, error=>{} )
  }

  getHomeworkList(){
    this.homeworkList = new Array();
    for(let i = 0;i<this.sectionNum;i++){
      let sectionName = this.courseResource[i].name;
      for(let j=0;j<this.courseResource[i].homework.length;j++){
        let homeworkName = this.courseResource[i].homework[j].name;
        let endDate = this.courseResource[i].homework[j].endDate;
        let id = this.courseResource[i].homework[j].id;
        let homework = {
          "sectionName":sectionName,
          "homeworkName":homeworkName,
          "endDate":endDate,
          "id":id
        }
        this.homeworkList.push(homework);
      }
    }
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
