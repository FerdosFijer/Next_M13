"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const logger_1 = __importDefault(require("../../middleware/logger"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
router.post("/", user_controller_1.userControllers.createUser);
router.get("/", logger_1.default, (0, auth_1.default)("admin"), user_controller_1.userControllers.getUser);
router.get("/:id", user_controller_1.userControllers.getSingleUser);
router.put("/:id", user_controller_1.userControllers.updateUser);
router.delete("/:id", user_controller_1.userControllers.deleteUser);
exports.userRoutes = router;
