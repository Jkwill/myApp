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

}

