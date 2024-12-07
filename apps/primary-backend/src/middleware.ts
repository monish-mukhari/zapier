import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): any | Promise<any> => {
    const token = req.headers.authorization;

    if(!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const payload = jwt.verify(token, JWT_PASSWORD);
        // @ts-ignore
        req.id = payload.id;
        next();
    } catch(e) {
        return res.status(401).json({ message: "Invalid token" });
    }

}