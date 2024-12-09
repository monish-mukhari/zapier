import { Router } from "express";
import { authMiddleware } from "../middleware";
import prisma from "@repo/db/client";

const router = Router();

router.get("/available", authMiddleware, async (req, res): Promise<any> => {
    const availableTriggers = await prisma.availableTrigger.findMany();

    return res.json({
        availableTriggers
    });
})


export const triggerRouter = router;