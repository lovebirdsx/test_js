export interface SharedCat {
  name: string;
  age: number;
  breed: string;
}

export enum Role {
  User = 'user',
  Admin = 'admin',
  Developer = 'developer',
}

export interface SharedUser {
  userId: number;
  username: string;
  password: string;
  role: Role;
}

export class SharedArticle {
  id: string;
  title: string;
  isPublished: boolean;
  authorId: number;
}
