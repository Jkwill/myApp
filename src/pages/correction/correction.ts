import { Component } from '@angular/core';
import {  NavController, NavParams,ToastController,LoadingController } from 'ionic-angular';
import { TeacherService } from "../../services/httpService/teacher.service";
import { CorrectionDetailPage } from "../correctionDetail/correctionDetail";

@Component({
  selector: 'page-correction',
  templateUrl: 'correction.html',
})

export class CorrectionPage{
    students;
    courseId;
    submit;
    notSubmit;
    correction;
    notCorrection;
    constructor(public navCtrl: NavController,public teacherService:TeacherService, public navParams: NavParams,public toastCtrl: ToastController,public loadingCtrl: LoadingController){
        let homeworkId = this.navParams.get('id');
        this.courseId = this.navParams.get('courseId');
        this.getHomework(homeworkId);
    }
    
    openDetail(index){
        this.navCtrl.push(CorrectionDetailPage,{student:this.students[index],courseId:this.courseId});
    }

    getHomework(homeworkId){
        let paramObj = {
            id:homeworkId
        };
        this.teacherService.getHomeworkTable(paramObj).subscribe( res =>{
            if(res.result == "success"){
                //console.log("homework");
                //console.log(res);
                this.students = res.homework;
                this.initStatistics();
            }
        })
    }

    initStatistics(){
        this.submit = 0;
        this.notSubmit = 0;
        this.correction = 0;
        this.notCorrection = 0;
        for(let i = 0;i<this.students.length;i++){
            if(this.students[i].createDate != ""){
                this.submit++;
                let submitDate:string = this.students[i].createDate;
                this.students[i].createDate = submitDate.substring(0,submitDate.length-2);
                //this.students[i].createDate = this.students[i].createDate.subString(0,this.students[i].createDate.length-2);
                if(this.students[i].score == ""){
                    this.notCorrection++;
                }else{
                    this.correction++;
                }
            }else{
                this.notSubmit++;
            }
        }
    }
}