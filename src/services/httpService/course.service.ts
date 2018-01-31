import {HttpRequestService} from "../httpService/httpRequest.service"
import {Injectable} from "@angular/core";

@Injectable()
export class CourseService {

    constructor(private httpRequestService: HttpRequestService) {

    }
    listValidCourse(){
    	let url: string=this.httpRequestService.listValidCourse;
    	return this.httpRequestService.get(url);
    }
    courseDetail(paramObj){
      let url:string = this.httpRequestService.courseDetail+"?"+this.httpRequestService.serialize(paramObj);
      return this.httpRequestService.get(url);
    }
    courseResource(paramObj,type){
      if(type == "student"){
        let url:string = this.httpRequestService.listStudentResource+"?"+this.httpRequestService.serialize(paramObj);
        return this.httpRequestService.get(url);
      }else{
        let url:string = this.httpRequestService.listTeacherResource+"?"+this.httpRequestService.serialize(paramObj);
        return this.httpRequestService.get(url);
      }

    }
    getCourseWare(paramObj){
      let url:string = this.httpRequestService.getCourseWare+"?"+this.httpRequestService.serialize(paramObj);
      return this.httpRequestService.get(url);
    }
    buildVideoUrl(id, lmsSessionId, weblibSessionId){
      let paramsObj = '';
      if (id.indexOf(".") == -1) {
        if (typeof(weblibSessionId) != 'undefined' && weblibSessionId != '') {
          paramsObj = "/weblib/group/downloadResource.action?id=" + id + "&isInline=1" + "&sessionId=" + weblibSessionId;
        } else {
          paramsObj = "/weblib/group/downloadResource.action?id=" + id + "&isInline=1";
        }
      } else {
        if (typeof(lmsSessionId) != 'undefined' || lmsSessionId != '') {
          paramsObj = "/lms/json/learning/download;jsessionid=" + lmsSessionId + "?id=" + id;
        } else {
          paramsObj = "/lms/json/learning/download?id=" + id;
        }
      }
      return paramsObj;
    }
}

