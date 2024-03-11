import { AxiosResponse } from "axios";
import { api } from "./axios.config";
import {
  IDeletecategory,
  IResponseCategory,
  IResponseCreateCategory,
  IResponseDeleteCategory,
  IResponseUpdateCategory,
  IUpdateCategory,
  IcreateCategory,
} from "../types/category.type";

const getAllCategory = async (): Promise<IResponseCategory> => {
  const { data }: AxiosResponse<IResponseCategory> = await api.get(
    "category/categories"
  );

  return data;
};
const createCategory = async (
  data: IcreateCategory
): Promise<IResponseCreateCategory> => {
  const { data: response }: AxiosResponse<IResponseCreateCategory> =
    await api.post("category/create-category", data);
  return response;
};

const updateCategory = async (data: IUpdateCategory) => {
  const { data: response }: AxiosResponse<IResponseUpdateCategory> =
    await api.put(`category/update-category/${data.id}`, {
      name: data.name,
    });
  return response;
};
const deleteCategoryById = async (
  id: IDeletecategory["id"]
): Promise<IResponseDeleteCategory> => {
  const { data }: AxiosResponse<IResponseDeleteCategory> = await api.delete(
    `category/delete-category/${id}`
  );
  return data;
};

export { getAllCategory, createCategory, updateCategory, deleteCategoryById };
