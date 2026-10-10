"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const user_service_1 = require("./user.service");
const createUser = async (req, res) => {
    // console.log(req.body);
    try {
        const result = await user_service_1.userServices.createUser(req.body);
        // console.log(result.rows[0]);
        res.status(201).json({ success: true, message: "Data inserted successfully", data: result.rows[0] });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
const getUser = async (req, res) => {
    try {
        const result = await user_service_1.userServices.getUser();
        res.status(200).json({ success: true, message: "Users retrieved successfully", data: result.rows });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message, details: err });
    }
};
const getSingleUser = async (req, res) => {
    // console.log(req.params.id);
    try {
        const result = await user_service_1.userServices.getSingleUser(req.params.id);
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
const updateUser = async (req, res) => {
    // console.log(req.params.id);
    const { name, email } = req.body;
    try {
        const result = await user_service_1.userServices.updateUser(name, email, req.params.id);
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
const deleteUser = async (req, res) => {
    // console.log(req.params.id);
    try {
        const result = await user_service_1.userServices.deleteUser(req.params.id);
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
exports.userControllers = { createUser, getUser, getSingleUser, updateUser, deleteUser };
