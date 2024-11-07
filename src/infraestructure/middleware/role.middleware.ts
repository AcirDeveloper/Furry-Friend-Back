import { Request, Response, NextFunction } from "express";
import { HttpCodes } from "../../shared/utils/httpCodes.utils";
import { errorResponse } from "../../shared/utils/response.utils";

export const roleMiddleware = (allowedRoles:string[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if(allowedRoles.includes(req.user?.role as string))
      next();
    else
      return errorResponse({ res, status: HttpCodes.FORBIDDEN,message: "Unauthorized" });
  };
};
