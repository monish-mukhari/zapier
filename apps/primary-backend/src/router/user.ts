import { Router } from "express";
import { authMiddleware } from "../middleware";
import { SignupSchema, SigninSchema } from "../types";
import prisma from "@repo/db/client";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";

const router = Router();

router.post("/signup", async (req, res): Promise<any> => {
    const body = req.body;
    const parsedBody = SignupSchema.safeParse(body);

    if(!parsedBody.success) {
        return res.status(411).json({ message: "Incorrect inputs" });
    }

    const userExists = await prisma.user.findFirst({
        where: {
            email: parsedBody.data.username
        }
    });

    if(userExists) {
        return res.status(409).json({ message: "User already exists" });
    }

    const response = await prisma.user.create({
        data: {
            name: parsedBody.data.name,
            email: parsedBody.data.username,
            password: parsedBody.data.password
        }
    });

    return res.json({
        message: "Please verify your account by checking your email"
    });


});

router.post("/signin", async (req, res): Promise<any> => {
    const body = req.body;
    const parsedBody = SigninSchema.safeParse(body);

    if(!parsedBody.success) {
        return res.status(411).json({ message: "Incorrect inputs" });
    }

    const userExists = await prisma.user.findFirst({
        where: {
            email: parsedBody.data?.username,
            password: parsedBody.data.password
        }
    });

    if(!userExists) {
        return res.status(403).json({ message: "User dosn't exist, please signup" });
    }

    const token = jwt.sign({ id: userExists.id }, JWT_PASSWORD);

    return res.json({
        token
    });

});

router.get("/", authMiddleware, async (req, res): Promise<any> => {
    // @ts-ignore
    const id = req.id;

    const user = await prisma.user.findFirst({
        where: {
            id
        },
        select: {
            name: true,
            email: true
        }
    });

    return res.json({
        user
    });

});

export const userRouter = router;