import Product from "../models/ProductModel.js";
import User from '../models/UserModel.js';
import { Op } from "sequelize";

export const getProducts = async (req, res) => {
    try{
        let response;
        if(req.role === "admin"){
            response = await Product.findAll({
                attributes: ['uuid', 'name', 'price'],
                include:[{
                    model: User,
                    attributes: ['name', 'email', 'role']
                }]
            });
        } else {
            response = await Product.findAll({
                where:{
                    userId : req.userId
                },
                include:[{
                    model: User,
                }]
            });
        }
        res.status(200).json({response});
    } catch (error){
        res.status(500).json({msg: error.message});
    }
};

export const getProductById = async (req, res) => {
    try{
        const product = await Product.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!product){
            return res.status(404).json({msg: "Product not found"});
        }
        let response;
        if(req.role === "admin"){
            response = await Product.findAll({
                attributes: ['uuid', 'name', 'price'],
                where:{
                   id: product.id
                },
                include:[{
                    model: User,
                    attributes: ['name', 'email', 'role']
                }]
            });
        } else {
            response = await Product.findAll({
                where:{
                    [Op.and]: [{userId : req.userId}, {id: product.id}],
                },
                include:[{
                    model: User,
                }]
            });
        }
        res.status(200).json({response});
    } catch (error){
        res.status(500).json({msg: error.message});
    }
};

export const createProduct = async (req, res) => {
    const {name, price} = req.body;
    try{
        await Product.create({
            name: name,
            price: price,
            userId: req.userId
        });
        res.status(200).json({msg: "Product created"});
    }catch(error){
        res.status(500).json({msg: error.message});
    }
};
export const updateProduct = async (req, res) => {
    // product update
    try{
        const product = await Product.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!product){
            return res.status(404).json({msg: "Product not found"});
        }
        const {name, price} = req.body;
        await product.update({
            name: name,
            price: price
        });
        res.status(200).json({msg: "Product updated"});
    }catch (error){
        res.status(500).json({msg: error.message});
    }
};
export const deleteProduct = async (req, res) => {
    try{
        // delete product
        const product = await Product.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!product){
            return res.status(404).json({msg: "Product not found"});
        }
        await product.destroy();
        res.status(200).json({msg: "Product deleted"});
    }catch(error){
        res.status(500).json({msg: error.message});
    }
};

export const searchProduct = async (req, res) =>{
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Product.count({
        where:{
            [Op.or]: [{name:{
                [Op.like]: '%'+search+'%'
            }}, {price:{
                [Op.like]: '%'+search+'%'
            }}
        ]
        }
    });
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Product.findAll({
        where:{
            [Op.or]: [{name:{
                [Op.like]: '%'+search+'%'
            }}, {price:{
                [Op.like]: '%'+search+'%'
            }}
        ]
        },
        offset : offset,
        limit: limit,
        order:[
            ['id', 'DESC']
        ]
    });
    res.json({
        result: result,
        page: page,
        limit: limit,
        totalRows: totalRows,
        totalPage: totalPage
    })
}