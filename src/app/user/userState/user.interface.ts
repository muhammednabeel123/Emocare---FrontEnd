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
  is_verified:boolean
 
}

export interface getAllService{
  _id?:string;
  name?:string;
  Listed?:true
}

export interface getServicer{
  _id?:string
  name:string
  Image?:string
  is_Available:true
  is_Blocked:false
  is_verified:true
  experience:number
  fee:number
}

export interface MyApiResponse {
  date: string | Date;
}


