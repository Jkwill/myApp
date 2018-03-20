import { Component } from '@angular/core';
import {  NavController, NavParams,Platform,ToastController, AlertController } from 'ionic-angular';
import { VideoPage } from '../video/video'
import { QuizPage } from '../quiz/quiz'
import { CourseService} from "../../services/httpService/course.service"
import {OpenPage} from "../open/open";
import {Http, Headers,RequestOptions} from "@angular/http";

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
  discussList:any[];
  messageList:Object[];
  homeworkList:any;
  groupId:string;
  parentId:string;
  courseId;

  resource:string="../../assets/source/clear.mp4";
  choose: string = "chapter";
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http, public courseService:CourseService,public toastCtrl: ToastController,public platform: Platform,public alertCtrl: AlertController) {
    platform.ready().then(() => {
      this.courseId = navParams.get('id');
      this.getCourseInfo(this.courseId);
      this.getCourseResource(this.courseId, "student");
      this.getDiscussList(this.courseId);
      this.getMessageList(this.courseId);
      this.getHomeworkList(this.courseId);
    });
  }
  upload(e,index){
    if(this.homeworkList[index].deadline != "false"){
      alert("已过提交日期");
    }else if(e.target.files[0]){
      const file = e.target.files[0];
      let url = "http://lms.ccnl.scut.edu.cn/weblib/group/uploadResourceReturnId.action";

      let homeworkId:string = this.homeworkList[index].hsId;
      let attach,attachType;

      let formData:FormData = new FormData();
      formData.append('groupId',this.groupId);
      formData.append('parentId',this.parentId);
      formData.append('homeworkId',homeworkId);
      formData.append('attach',"");
      formData.append('attachType',"");
      formData.append('attachName',"");
      formData.append('filedata',file,file.name);
      //console.log(this.homeworkList[0].hsId);

      this.http.post(url,formData).map(res => res.json()).subscribe(res =>{
        //console.log("res");
        attach = res.file[0].id;
        attachType = res.file[0].ext;
        this.submit(homeworkId,attach,attachType,file.name);
        //console.log(res);
      })
    }
  }
  submit(homeworkId,attach,attachType,attachName){
    let url = "http://lms.ccnl.scut.edu.cn/lms/json/learning/submitHomework";

    let headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    let header = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' });
    let options = new RequestOptions({headers:header});

    let dData = new URLSearchParams();
    dData.set('groupId',this.groupId);
    dData.set('parentId',this.parentId);
    dData.set('homeworkId',homeworkId);
    dData.set('attach',attach);
    dData.set('attachType',attachType);
    dData.set('attachName',attachName);
    this.http.post(url,dData.toString(),options).map(res => res.json()).subscribe(res =>{
        alert(res.message);
        this.getHomeworkList(this.courseId);
    })
  }

  ionViewDidEnter(){
    console.log('view len:'+this.navCtrl.length());
  }

  openVideoPage(uid){
    this.navCtrl.push(VideoPage,  { id : uid });
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
        this.toastCtrl.create({
          message: res.message,
          duration: 1000,
          position: 'bottom'
        }).present();
        console.log("doUpvote Failed");
      }
    }, error => {
      console.log("error:"+error);
    });
  }
  IntoQuiz(ifFinished,sectionId){
    this.navCtrl.push(QuizPage, { id: sectionId, ifFin:ifFinished });

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
      console.log(res);
      if(res.result=='success') {
        this.homeworkList=res.homeworkList;
      }
    },error=>{
      console.log("error:"+error);
    })
  }
  getCourseInfo(cid){
    let paramObj = {
      courseId: cid
    };
    this.courseService.courseDetail(paramObj).subscribe( res => {
      if(res.result=='success'){
        this.courseDetail = res;
        console.log(res);
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
        this.parentId = res.parentId;
        this.groupId = res.groupId;
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

  quitOpenCourse(cid){
    let paramObj = {
      courseId: cid
    };
    this.courseService.quitOpenCourse(paramObj).subscribe( res => {
      console.log(res);
      this.navCtrl.remove(1);
      this.navCtrl.push(OpenPage, { id : cid });
    }, error => {
      console.log("joinOpenCourse error:"+error);
    })
  }

  ifQuitCourse() {
    let confirm = this.alertCtrl.create({
      title: '即将退出此门课程',
      buttons: [
        {
          text: '确定',
          handler: () => {
            this.quitOpenCourse(this.navParams.get('id'));
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

  goBack() {
    this.navCtrl.pop();
  }

}
