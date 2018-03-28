import {HttpRequestService} from "../httpService/httpRequest.service"
import {Injectable} from "@angular/core";

@Injectable()
export class TeacherService{

  constructor(private httpRequestService: HttpRequestService) {

  }

  listProgress(paramObj) {
    let url: string = this.httpRequestService.listProgress + "?" + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }

  formCourse(paramObj) {
    let url: string = this.httpRequestService.formCourse + "?" + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }

  saveCourse(model)
  {
    let url: string = this.httpRequestService.saveCourse;
    return this.httpRequestService.post(url,this.httpRequestService.serialize(model));
  }

  formSection(paramObj) {
    let url: string = this.httpRequestService.formSection + "?" + this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }

  saveSection(model)
  {
    let url:string = this.httpRequestService.saveSection;
    return this.httpRequestService.post(url, this.httpRequestService.serialize(model));
  }
}
