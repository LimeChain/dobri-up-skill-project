export type DataResponse<T = null> = {
  data: T;
  message: string | null;
  type: ResponseTypes;
};

export enum ResponseTypes {
  IDLE = "idle",
  SUCCESS = "success",
  ERROR = "error",
}

export type Blog = {
  id: string;
  title: string;
  content: string;
  likesRef: BlogLikes[];
  image: {
    url: string;
    width: number;
    height: number;
  };
  backgroundColor: {
    hex: string;
    css: string;
  };
  createdBy: {
    name: string;
    picture: string;
  };
  createdAt: string;
  comment: BlogComment[];
};

export type BlogLikes = {
  id: string;
  userId: string;
};

export type BlogComment = {
  id: string;
  userId: string;
  content: string;
  userImgUrl: string;
  createdAt: string;
};
