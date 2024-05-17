import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No Token Provided!" });
  }

  const token: string = auth.split(" ")[1];
  try {
    const secret =
      process.env.JWT_SECRET ||
      "53B71FB31FA20B3EA74319BC9551F5E1EB4046D1F16E81AFCF45CD4C2568B9AE";
    const { id, name, role }: any = jwt.verify(token, secret);
    req.user = { id, name, role };
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Not Authorized" });
  }
};

export const verifyRoles = (...roles: string[]) => {
  return (req: Request | any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ msg: "User not authorized!" });
    }
    next();
  };
};
