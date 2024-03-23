import { Response, Request, NextFunction } from "express";
import {
  ICreateProduct,
  IDataProduct,
  IDataProductUpdate,
  IProductDelete,
  IProductUpdate,
} from "../../types/product.type";
import { ProductService } from "../../services/admin/products.service";
import registrationError from "../../utils/registrationError.util";
import { sendResponse } from "../../utils/sendResponse.util";
import { HTTP_STATUS } from "../../constants/statusCode.constants";
import { CloudinaryService } from "../../services/cloudinary/cloudinary.service";
import { PrismaClient } from "@prisma/client";
import { processFiles } from "../../utils/processFIles.util";

const prisma = new PrismaClient();
const cloudinaryService = new CloudinaryService();
const productService = new ProductService(cloudinaryService, prisma);

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  // Logic to get all products
};

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productRequest = req.body;
    
    for (const key in productRequest) {
      if (typeof productRequest[key] === "string") {
        productRequest[key] = productRequest[key].trim();
      }
      if (
        key === "brandId" ||
        key === "categoryId" ||
        key === "stock" ||
        key === "price" ||
        key === "promotionPrice"
      ) {
        productRequest[key] = Number(productRequest[key]);
      }
      if (key === "active" || key === "promotion" || key === "status") {
        productRequest[key] = productRequest[key] === "true" ? true : false;
    }
  }
   
    const files = processFiles(req.files);
    const product = {
      product: { ...productRequest },
      ...files,
    };

    const data = await productService.createProduct(product);
    console.log("productAndFiles--->", product);
    sendResponse(res, HTTP_STATUS.OK, data);
  } catch (error) {
    registrationError(error, res, next);
  }
};

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { product, idImageOlds } = req.body;
    const files = req.files as {
      image: Express.Multer.File[];
    };

    const pathImages: Omit<IDataProductUpdate, "product" | "idImageOlds"> =
      processFiles(files);
    console.log("pathImages--->", pathImages.image);
    const dataproduct = {
      product: JSON.parse(product),
      idImageOlds: JSON.parse(idImageOlds).map((id: string) => Number(id)),
      image: pathImages.image,
    };
    const { productId } = req.params;
    const productIdNumber = Number(productId);
    console.log("productAndFiles--->", dataproduct);
    /* const data = await productService.updateProduct(
      product,
      productIdNumber,      
    ); */
    sendResponse(res, HTTP_STATUS.OK, "data");
  } catch (error) {
    registrationError(error, res, next);
  }
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const productId = Number(id);
    const data = await ProductService.deleteProduct(productId);
    sendResponse(res, HTTP_STATUS.OK, data);
  } catch (error) {
    registrationError(error, res, next);
  }
};

export { createProduct, updateProduct, deleteProduct };
