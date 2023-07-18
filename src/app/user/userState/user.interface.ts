 export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    is_blocked?: boolean;
    wallet?: number;
    __v?: number;
    verified?: boolean;
    Image: string;
    profile_PublicId?: string;
  }