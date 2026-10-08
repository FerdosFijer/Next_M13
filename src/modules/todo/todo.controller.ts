import { Request, Response } from "express";
import { todoServices } from "./todo.service";


const createTodo = async (req: Request, res: Response) => {
  // console.log(req.body);

  try{
    const result = await todoServices.createTodo(req.body) ;
    // console.log(result.rows[0]);
    res.status(201).json({ success: true, message: "Data inserted successfully", data: result.rows[0] });
  }catch(err: any){
    res.status(500).json({success:false, message: err.message})
  }
}

const getTodo = async (req: Request, res: Response) => {
  try{
    const result = await todoServices.getTodo();
    res.status(200).json({success: true, message: "Users retrieved successfully", data: result.rows})
  }catch(err: any){
    res.status(500).json({success:false, message: err.message, details: err})
  }
}

const getSingleTodo = async (req: Request, res: Response) => {
  // console.log(req.params.id);
  try{
    const result = await todoServices.getSingleTodo(req.params.id as string) ;
    console.log(result.rows);
    if(result.rows.length === 0){
      res.status(404).json({success:false, message: "user not found"})
    }else{
      res.status(200).json({success: true, message: "User retrieved successfully", data: result.rows[0]})
    }
  }catch(err: any){
    res.status(500).json({success:false, message: err.message})
  }
}

const updateTodo =  async (req: Request, res: Response) => {
  try {
    const result = await todoServices.updateTodo(req.body, req.params.id as string);
    // console.log(result.rows);
    if(result.rows.length === 0){
      res.status(404).json({success:false, message: "user not found"})
    }else{
      res.status(200).json({success: true, message: "User updated successfully", data: result.rows[0]})
    }
  }catch(err: any){
    res.status(500).json({success:false, message: err.message})
  }
}

const deleteTodo = async (req: Request, res: Response) => {
  // console.log(req.params.id);
  try{
    const result = await todoServices.deleteTodo(req.params.id as string);
    // console.log(result.rows);
    if(result.rowCount === 0){
      res.status(404).json({success:false, message: "user not found"})
    }else{
      res.status(200).json({success: true, message: "User deleted successfully", data: result.rows})
    }
  }catch(err: any){
    res.status(500).json({success:false, message: err.message})
  }
}

export const todoControllers = {createTodo, getTodo, getSingleTodo, updateTodo, deleteTodo }