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
}

