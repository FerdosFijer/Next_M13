import express, { Request, Response } from "express"
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { todoRoutes } from "./modules/todo/todo.routes";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();


// parser
app.use(express.json()); //eta json data parse korar jonno
// app.use(express.urlencoded()); // eta form data parse korar jonno

//initializing DB
initDB();

app.get('/', logger,(req: Request, res: Response) => {
  res.send('Hello World to next level devt.lopers!');
});

//! users CRUD
app.use("/users", userRoutes);

//! todos CRUD
app.use("/todos", todoRoutes )

//! auth routes
app.use("/auth", authRoutes)

app.use((req: Request, res: Response)=>{
  res.status(404).json({success:false, message: "Route not found", path: req.path})
})

export default app;