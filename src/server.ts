import express, { Request, Response } from "express"
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";

const app = express();
const port = config.port;

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
app.post('/todos', async (req: Request, res: Response) => {
  // console.log(req.body);
  const {user_id, title} = req.body;
  try{
    const result = await pool.query(`INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`, [user_id, title]);
    // console.log(result.rows[0]);
    res.status(201).json({ success: true, message: "Data inserted successfully", data: result.rows[0] });
  }catch(err: any){
    res.status(500).json({success:false, message: err.message})
  }
});
app.get("/todos", async (req: Request, res: Response) => {
  try{
    const result = await pool.query(`SELECT * FROM todos`);
    res.status(200).json({success: true, message: "todos retrieved successfully", data: result.rows})
  }catch(err: any){
    res.status(500).json({success:false, message: err.message, details: err})
  }
})
// Get single todo
app.get("/todos/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todos WHERE id = $1", [
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch todo" });
  }
});
// Update todo
app.put("/todos/:id", async (req, res) => {
  const { title, completed } = req.body;

  try {
    const result = await pool.query(
      "UPDATE todos SET title=$1, completed=$2 WHERE id=$3 RETURNING *",
      [title, completed, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update todo" });
  }
});
// Delete todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM todos WHERE id=$1 RETURNING *",
      [req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ success: true, message: "Todo deleted", data: null });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

app.use((req: Request, res: Response)=>{
  res.status(404).json({success:false, message: "Route not found", path: req.path})
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});