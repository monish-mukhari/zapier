import { Router } from "express";
import { authMiddleware } from "../middleware";
import prisma from "@repo/db/client";

const router = Router();

router.get("/available", authMiddleware, async (req, res): Promise<any> => {
    const availableActions = await prisma.availableAction.findMany();

    return res.json({
        availableActions
    });
});

export const actionRouter = router;