import User from '../models/UserModel.js';
import argon2 from 'argon2';
// import nodemail
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const Login = async (req, res) => {
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if (!user) return res.status(404).json({ msg: "User Tidak Ditemukan"});
    const match = await argon2.verify(user.password, req.body.password);
    if(!match) return res.status(400).json({ msg: "Salah Password" });
    req.session.userId = user.uuid;
    const uuid = user.userId;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    // send notif 'you login here' to gmail when login success 
     const transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
             user: process.env.EMAIL,
             pass: process.env.PASSWORD
         }
     });
     const mailOptions = {
         from: process.env.EMAIL,
         to: user.email,
         subject: 'Login Success',
         text: `You login here ${req.ip}`
     };
     transporter.sendMail(mailOptions, (err, info) => {
         if (err) {
             console.log(err);
         } else {
             console.log(`Email sent: ${info.response}`);
         }
     });
     res.status(200).json({msg: "Berhasil Masuk"});

}

export const Me = async (req, res) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "You should Login"});
    }
    const user = await User.findOne({
        attributes: ['uuid', 'name', 'email', 'role'],
        where: {
            uuid: req.session.userId
        }
    });
    if (!user) return res.status(404).json({ message: "Password does not match" });
    res.status(200).json(user);
}

export const logOut = (req, res) => {
    req.session.destroy((err) =>{
        if(err) return res.status(400).json({msg: "Something Bad Happend"});
        res.status(200).json({msg: "You has been Logout"});
    })
}