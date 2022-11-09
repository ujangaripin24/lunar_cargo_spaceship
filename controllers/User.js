import User from "./../models/UserModel.js";
import argon2 from "argon2";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const getUsers = async (req, res) => {
    try {
        const response = await User.findAll({
            attributes: ["uuid", "name", "email", "number","role"]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getUserById = async (req, res) => {
    try {
        const response = await User.findOne({
            attributes: ["uuid", "name", "email", "number", "role"],
            where: {
                uuid: req.params.id,
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const createUser = async (req, res) => {
    const { name, email, password, number, confPassword , role } = req.body;
    if (password !== confPassword) return res.status(400).json({ message: "Password does not match" });
    const hashedPassword = await argon2.hash(password);
    try {
        await User.create({
            name : name,
            email : email,
            password: hashedPassword,
            number: number,
            role : role
        });
        // send message to email when register success
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Register Success",
            text: `You register here ${req.ip}`,
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Email sent: ${info.response}`);
            }
        });
        res.status(200).json({ message: "Register Success" });
    } catch(error) {
        res.status(400).json(error);
    }
}

export const updateUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            uuid: req.params.id,
        }
    });
    if(!user) return res.status(404).json({ message: "User not found" });
    const { name, email, password, number, confPassword , role } = req.body;
    let hashedPassword;
    if (password === "" || confPassword === null) {
        hashedPassword = user.password;
    } else {
        hashedPassword = await argon2.hash(password);
    }
    if (password !== confPassword) return res.status(400).json({ message: "Password does not match" });
    try {
        await User.update({
            name : name,
            email : email,
            password : hashedPassword,
            number : number,
            role : role
        },{
            where :{
                id : user.id
            }
        }
        );
        res.status(201).json({ message: "User update successfully" });
    } catch {
        res.status(400).json(error);
    }
}

export const deleteUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            uuid: req.params.id,
        }
    });
    if (!user) return res.status(400).json({ message: "Password does not match" });
    try {
        await User.destroy({
            where :{
                id : user.id
            }
        }
        );
        res.status(201).json({ message: "User delete successfully" });
    } catch {
        res.status(400).json(error);
    }
}