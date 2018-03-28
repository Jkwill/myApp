export class SectionInfo
{
  courseId:string;
  sectionId:string;
  name:string;
  introduction:string;
  attach:string;
  startDate:string;
  endDate:string;
  constructor(cid:string, sid:string, name:string, introduction:string, attach:string, startDate:string, endDate:string)
  {
    this.courseId = cid;
    this.sectionId = sid;
    this.name = name;
    this.introduction = introduction;
    this.attach = attach;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
