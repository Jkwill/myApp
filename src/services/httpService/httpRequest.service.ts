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
  loginWeblib:string= '/weblib/login/authenticate.action';
  selectMember:string= '/weblib/login/selectMember.action?temp=' + Math.random();
  weblibLoginStatus:string="/weblib/user/status.action";
  downloadResource:string= '/weblib/group/downloadResource.action';
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
  listDiscuss:string="/lms/json/learning/listDiscuss";
  listSHomework:string="/lms/json/learning/listSHomework";
  listMessage:string="/lms/json/learning/listMessage";
  listOpenResource: string = "/lms/json/learning/listOpenResource" //获取某一公开课的详细信息
  joinOpenCourse: string = "/lms/json/learning/joinOpenCourse"  //加入某一门公开课
  quitOpenCourse: string = "/lms/json/learning/quitOpenCourse" //退出某一门公开课
  doUpvote:string = "/lms/json/learning/doUpvote" //点赞处理

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

        return this.http.get(this.host+url, {
            headers: new Headers({
                 "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            }),
            withCredentials: true
        }).map(res => res.json());
    }


    //post请求
    post(url: string,body): Observable<any> {
        return this.http.post(this.host+url, body,
          { headers: new Headers({
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            }),
            withCredentials: true}
        ).map(res => res.json());
    }


    //对象参数序列化
    serialize(paramObj){
      let keysArr = Object.keys(paramObj), res = '';
      for (let i = 0; i < keysArr.length; i++) {
        res += keysArr[i] + '=' + paramObj[keysArr[i]] + '&';
      }
      res = res.substring(0, (res.length - 1));
      return res;
    }
}

