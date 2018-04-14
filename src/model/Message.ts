export class Message
{
  messageId:string;
  content:string;
  creatorName:string;
  photo:string;
  createDate:string;
  constructor(messageId:string, content:string, creatorName:string, photo:string, createDate:string){
    this.messageId = messageId;
    this.content = content;
    this.creatorName = creatorName;
    this.photo = photo;
    this.createDate = createDate;
  }

}
