import Product from "../models/ProductModel.js";
import User from '../models/UserModel.js';
import { Op } from "sequelize";
import path from "path";
import { downloadResource } from '../config/Util.js';

export const getProducts = async (req, res) => {
    try{
        let response;
        if(req.role === "admin"){
            response = await Product.findAll({
                attributes: ['uuid', 'name', 'price', 'url'],
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
                attributes: ['uuid', 'name', 'price', 'url'],
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

export const createProduct = (req, res) => {
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const {
        price = req.body.price,
        name = req.body.title,
        file = req.files.file,
        fileSize = file.data.length,
        ext = path.extname(file.name),
        fileName = file.md5 + ext,
        url = `${req.protocol}://${req.get("host")}/images/${fileName}`,
        allowedType = ['.png','.jpg','.jpeg'],
    } = req.body;
 
    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
    if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});
 
    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Product.create({
                name: name,
                price: price,
                image: fileName,
                url: url,
                userId: req.userId
            });
            res.status(200).json({msg: "Product Created Successfuly"});
        } catch (error) {
            console.log(error.message);
        }
    })
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

export const exportCsv = async(req, res) => {
  const fields = [
    {
      label: 'Nama Product',
      value: 'name'
    },
    {
      label: 'Price',
      value: 'price'
    }
  ];
  const data = await Product.findAll();

  return downloadResource(res, '../publi/users.csv', fields, data);
 }

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
        attributes: ['name', 'price', 'url'],
        where:{
            [Op.or]: [{name:{
                [Op.like]: '%'+search+'%'
            }}, {price:{
                [Op.like]: '%'+search+'%'
            }}
        ]
        },
        include:[{
            model: User,
            attributes: ['name', 'number']
        }],
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