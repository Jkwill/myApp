import {HttpRequestService} from "../httpService/httpRequest.service"
import {Injectable} from "@angular/core";

@Injectable()
export class AccountService {

    constructor(private httpRequestService: HttpRequestService) {
      
    }

 	login(username:string,password:string){
 	  let url: string=this.httpRequestService.login+'?'+'username='+username+'&'+'password='+password;
      return this.httpRequestService.get(url);
 	}
 	logout(){
 	  let url: string=this.httpRequestService.logout;
      return this.httpRequestService.get(url);
 	}
}

