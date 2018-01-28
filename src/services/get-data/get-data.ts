import { Injectable } from '@angular/core';

/*
  Generated class for the GetDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GetDataProvider {
  constructor() {
    console.log('Hello GetDataProvider Provider');
  }
  getHero():string{
    return "Hero";
  }
  // getAccount():string{
  //   this.http.jsonp('http://api.money.126.net/data/feed/0000001,1399001','refreshPrice').subscribe(data=>{
  //     this.results = data['0000001'].price;
  //   });
  //   return this.results;
  // }
}
