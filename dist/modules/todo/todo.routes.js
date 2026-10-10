"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRoutes = void 0;
const express_1 = __importDefault(require("express"));
const todo_controller_1 = require("./todo.controller");
const router = express_1.default.Router();
router.post("/", todo_controller_1.todoControllers.createTodo);
router.get("/", todo_controller_1.todoControllers.getTodo);
router.get("/:id", todo_controller_1.todoControllers.getSingleTodo);
router.put("/:id", todo_controller_1.todoControllers.updateTodo);
router.delete("/:id", todo_controller_1.todoControllers.deleteTodo);
exports.todoRoutes = router;
