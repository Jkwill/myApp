import {HttpRequestService} from "../httpService/httpRequest.service"
import {Injectable} from "@angular/core";

@Injectable()
export class AccountService {

    constructor(private httpRequestService: HttpRequestService) {

    }

    loginWeblib(paramObj){
	  let url: string=this.httpRequestService.loginWeblib;
      return this.httpRequestService.post(url,paramObj);
    }

  weblibSelectMember(paramObj){
    let url: string=this.httpRequestService.selectMember;
    return this.httpRequestService.post(url,paramObj);
  }
  weblibLoginStatus(paramObj){
    let url: string=this.httpRequestService.weblibLoginStatus+'?'+this.httpRequestService.serialize(paramObj);
    return this.httpRequestService.get(url);
  }

  initStoreType(paramObj){
    let url: string=this.httpRequestService.initParam;
    return this.httpRequestService.post(url,paramObj);
  }

 	login(paramObj){
 	  let url: string=this.httpRequestService.login+'?'+this.httpRequestService.serialize(paramObj);
      return this.httpRequestService.get(url);
 	}
 	logout(){
 	  let url: string=this.httpRequestService.logout;
      return this.httpRequestService.get(url);
 	}
}

