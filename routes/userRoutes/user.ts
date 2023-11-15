import { AsyncRouter } from "express-async-router";
import { addUser, createUserTable, deleteUser, getUserById, getUsers, updateUser } from "../../controllers/user";

const userRouter = AsyncRouter();


userRouter.get('/',getUsers)
userRouter.get('/:id',getUserById)
userRouter.put('/:id',updateUser)
userRouter.delete('/:id',deleteUser)
userRouter.post('/',addUser)
userRouter.post('/createTable',createUserTable)

export default userRouter;