export interface User {
  id: number;
  email: string;
  password: number;
  posts?: Post[];
}
  
export interface Post {
  id: number;
  title: string;
  content: string;
  author: User;
}

export interface Feedback {
  raterate :number    
  descpiption: string
}

export interface createPost {
  title: string;
  content: string;
  authorId: number,
}