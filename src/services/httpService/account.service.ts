import {HttpRequestService} from "../httpService/httpRequest.service"
import {Injectable} from "@angular/core";

@Injectable()
export class AccountService {
    weblibUsername: string;
    weblibPassword: string;
    uploadURL: string;
    maxFileSize: number;
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
 	initParam(){
 	  this.httpRequestService.get(this.httpRequestService.initParam).subscribe(res =>{
 	    console.log(res);
 	    if(res.result == 'success'){
 	      let storeType = res.storetype;
        if (storeType == "remote") {
          this.uploadURL = "/weblib/group/uploadResourceReturnId.action";
          this.weblibUsername = res.data.weblibUsername;
          this.weblibPassword = res.data.weblibPasswd;
          this.maxFileSize = res.data.singleFileSize * 1024;
        } else if (storeType == "local") {
          this.uploadURL = "/lms/json/learning/upload";
          this.weblibUsername = res.data.weblibUsername;
          this.weblibPassword = res.data.weblibPasswd;
        }
      }
    },error => {
      console.log("error:"+error);
    });
  }
  ifLoginWeblib(){
 	  let httpReq = this.httpRequestService;
 	  setTimeout(function () {
      httpReq.get(httpReq.ifLoginWeblib).subscribe(res => {
        if (res==undefined){
          this.loginWeblib();
        }else {
          if (res.status == "login") {
            return
          } else {
            this.loginWeblib();
          }
        }
      }, error => {
        console.log("error:"+error);
      })
    },2000)
  }
  loginWeblib(){
    let paramObj = {
      account: encodeURIComponent(this.weblibUsername),
      password: encodeURIComponent(this.weblibPassword)
    };
    this.httpRequestService.post(this.httpRequestService.loginWeblib,paramObj).subscribe(res => {
      console.log(res);
      let obj = {
        memberId: res.members[0].id
      };
      this.httpRequestService.post(this.httpRequestService.selectMember,obj).subscribe(res => {
        console.log(res);
      },error => {
        console.log("error:"+error);
      })
    }, error => {
      console.log("error:"+error);
    })
  }
}

