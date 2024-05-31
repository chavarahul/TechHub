export interface userType{
    id:string
    password: string
    email: string
    Image: string
    createdAt: string
    updatedAt: string
}

export interface FormData {
    type: string;
    questions: string;
    level: string;
    prompt:string
  }