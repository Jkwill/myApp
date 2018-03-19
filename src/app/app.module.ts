import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { LoginPage } from '../pages/login/login'
import { CourseCenterPage } from '../pages/course-center/course-center';
import { MinePage } from '../pages/mine/mine';
import { CreateLessionPage } from '../pages/create-lession/create-lession'
import { HomePage } from '../pages/home/home';
import { DetailPage } from '../pages/detail/detail'
import { TabsPage } from '../pages/tabs/tabs';
import { VideoPage } from '../pages/video/video'
import { PersonalInfoPage } from '../pages/personalInfo/personalInfo'
import { OpenPage } from '../pages/open/open'
import { QuizPage } from '../pages/quiz/quiz'
import { TeacherPage } from '../pages/teacher/teacher'

import { BackButtonService } from '../services/uiService/backButton.service';
import { HttpRequestService } from '../services/httpService/httpRequest.service';
import { AccountService } from '../services/httpService/account.service';
import { CourseService } from '../services/httpService/course.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GetDataProvider } from '../services/get-data/get-data';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    CourseCenterPage,
    MinePage,
    CreateLessionPage,
    HomePage,
    PersonalInfoPage,
    DetailPage,
    TabsPage,
    VideoPage,
    OpenPage,
    QuizPage,
    TeacherPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    PdfViewerModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    CourseCenterPage,
    PersonalInfoPage,
    MinePage,
    CreateLessionPage,
    HomePage,
    DetailPage,
    TabsPage,
    VideoPage,
    OpenPage,
    QuizPage,
    TeacherPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BackButtonService,
    HttpRequestService,
    AccountService,
    CourseService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GetDataProvider,
  ]
})
export class AppModule {}
