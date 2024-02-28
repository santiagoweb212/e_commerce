import { check, param } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { validateResult } from "../../middlewares/validateResult.mdl";

export const validateUpdateBrand = [
  check("name")
    .not()
    .isEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string")
    .not()
    .isNumeric()
    .withMessage("The name cannot be a number"),
  param("id")
    .not()
    .isEmpty()
    .withMessage("id is required")
    .isNumeric()
    .withMessage("id must be a number"),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];
