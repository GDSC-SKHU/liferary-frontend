export default interface Board {
    id: number;
    title: string;
    nickname: string;
    author: string;
    context: string;
    images: string[];
    modifiedDate: string;
    comments: string[];
    mainPostId: number;
  }