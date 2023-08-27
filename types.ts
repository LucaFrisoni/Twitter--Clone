export interface User {
  _id: string;
  name?: string 
  username?: string;
  bio?: string;
  email?: string;
  emailVerified?: Date;
  image?: string;
  coverImage?: string;
  profileImage?: string;
  hashedPassword?: string;
  createdAt?: Date;
  updatedAt?: Date;
  followingIds?: string[];
  hasNotification?: boolean;
  posts?: Post[];
  comments?: Comment[];
  notifications?: Notification[];
}

export interface Post {
  _id: string;
  body: string;
  userId?: string;
  likeIds?: string[];
  user?: User;
  comments?: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  _id: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  postId?: string;
  userId?: string;
  user?: User;
  post?: Post;
}

export interface Notification {
  _id: string;
  body: string;
  createdAt: Date;
  userId?: string;
  user?: User;
}
