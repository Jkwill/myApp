import {Http, Headers} from "@angular/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/toPromise";
import "rxjs/Rx";
import {Observable} from "rxjs";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/throw";

@Injectable()
export class HttpRequestService {

  host: string='http:\/\/lms.ccnl.scut.edu.cn';

  initParam: string='/lms/json/learning/initStoreType';//初始化Common类的三个变量
  ifLoginWeblib: string='/weblib/user/status.action?_=' + Math.random();//检查weblib登录状态
  loginWeblib:string= '/weblib/login/authenticate.action';
  selectMember:string= '/weblib/login/selectMember.action?temp=' + Math.random();
  downloadResource:string= '/weblib/group/downloadResource.action?id=';
  downloadlms:string= '/lms/json/learning/download?id=';
  custom: string='/lms/custom/';

  login: string='/lms/htmlLogin';//登录
  logout: string='/lms/htmlLogout';//登出
  ifLogin: string='/lms/htmlIfLogin';//是否登录
  getUser: string='/lms/json/account/getUser';//获取登录者信息
  courseDetail:string= '/lms/json/learning/courseDetail';//课程图片、简介、课时等
  teacherOfCourse: string='/lms/json/learning/getTeacherOfCourse';//授课教师信息
  listStudentResource: string='/lms/json/learning/listStudentResource';//学的课程列表student
  listTeacherResource: string='/lms/json/learning/listTeacherResource';//教的课程列表teacher
  listValidCourse: string='/lms/json/learning/listValidCourse';//课程列表信息
  getCourseWare:string= '/lms/json/learning/getCourseware';//教学元素的课件资源
  listAllCourse:string= '/lms/json/learning/listAllCourse';//课程列表信息
  listQuiz:string= '/lms/json/learning/listQuiz';//小测试试题列表(学生)
  formQuiz:string='/lms/json/creator/formQuiz';//小测试试题列表(教师)
  submitQuiz: string='/lms/json/learning/submitQuiz';//提交小测试post
  listQuizResult:string= '/lms/json/learning/listQuizResult';//小测试结果列表
  // listExamResult: '/lms/json/learning/listExamResult',
  listQuizResultStat:string='/lms/json/learning/listQuizResultStat';
  formAccount:string= '/lms/json/account/';
  saveAccount: string='/lms/json/account/save';//修改个人信息

  courseThumbnail:string='/lms/json/learning/formThumbnail';//获取课程缩略图

    constructor(private http: Http) {

    }

    //get请求
    get(url: string): Observable<any> {

        return this.http.get(url, {
            headers: new Headers({
                 "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            }),
            withCredentials: true
        }).map(res => res.json());
    }


    //post请求
    post(url: string, body: any): Observable<any> {
        return this.http.post(url, body, {
            headers: new Headers({
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            }),
            withCredentials: true
        }).map(res => res.json());
    }
}

