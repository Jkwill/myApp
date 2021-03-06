import {HttpRequestService} from "../httpService/httpRequest.service"
import {Injectable} from "@angular/core";

@Injectable()
export class CourseService {

  constructor(private httpRequestService: HttpRequestService) {

  }

  listValidCourse() {
    let url: string = this.httpRequestService.listValidCourse;
    return this.httpRequestService.get(url);
  }

  courseDetail(paramObj) {
    let url: string = this.httpRequestService.courseDetail + "?" + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }

  listDiscuss(paramObj) {
    let url: string = this.httpRequestService.listDiscuss + "?" + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }

  listSHomework(paramObj) {
    let url: string = this.httpRequestService.listSHomework + "?" + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }

  listMessage(paramObj) {
    let url: string = this.httpRequestService.listMessage + "?" + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }

  courseResource(paramObj, type) {
    if (type == "student") {
      let url: string = this.httpRequestService.listStudentResource + "?" + this.httpRequestService.serialize(paramObj);
      return this.httpRequestService.get(url);
    } else {
      let url: string = this.httpRequestService.listTeacherResource + "?" + this.httpRequestService.serialize(paramObj);
      return this.httpRequestService.get(url);
    }

  }

  getCourseWare(paramObj) {
    let url: string = this.httpRequestService.getCourseWare + "?" + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }

  buildVideoUrl(id, lmsSessionId, weblibSessionId) {
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

  openCourseResource(paramObj) {
    let url: string = this.httpRequestService.listOpenResource + "?" + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }


  getDownloadPDFUrl(paramObj) {
    let url: string = this.httpRequestService.downloadResource + "?" + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.host+url;
  }



  listQuiz(paramObj) {
    let url: string = this.httpRequestService.listQuiz + "?" + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }

  listQuizResult(paramObj) {
    let url: string = this.httpRequestService.listQuizResult + "?" + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }

  joinOpenCourse(paramObj) {
    let url: string = this.httpRequestService.joinOpenCourse + "?" + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }

  quitOpenCourse(paramObj) {
    let url: string = this.httpRequestService.quitOpenCourse + "?" + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }

  submitQuiz(paramObj) {
    let url: string = this.httpRequestService.submitQuiz;
    return this.httpRequestService.post(url, paramObj);
  }

  submitHomework(model) {
    let url: string = this.httpRequestService.submitHomework;
    let param = this.httpRequestService.serialize(model);
    return this.httpRequestService.post(url, param);
  }

  uploadResourse(paramObj) {
    let url: string = this.httpRequestService.uploadResourse;
    return this.httpRequestService.resourcePost(url, paramObj);
  }

  deleteCourse(model) {
    let url:string = this.httpRequestService.deleteCourse;
    let param = this.httpRequestService.serialize(model);
    return this.httpRequestService.post(url, param);
  }

  formThumbnail(width, height, thumbnails) {
    let url: string = this.httpRequestService.courseThumbnail + "?" + "width="+width+"&"+"height="+height;
    for(let t of thumbnails){
      let param = "&filepath="+t
      url += param;
    }
    return this.httpRequestService.get(url);
  }

  copyCourse(param){
    let url: string = this.httpRequestService.copyCourse;
    let paramObj = this.httpRequestService.serialize(param);
    return this.httpRequestService.post(url, paramObj);
  }

  saveDiscuss(model){
    let url:string = this.httpRequestService.saveDiscuss;
    let param = this.httpRequestService.serialize(model);
    return this.httpRequestService.post(url, param);
  }

  deleteDiscuss(model){
    let url:string = this.httpRequestService.deleteDiscuss;
    let param = this.httpRequestService.serialize(model);
    return this.httpRequestService.post(url, param);
  }

  getUnits(param) {
    let url: string = this.httpRequestService.getUnits + "?" + this.httpRequestService.serialize(param);
    return this.httpRequestService.get(url);
  }

  doUpvote(paramObj) {
    let url: string = this.httpRequestService.doUpvote;
    return this.httpRequestService.post(url, this.httpRequestService.serialize(paramObj));
  }

  listReply(param) {
    let url: string = this.httpRequestService.listReply + "?" + this.httpRequestService.serialize(param);
    return this.httpRequestService.get(url);
  }

  saveReply(paramObj) {
    let url: string = this.httpRequestService.saveReply;
    return this.httpRequestService.post(url, this.httpRequestService.serialize(paramObj));
  }

  deleteReply(paramObj) {
    let url: string = this.httpRequestService.deleteReply;
    return this.httpRequestService.post(url, this.httpRequestService.serialize(paramObj));
  }

}
