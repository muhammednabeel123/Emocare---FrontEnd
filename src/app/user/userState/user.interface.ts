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

export interface UserLogin{
  name?:string | null;
  password?:string | null
}

export interface CounselorView {
  _id?: string;
  service?:string
  profileImageUrl?:string;
  name?:string;
  country?:string,
  state ?:string,
  experience?:string;
  fee?: number;
  is_Blocked: boolean;
  is_Available: boolean;
 
}

export interface getAllService{
  _id?:string;
  name?:string;
  Listed?:true
}