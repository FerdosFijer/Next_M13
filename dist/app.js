"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const logger_1 = __importDefault(require("./middleware/logger"));
const user_routes_1 = require("./modules/user/user.routes");
const todo_routes_1 = require("./modules/todo/todo.routes");
const auth_routes_1 = require("./modules/auth/auth.routes");
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json()); //eta json data parse korar jonno
// app.use(express.urlencoded()); // eta form data parse korar jonno
//initializing DB
(0, db_1.default)();
app.get('/', logger_1.default, (req, res) => {
    res.send('Hello World to next level devt.lopers!');
});
//! users CRUD
app.use("/users", user_routes_1.userRoutes);
//! todos CRUD
app.use("/todos", todo_routes_1.todoRoutes);
//! auth routes
app.use("/auth", auth_routes_1.authRoutes);
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route not found", path: req.path });
});
exports.default = app;
