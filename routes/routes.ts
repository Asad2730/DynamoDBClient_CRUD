import { AsyncRouter } from "express-async-router";
import userRouter from "./userRoutes/user";

const router = AsyncRouter();

router.use('/users',userRouter)

export default router;