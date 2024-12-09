import express from "express";
import { zapRouter } from "./router/zap";
import { userRouter } from "./router/user";
import cors from "cors";
import { actionRouter } from "./router/action";
import { triggerRouter } from "./router/trigger";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRouter);

app.use("/api/v1/zap", zapRouter);

app.use("/api/v1/action", actionRouter);

app.use("/api/v1/trigger", triggerRouter);

app.listen(3002, () => {
    console.log("primary be running on port 3002");
})