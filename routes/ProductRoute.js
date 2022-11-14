import express from 'express';
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    exportCsv,
    searchProduct
} from '../controllers/Product.js';
import {
    verifyUser
} from '../middleware/AuthUser.js'
const router =  express.Router();

router.get('/product/', verifyUser, getProducts);
router.get('/product/:id', verifyUser, getProductById);
router.post('/product/', verifyUser, createProduct);
router.patch('/product/:id', verifyUser, updateProduct);
router.delete('/product/:id', verifyUser, deleteProduct);
router.get('/export', exportCsv);
router.get('/search', searchProduct);

export default router;