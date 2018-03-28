import { Component } from '@angular/core';
import {  NavController, NavParams, Platform } from 'ionic-angular';
import { CourseService} from "../../services/httpService/course.service"

/**
 * Generated class for the QuizPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {
  quizs:Object[];
  sectionName:string;
  correct:string;
  total:string;
  score:string;
  isResult:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public courseService:CourseService, public platform: Platform) {
    platform.ready().then(() => {
      this.getQuizResult(navParams.data.id,navParams.data.ifFin);
    });
  }
  getQuizResult(sectionId,ifFinished){
    let paramObj = {
      sectionId:sectionId
    };
    if(ifFinished == '1'){
      this.isResult = true;
      this.courseService.listQuizResult(paramObj).subscribe(res => {
        console.log('quiz:'+res.quiz);
        this.quizs = res.quiz;
        this.sectionName = res.sectionName;
        this.correct = res.correct;
        this.total = res.total;
        this.score = res.score;
      },error => {
        console.log(error);
      });
    }
    else{
      this.courseService.listQuiz(paramObj).subscribe(res => {
        this.quizs = res.quiz;
        this.sectionName = res.sectionName;
      },error => {
        console.log(error);
      });
    }
  }

  submitQuiz(){
    let sectionId = this.navParams.data.id;
    let body = {
      sectionId:sectionId
    };
    this.courseService.submitQuiz(body).subscribe( res => {
      console.log("submit success:"+res);
    }, error => {

    })
  }

}
