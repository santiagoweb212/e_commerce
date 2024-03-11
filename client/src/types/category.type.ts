import { IResponse } from "./response.type";

export interface IResponseCategory extends IResponse {
  data: ICategory[];
}
export interface ICategory {
  id: number;
  name: string;
  createAt: string;
}
export interface IcreateCategory {
  name: string;
}
export interface IResponseCreateCategory extends IResponse {
  message: string;
}

export interface IUpdateCategory {
  id: number;
  name: string;
}

export interface IResponseUpdateCategory extends IResponse {
  message:string
}
export interface IDeletecategory{
  id: number
} 
export interface IResponseDeleteCategory extends IResponse {
  message: string;
}

