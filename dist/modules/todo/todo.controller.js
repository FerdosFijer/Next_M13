"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoControllers = void 0;
const todo_service_1 = require("./todo.service");
const createTodo = async (req, res) => {
    // console.log(req.body);
    try {
        const result = await todo_service_1.todoServices.createTodo(req.body);
        // console.log(result.rows[0]);
        res.status(201).json({ success: true, message: "Data inserted successfully", data: result.rows[0] });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
const getTodo = async (req, res) => {
    try {
        const result = await todo_service_1.todoServices.getTodo();
        res.status(200).json({ success: true, message: "Users retrieved successfully", data: result.rows });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message, details: err });
    }
};
const getSingleTodo = async (req, res) => {
    // console.log(req.params.id);
    try {
        const result = await todo_service_1.todoServices.getSingleTodo(req.params.id);
        console.log(result.rows);
        if (result.rows.length === 0) {
            res.status(404).json({ success: false, message: "user not found" });
        }
        else {
            res.status(200).json({ success: true, message: "User retrieved successfully", data: result.rows[0] });
        }
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
const updateTodo = async (req, res) => {
    try {
        const result = await todo_service_1.todoServices.updateTodo(req.body, req.params.id);
        // console.log(result.rows);
        if (result.rows.length === 0) {
            res.status(404).json({ success: false, message: "user not found" });
        }
        else {
            res.status(200).json({ success: true, message: "User updated successfully", data: result.rows[0] });
        }
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
const deleteTodo = async (req, res) => {
    // console.log(req.params.id);
    try {
        const result = await todo_service_1.todoServices.deleteTodo(req.params.id);
        // console.log(result.rows);
        if (result.rowCount === 0) {
            res.status(404).json({ success: false, message: "user not found" });
        }
        else {
            res.status(200).json({ success: true, message: "User deleted successfully", data: result.rows });
        }
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
exports.todoControllers = { createTodo, getTodo, getSingleTodo, updateTodo, deleteTodo };
