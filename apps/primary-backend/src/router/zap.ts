import { Router } from "express";
import { authMiddleware } from "../middleware";
import { ZapCreateSchema } from "../types";
import prisma from "@repo/db/client";

const router = Router();

router.post("/", authMiddleware, async (req, res): Promise<any> => {
    // @ts-ignore
    const id: string = req.id;
    const body = req.body;
    const parsedBody = ZapCreateSchema.safeParse(body);

    if(!parsedBody.success) {
        return res.status(411).json({ message: "Incorrect inputs" });
    }

    const zapId = await prisma.$transaction(async tx => {
        const zap = await tx.zap.create({
            data: {
                userId: parseInt(id),
                triggerId: "",
                actions: {
                    create: parsedBody.data.actions.map((x, index) => ({
                        actionId: x.availableActionId,
                        sortingOrder: index,
                        metadata: x.actionMetadata
                    }))
                }
                
            }
        });

        const trigger = await tx.trigger.create({
            data: {
                zapId: zap.id,
                triggerId: parsedBody.data.availableTriggerId
            }
        });

        await tx.zap.update({
            where: {
                id: zap.id
            },
            data: {
                triggerId: trigger.id
            }
        })

        return zap.id;
    });

    return res.json({
        zapId
    });
     
});

router.get("/", authMiddleware, async (req, res): Promise<any> => {
    // @ts-ignore
    const id = req.id;

    const zaps = await prisma.zap.findMany({
        where: {
            userId: id
        },
        include: {
            actions: {
                include: {
                    type: true
                }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    });

    return res.json({
        zaps
    });

});

router.get("/:zapId", authMiddleware, async (req, res): Promise<any> => {
    // @ts-ignore
    const id = req.id;
    const zapId = req.params.zapId;
    const zap = await prisma.zap.findFirst({
        where: {
            id: zapId,
            userId: id
        },
        include: {
            actions: {
                include: {
                    type: true
                }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    });

    return res.json({
        zap
    });
});

export const zapRouter = router;
