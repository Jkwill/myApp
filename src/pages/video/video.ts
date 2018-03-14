import { Component } from '@angular/core';
import {  NavController, NavParams, Platform } from 'ionic-angular';
import { CourseService} from "../../services/httpService/course.service"
import { AccountService} from "../../services/httpService/account.service"
/**
 * Generated class for the VideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 declare let cordova: any;
@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage {
  videoUrl:string;
  syllabus:string;
  syllabusFile:string;
  pdfSrc:string;
  play:boolean = false;
  watch:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public accountService:AccountService,public courseService:CourseService,public platform: Platform) {
    platform.ready().then(() => {
          let isLogin:string=localStorage.getItem("isLoginWeblib");
          if(isLogin=="Y"){
              this.getCourseware(this.navParams.data.id);
          }else{
              alert("weblib未登录")
          }
    });
  }

  viewPDF()
  {
    this.play = false;
    this.watch = true;
    console.log("pdf:"+this.pdfSrc);
  }

  playVideo()
  {
    this.play = true;
    this.watch = false;
    console.log("video:"+this.videoUrl);
  }

  getCourseware(uid){
    let paramObj = {
      unitId: uid
    };
    this.courseService.getCourseWare(paramObj).subscribe(res =>{
      console.log(res);
      if (res.result == 'success') {
        this.syllabus=res.syllabus;
        this.syllabusFile=res.syllabusFile;
        this.pdfSrc = "http://lms.ccnl.scut.edu.cn/weblib/group/downloadResource.action?id="+this.syllabus+"&isInline=1";
        if (res.filepath != "" || res.filetype != "") {
          if (res.filetype == 'mp4') {
            let cookies = document.cookie.split(';');
            let lmsSessionId = '';
            let weblibSessionId = '';
            for (let c in cookies) {
              let cookieName = cookies[c].split('=')[0].trim();
              if (cookieName != "JSESSIONID")
                continue;
              let cookieValue = cookies[c].split('=')[1];
              if (cookieValue.indexOf('.') == -1) {
                lmsSessionId = cookieValue;
              } else {
                weblibSessionId = cookieValue;
              }
            }
            this.videoUrl = "http://lms.ccnl.scut.edu.cn"+this.courseService.buildVideoUrl(res.filepath, lmsSessionId, weblibSessionId);
            console.log(".getCourseWare success"+res.syllabus+' '+res.filepath);
          } else if (res.filetype == 'flv') {
            alert("不支持该视频格式")
          } else if (res.filetype == 'swf') {
            alert("不支持该视频格式")
          }
        } else if (res.filepath == "" || res.filetype == "") {
          // collect.pdfUrl = Account.initPDF(res.data.syllabus);
          // // console.log(res.data.filepath+"wu");
          // console.log(res.data.syllabus);
          //
          // Account.initPDF(res.data.syllabus);
        }
      }
    },error =>{
      console.log("error: "+error);
    });
  }

}
